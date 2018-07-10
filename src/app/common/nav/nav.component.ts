import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  public margin: number = 0;

  constructor(private breakpointObserver: BreakpointObserver,
              private  authService:AuthService) {
  }


  get isLoggedIn():boolean{
    return this.authService.user!==undefined;
  }

  onOpenedChange(isOpen: boolean) {
    this.margin = isOpen ? 200 : 0;
  }

  onLogOut() {
    this.authService.logout();
  }
}
