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

  constructor(private authService: AuthService) {
  }

  get currentUserDetails(): boolean {
    let userID = this.authService.user.id;
    let currentUserDetails = userID === this.id;
    return currentUserDetails;
  }

  get disableInput(): boolean {
    return !(this.currentUserDetails || this.isNew);
  }

  get actionBtnTxt(): string {
    let markAsDeleted = this.abstractControl.get('toDelete').value;
    return markAsDeleted ? 'ביטול' : 'הסרת איש קשר'
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abstractControl'].isFirstChange()) {
      this.phone = this.abstractControl.get('phone').value;
      this.email = this.abstractControl.get('email').value;
      this.id = +this.abstractControl.get('id').value;
      this.isNew = this.abstractControl.get('isNew') && this.abstractControl.get('isNew').value === 'true';
    }
  }

  ngOnInit() {
  }

  toggleDeleted() {
    let markAsDeleted = !this.abstractControl.get('toDelete').value;
    this.abstractControl.get('toDelete').setValue(markAsDeleted);
  }

}
