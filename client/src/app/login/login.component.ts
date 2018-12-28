import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {NgRedux} from "@angular-redux/store";
import USER_STATUS_CHANGED = StoreConst.USER_STATUS_CHANGED;
import {User, ApartmentTenant, Apartment} from '../../../../shared/models'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private  ngRedux: NgRedux<IAppState>) {
    this.buildForm();
  }

  ngOnInit() {
    // this.authService.isLoggedIn = false;
    //  localStorage.setItem('isLoggedIn', JSON.stringify(false))
  }

  onLoginRequest() {
    let email = this.loginForm.value.email;
    let phone = this.loginForm.value.phone;
    let pwd = this.loginForm.value.pwd;
    this.authService.login(email, phone,pwd)
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
          this.router.navigate([login])
      })
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['liorgish@gmail.com'],
      phone: ['0546665074'],
      pwd:['123456']
    })
  }
}
