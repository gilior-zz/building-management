import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {NgRedux} from "@angular-redux/store";
import {Apartment, ApartmentTenant} from '../../../../shared/models'
import {mailPtrn, patternValidator, phonePtrn, pwdPtrn} from "../services/pattern.directive";
import {MyErrorStateMatcher} from "../services/error-state-matcher";
import USER_STATUS_CHANGED = StoreConst.USER_STATUS_CHANGED;
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private  ngRedux: NgRedux<IAppState>,
              private snackBar: MatSnackBar) {
    this.buildForm();
  }

  get emailErrorMessage(): string {
    let res = '';
    if (this.emailCtrl.hasError('required'))
      res = 'חובה להזין ערך';
    else if (this.emailCtrl.hasError('invalidPtrn'))
      res = 'אימייל אינו חוקי'
    return res;
  }

  get phoneErrorMessage(): string {
    let res = '';
    if (this.phoneCtrl.hasError('required'))
      res = 'חובה להזין ערך';
    else if (this.phoneCtrl.hasError('minlength') || this.phoneCtrl.hasError('maxlength'))
      res = 'חובה להזין 10 ספרות';
    else if (this.phoneCtrl.hasError('invalidPtrn'))
      res = 'מספר טלפון אינו חוקי';
    return res;
  }

  get pwdErrorMessage(): string {
    let res = '';
    if (this.pwdCtrl.hasError('required'))
      res = 'חובה להזין ערך';
    else if (this.pwdCtrl.hasError('minlength') || this.pwdCtrl.hasError('maxlength'))
      res = 'חובה להזין 8 תווים';
    else if (this.pwdCtrl.hasError('invalidPtrn'))
      res = 'סיסמה צריכה להכיל אות גדולה, אות קטנה, תו מיוחד, ספרה';
    return res;
  }

  get emailCtrl(): AbstractControl {
    return this.loginForm.get('email')
  }

  get phoneCtrl(): AbstractControl {
    return this.loginForm.get('phone')
  }

  get pwdCtrl(): AbstractControl {
    return this.loginForm.get('pwd')
  }

  ngOnInit() {
    // this.authService.isLoggedIn = false;
    //  localStorage.setItem('isLoggedIn', JSON.stringify(false))
  }

  onLoginRequest() {
    let email = this.loginForm.value.email;
    let phone = this.loginForm.value.phone;
    let pwd = this.loginForm.value.pwd;
    this.authService.login(email, phone, pwd)
      .subscribe((res: [ApartmentTenant & Apartment]) => {
        let url = this.authService.redirectUrl;
        let apartments = '/apartments';
        let login = '/login';
        if (res[0]) {
          this.authService.user = res[0];
          this.ngRedux.dispatch({
            type: USER_STATUS_CHANGED,
            meta: null,
            payload: res[0],
          })
          let goTo = url || apartments;
          localStorage.setItem('user', JSON.stringify(res[0]))
          this.router.navigate([goTo])
        }
        else
          // this.router.navigate([login])
          this.openSnackBar();
      })
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['noyaschleien@gmaill.com', [Validators.required, patternValidator(mailPtrn)]],
      phone: ['0544715150', [Validators.required, Validators.minLength(10), Validators.maxLength(10), patternValidator(phonePtrn)]],
      pwd: ['1!qQqweq', [Validators.required, Validators.minLength(8), Validators.maxLength(8), patternValidator(pwdPtrn)]]
    })
  }

  openSnackBar() {
    this.snackBar.open('אחד הפרטים אינו תקין',undefined,{duration:2000});
  }
}
