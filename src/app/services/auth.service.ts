import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Apartment, ApartmentTenant, IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {NgRedux} from "@angular-redux/store";
import {HttpClient} from "@angular/common/http";
import API_URL = StoreConst.API_URL;
import USER_STATUS_CHANGED = StoreConst.USER_STATUS_CHANGED;

@Injectable()
export class AuthService {

  user: ApartmentTenant;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  loginUrl: string = `${API_URL}apartments`;

  // isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') || false);

  constructor(private router: Router,
              private  ngRedux: NgRedux<IAppState>,
              private  httpClient: HttpClient) {
    let user = localStorage.getItem('user')
    if (user) {
      this.ngRedux.dispatch({
        type: USER_STATUS_CHANGED,
        meta: null,
        payload: <ApartmentTenant>JSON.parse(user)
      })
    }
    ;
    this.ngRedux.select('user')
      .subscribe((user: ApartmentTenant) => {
          this.user = user;
          let url = this.redirectUrl;
          let apartments = '/apartments';
          let login = '/login';
          if (this.user) {
            let goTo = url || apartments;
            // localStorage.setItem('isLoggedIn', JSON.stringify(true))
            this.router.navigate([goTo])
          }
          else
            this.router.navigate([login])
        }
      )
  }

  // login(email: string, phone: string): Observable<ApartmentTenant> {
  login(email: string, phone: string): void {
    // return this.httpClient.get(this.loginUrl)
    let l = this.httpClient.get(this.loginUrl)
    l.subscribe((apartments: Apartment[]) => {
      let user = apartments[0].apartmentTenants[0]
      localStorage.setItem('user', JSON.stringify(<ApartmentTenant>user))
      this.ngRedux.dispatch({
        type: USER_STATUS_CHANGED,
        meta: null,
        payload: user,
      })
    });
  }

  logout(): void {
    localStorage.clear();
    this.user = undefined;
    this.ngRedux.dispatch({
      type: USER_STATUS_CHANGED,
      meta: null,
      payload: undefined,
    })
    this.router.navigate(['/login']);
  }
}
