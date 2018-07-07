import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') || false);

  constructor() {
    let isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true')
      this.isLoggedIn = true;
  }

  login(email: string, phone: string): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        this.isLoggedIn = true
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
