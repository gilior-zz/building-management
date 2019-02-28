import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";
import {IActionPayload, IMetadata} from "../common/interfaces";
import {ApartmentTenant} from '../../../../shared/models'
import {StoreConst} from "../common/const";
import {AbstractControl} from "@angular/forms";
import {AuthService} from "./auth.service";
import {find} from 'lodash'

@Injectable()
export class FieldEditorService {
  tenantstUrl = `${StoreConst.API_URL}tenants/`;
  ctrlName: string
  public currentValue: AbstractControl;
  public originalValue: any;

  constructor(private ngRedux: NgRedux<any>, private authService: AuthService) {
  }

  get formField(): AbstractControl {
    return this.currentValue;
  }

  set formField(value: AbstractControl) {
    this.currentValue = value;
    this.originalValue = {...value};
  }

  get id(): number {
    return this.formField.parent.controls['id'].value || this.formField.parent.controls['apartmentID'].value
  }

  updateParentForm(filed: AbstractControl, value: number | string | boolean) {

  }

  restoreTaxReturn() {
    this.formField = this.currentValue;
  }

  saveValue(isNew: boolean) {

    this.formField = this.currentValue;
    // this.heroService.saveTaxReturn(this.currentTaxReturn).subscribe();

    this.ngRedux.dispatch(<IActionPayload>{
      type: isNew ? StoreConst.NEW_DATA : StoreConst.UPDATE_DATA,
      meta: <IMetadata>{
        continueWith: isNew ? StoreConst.TENANT_DATA_ADDED : StoreConst.TENANT_DATA_UPDATED,
        url: `${this.tenantstUrl}${this.id}`,
        body: {columnName: this.ctrlName, newVlaue: this.formField.value}
      }
    })
  }

  updateUser(apartmentTenants: ApartmentTenant[]) {
    let user = find(apartmentTenants, i => i.id === this.authService.user.id)
    if (user)
      this.authService.user = user;
  }
}
