import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {User} from "../common/interfaces";

@Injectable()
export class AuthService {

  user: User;
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  // isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') || false);

  constructor(private router: Router) {
    let user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user) as User
    }

  }

  login(email: string, phone: string): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {
        localStorage.setItem('user', JSON.stringify(<User>{email, phone}))
        this.user = {phone, email}
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
