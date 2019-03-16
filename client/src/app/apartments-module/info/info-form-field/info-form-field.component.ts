import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FieldEditorService} from "../../../services/field-editor.service";
import {NgRedux, select} from "@angular-redux/store";
import {ApartmentTenant} from "../../../../../../shared/models";
import {IAppState, ICtrlErr} from "../../../common/interfaces";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatRadioChange} from "@angular/material";
import {MyErrorStateMatcher} from "../../../services/error-state-matcher";
import {last} from 'lodash'

@Component({
  selector: 'app-info-form-field',
  templateUrl: './info-form-field.component.html',
  styleUrls: ['./info-form-field.component.scss'],
  providers: [FieldEditorService],
  animations: [
    trigger('openClose', [
      state('true', style({height: '*'})),
      state('false', style({height: '0px'})),
      transition('false <=> true', animate(500))
    ])
  ],
})
export class InfoFormFieldComponent implements OnInit, OnChanges {
  @Input() items: { [key: string]: string }
  @Input() type;
  @Input() formGroup: FormGroup
  @Input() userIsTenant: boolean;
  @Input() userIsOwner: boolean;
  @Input() maxlength: number;
  @Input() errs: ICtrlErr[];
  @Input() plcHldr: string;
  @select(['selectedApartment', 'apartmentTenants']) selectedApartment$: Observable<ApartmentTenant[]>
  _showIcon = false;
  isEditing = false;
  isSaved = true;
  matcher = new MyErrorStateMatcher();
  private searchText$ = new Subject<string>();

  constructor(private fieldEditorService: FieldEditorService, private ngRedux: NgRedux<IAppState>) {
  }

  get icon(): string {
    let icon = '';
    // if (this.isEditing)
    //   icon = 'edit'
    if (this.isSaved)
      icon = 'done';

    return icon
  }

  get ShowIcon(): boolean {
    return this.userIsTenant || this._showIcon;
  }

  get abstractControl(): AbstractControl {
    return this.fieldEditorService.formField;
  }

  @Input() set abstractControl(ctrl: AbstractControl) {
    this.fieldEditorService.formField = ctrl;
  }

  @Input() set ctrlName(name: string) {
    this.fieldEditorService.ctrlName = name;
  }

  get isNew(): boolean {
    return this.abstractControl.parent.get('isNew').value;
  }

  ngOnInit() {
    // this.ngRedux.subscribe(() => {
    //   console.log('this.ngRedux.subscribe', this.ngRedux.getState())
    // })
    this.selectedApartment$.subscribe((apartmentTenants: ApartmentTenant[]) => {
      if (!this.isSaved) {
        // this.isEditing = false;
        this.fieldEditorService.updateUser(apartmentTenants);
        this.isSaved = true;
        this._showIcon = true;
        if (this.isNew) {
          // this.abstractControl.parent.patchValue({id: last(apartmentTenants).id});
          // this.abstractControl.parent.patchValue({isNew: false});


        }
      }
    })
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(i => {
        // this.isEditing = false;
        if (!this.abstractControl.valid) return
        if (!this.fieldEditorService.formField.value.trim() || this.fieldEditorService.formField.value.trim() === this.fieldEditorService.originalValue.value.trim()) return;
        this.isSaved = false;
        this.fieldEditorService.saveValue(this.isNew);

      })
  }

  onKeyUp(target: HTMLInputElement) {

    this.searchText$.next(target.value);
  }


  onRadioChange(event: MatRadioChange) {
    this.isSaved = false;
    this.searchText$.next(event.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['abstractControl']['currentValue'].validator)
    //   console.log(changes['abstractControl']['currentValue'].validator(''));
  }
}
