import {AfterViewInit, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ICtrlErr} from "../../common/interfaces";
import {Apartment} from "../../../../../shared/models";
import {InfoService} from "../../services/info.service";
import {select} from "@angular-redux/store";

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('false', style({width: '*', opacity: 0})),
      state('true', style({
        width: '*',
        opacity: 1
      })),
    ]),
    trigger('color', [
      state('false', style({background: 'none'})),
      state('true', style({
        background: 'linear-gradient(135deg, #f2f6f8 0%,#d8e1e7 50%,#b5c6d0 51%,#e0eff9 100%)'
      })),
      transition('false <=> true', animate('0.3s 0.1s ease'))
    ])
  ],
  providers: [InfoService]

})
export class InfoComponent implements OnInit, OnChanges, AfterViewInit {
  errs: { [key: string]: ICtrlErr[] } =
    {
      'name': [
        <ICtrlErr>{msg: 'יש להזין שם', name: 'required'},
        <ICtrlErr>{msg: 'יש להזין עד 10 תווים', name: 'maxlength'}
      ],
      'family': [
        <ICtrlErr>{msg: 'יש להזין משפחה', name: 'required'},
        <ICtrlErr>{msg: 'יש להזין עד 10 תווים', name: 'maxlength'}
      ],
      'phone': [
        <ICtrlErr>{msg: 'יש להזין טלפון', name: 'required'},
        <ICtrlErr>{msg: 'חובה להזין 10 ספרות', name: 'minlength'},
        <ICtrlErr>{msg: 'חובה להזין 10 ספרות', name: 'maxlength'},
        <ICtrlErr>{msg: 'יש להתחיל ב 05', name: 'invalidPtrn'},
      ],
      'email': [
        <ICtrlErr>{msg: 'יש להזין אימייל', name: 'required'},
        <ICtrlErr>{msg: 'אימייל אינו חוקי', name: 'invalidPtrn'},
      ],
    }

  items: { [key: string]: string } = {
    'tenant': 'דייר',
    'owner': 'בעלים'
  }

  @Input() userIsOwner: boolean;
  @select(['selectedApartment', 'apartmentTenants']) selectedApartment$: Observable<Apartment>
  @Input() index: number;
  @Input() abstractControl: AbstractControl
  isEditing: boolean;
  fields = ['name', 'family', 'phone', 'email', 'status']
  private phone: string;
  private email: string;
  private id: number;
  private isNew = false;
  private apartmentID: number;
  private isOpen = false;
  private deleteRequest$ = new Subject<boolean>();
  // get currentUserDetails(): boolean {
  //   let userID = this.authService.user.id;
  //   let currentUserDetails = userID === this.id;
  //   return currentUserDetails;
  // }

  // get disableInput(): boolean {
  //   return !(this.currentUserDetails || this.isNew);
  // }

  constructor(private authService: AuthService, private infoService: InfoService) {
  }

  get userIsTenant(): boolean {
    return this.id === this.authService.user.id
  }


  get actionBtnTxt(): string {
    let markAsDeleted = this.abstractControl.get('toDelete').value;
    return markAsDeleted ? 'ביטול הסרה' : 'הסרת איש קשר'
  }

  get nameCtrl(): AbstractControl {
    return this.abstractControl.get('name')
  }

  get statusCtrl(): AbstractControl {
    return this.abstractControl.get('status')
  }

  get familyCtrl(): AbstractControl {
    return this.abstractControl.get('family')
  }

  get emailCtrl(): AbstractControl {
    return this.abstractControl.get('email')
  }

  get phoneCtrl(): AbstractControl {
    return this.abstractControl.get('phone')
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.userIsTenant)
      this.isOpen = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.abstractControl.get('toDelete').value)
      this.isOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['abstractControl']) {
    //   // this.abstractControl.get('name').setValidators(Validators.maxLength(7))
    //   // this.abstractControl.get('family').setValidators(Validators.maxLength(7))
    // }
    if (changes['abstractControl'] && changes['abstractControl'].isFirstChange()) {
      this.phone = this.abstractControl.get('phone').value;
      this.email = this.abstractControl.get('email').value;
      this.id = +this.abstractControl.get('id').value;
      this.apartmentID = +this.abstractControl.get('apartmentID').value;
      this.isNew = this.abstractControl.get('isNew').value === true;
    }
  }

  setCtrlStatus(toDisable = false) {
    if (!toDisable && this.isNew)
      this.abstractControl.enable();
    else if (toDisable || !this.userIsTenant)
      this.abstractControl.disable();
    else
      this.abstractControl.enable();

  }


  ngOnInit() {
    // if (!this.userIsTenant)
    //   this.abstractControl.disable();
    this.setCtrlStatus();
    this.deleteRequest$.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(i => {
        this.infoService.deleteTenant(i);
        this.setCtrlStatus(i)

      })
    this.infoService.tenantId = this.id;

    this.selectedApartment$.subscribe((i) => {

    })

    if (!this.userIsOwner)
      this.abstractControl.get('status').disable();
  }

  toggleDeleted() {
    let markAsDeleted = !this.abstractControl.get('toDelete').value;
    // this.infoService.deleteTenant(markAsDeleted);
    // this.setCtrlStatus(markAsDeleted)
    this.abstractControl.get('toDelete').setValue(markAsDeleted);

    this.deleteRequest$.next(markAsDeleted);
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit')
  }


}
