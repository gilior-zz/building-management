import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.authService.isLoggedIn = false;
     localStorage.setItem('isLoggedIn', JSON.stringify(false))
  }

  onLoginRequest() {
    let email = this.loginForm.value.email;
    let phone = this.loginForm.value.phone;
    this.authService.login(email, phone)
      .subscribe(() => {
        let url = this.authService.redirectUrl;
        let apartments = '/apartments';
        let login = '/login';
        if (this.authService.isLoggedIn) {
          let goTo = url || apartments;
          // localStorage.setItem('isLoggedIn', JSON.stringify(true))
          this.router.navigate([goTo])
        }
        else
          this.router.navigate([login])
      })
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: [''],
      phone: ['']
    })
  }
}
