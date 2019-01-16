import {Injectable} from "@angular/core";
import {NgRedux} from "@angular-redux/store";
import {IActionPayload, IMetadata} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {AbstractControl} from "@angular/forms";
import UPDATE_DATA = StoreConst.UPDATE_DATA;
import DATA_UPDATED_ = StoreConst.DATA_UPDATED_;
import API_URL = StoreConst.API_URL;


@Injectable()
export class FieldEditorService {
  tenantstUrl = `${API_URL}tenants/`;
  ctrlName: string
  private currentValue: AbstractControl;
  private originalValue: AbstractControl;

  constructor(private ngRedux: NgRedux<any>) {
  }

  get formField(): AbstractControl {
    return this.currentValue;
  }

  set formField(value: AbstractControl) {
    this.currentValue = value;
    this.originalValue = value;
  }


  get id(): number {
    return this.formField.parent.controls['id'].value
  }

  restoreTaxReturn() {
    this.formField = this.currentValue;
  }

  saveValue() {
    this.formField = this.currentValue;
    // this.heroService.saveTaxReturn(this.currentTaxReturn).subscribe();
    this.ngRedux.dispatch(<IActionPayload>{
      type: UPDATE_DATA,
      meta: <IMetadata>{
        continueWith: DATA_UPDATED_ + this.ctrlName,
        url: `${this.tenantstUrl}${this.id}`,
        body: {columnName: this.ctrlName, newVlaue: this.formField.value}
      }
    })
  }
}
