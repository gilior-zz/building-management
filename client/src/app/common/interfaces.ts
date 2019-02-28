import {Apartment, ApartmentDebt, User} from "../../../../shared/models";
import {AnyAction} from "redux";
import {AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";

export interface IAppState {
  apartmentsDash: ApartmentDebt[];
  selectedApartment: Apartment;
  metaData: MetaData,
  user: User
}

export interface MetaData {
  numberOfApartments: number;
  lastUpdateTime: Date;
}

// export interface User {
//   email: string;
//   phone: string
// }

export const Resolution: { [id: number]: string } =
  {
    1: 'month',
    2: '3month',
    3: '6month',
    4: 'year',
    5: 'all'
  };

export interface IMetadata {
  url: string,
  body: any,
  continueWith: string
}

export interface IActionPayload extends AnyAction {

  meta: IMetadata

}

export abstract class MyAbstractControl extends AbstractControl {
  constructor(validator: ValidatorFn | null, asyncValidator: AsyncValidatorFn | null) {
    super(validator, asyncValidator);
  }

  get name(): string {
    let name = '';
    Object.keys(this.parent.controls).forEach(key => {
      if (this.parent[key] === this)
        name = key;
    })
    return name;
  }


}

export interface ICtrlErr {
  name: string;
  msg: string
}





