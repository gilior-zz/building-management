import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') || false);

  constructor(private router: Router) {
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
    localStorage.setItem('isLoggedIn', JSON.stringify(false))
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
