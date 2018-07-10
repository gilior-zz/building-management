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

  constructor(private authService: AuthService) {
  }

  get isCurrentUser(): boolean {

    let userEmail = this.authService.user.email;
    let userPhone = this.authService.user.phone;
    let samePhone = this.phone === userPhone;
    let sameEamil = this.email === userEmail;
    let sameSame = samePhone && sameEamil;
    return sameSame;
  }

  get actionBtnTxt(): string {
    let markAsDeleted = this.abstractControl.get('toDelete').value;
    return markAsDeleted ? 'ביטול' : 'הסרת איש קשר'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abstractControl'].isFirstChange()) {
      this.phone = this.abstractControl.get('phone').value;
      this.email = this.abstractControl.get('email').value;
    }
  }

  ngOnInit() {
  }

  toggleDeleted() {
    let markAsDeleted = !this.abstractControl.get('toDelete').value;
    this.abstractControl.get('toDelete').setValue(markAsDeleted);
  }

}
