import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() index: number;
  @Input() abstractControl: AbstractControl

  private phone: string;
  private email: string;
  private id: number;
  private isNew = false;
  private apartmentID: number;

  constructor(private authService: AuthService) {
  }

  // get currentUserDetails(): boolean {
  //   let userID = this.authService.user.id;
  //   let currentUserDetails = userID === this.id;
  //   return currentUserDetails;
  // }

  // get disableInput(): boolean {
  //   return !(this.currentUserDetails || this.isNew);
  // }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abstractControl'].isFirstChange()) {
      this.phone = this.abstractControl.get('phone').value;
      this.email = this.abstractControl.get('email').value;
      this.id = +this.abstractControl.get('id').value;
      this.apartmentID = +this.abstractControl.get('apartmentID').value;
      this.isNew = this.abstractControl.get('isNew').value === 'true';
    }
    if (changes['userBelongsToApartment']) {
      let obj = {userBelongsToApartment: changes['userBelongsToApartment'], email: this.email}
      console.log(JSON.stringify(obj, undefined, 2))
    }
  }

  ngOnInit() {
    if (!this.userIsTenant)
      this.abstractControl.disable()
  }

  toggleDeleted() {
    let markAsDeleted = !this.abstractControl.get('toDelete').value;
    this.abstractControl.get('toDelete').setValue(markAsDeleted);
  }

}
