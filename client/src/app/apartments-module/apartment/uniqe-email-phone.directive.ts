import {FormArray, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const uniqueEmailPhoneValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const apartmentTenants = formGroup.get('apartmentTenants') as FormArray;
  console.log('apartmentTenants', apartmentTenants)

  return null;
  // return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
};
