import {AfterViewInit, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl,FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

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
      transition('false => true', [
        style({width: '*', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({

            width: '*'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('true => false', [
        group([
          animate('0.3s ease', style({

            width: '*'
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ]),
    trigger('color', [
      state('false', style({backgroundImage: 'none'})),
      state('true', style({
        backgroundImage: 'linear-gradient(to right top, #5a651b, #6f761d, #87861e, #a0971f, #bba721, #b7b738, #b4c54f, #b0d466, #96df97, #90e4c2, #a4e6de, #c6e6ea)'
      })),
      transition('true<=>false', [
        animate('.0s ease-out')
      ]),
    ])
  ]
})
export class InfoComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() index: number;
  @Input() abstractControl: AbstractControl
  isEditing: boolean;
  private phone: string;
  private email: string;
  private id: number;
  private isNew = false;
  private apartmentID: number;
  private isOpen = false;
  private searchText$ = new Subject<string>();

  // get currentUserDetails(): boolean {
  //   let userID = this.authService.user.id;
  //   let currentUserDetails = userID === this.id;
  //   return currentUserDetails;
  // }

  // get disableInput(): boolean {
  //   return !(this.currentUserDetails || this.isNew);
  // }

  constructor(private authService: AuthService) {
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
    this.isOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abstractControl']) {
      // this.abstractControl.get('name').setValidators(Validators.maxLength(7))
      // this.abstractControl.get('family').setValidators(Validators.maxLength(7))
    }
    if (changes['abstractControl'].isFirstChange()) {
      this.phone = this.abstractControl.get('phone').value;
      this.email = this.abstractControl.get('email').value;
      this.id = +this.abstractControl.get('id').value;
      this.apartmentID = +this.abstractControl.get('apartmentID').value;
      this.isNew = this.abstractControl.get('isNew').value === 'true';
    }
  }

  ngOnInit() {
    if (!this.userIsTenant)
      this.abstractControl.disable();

    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(i => {
        console.log(i);
        this.isEditing = false;

      })
  }

  toggleDeleted() {
    let markAsDeleted = !this.abstractControl.get('toDelete').value;
    this.abstractControl.get('toDelete').setValue(markAsDeleted);
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit')
  }

  onKeyUp(target: HTMLInputElement) {
    this.isEditing = true;
    this.searchText$.next(target.value);
  }
}
