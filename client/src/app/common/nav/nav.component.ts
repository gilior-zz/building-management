import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {MetaDataService} from "../../services/meta-data.service";
import {ApartmentTenant} from '../../../../../shared/models';
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "../animations";


@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class NavComponent {
  isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  public margin: number = 0;

  constructor(private breakpointObserver: BreakpointObserver,
              public  authService: AuthService,
              private metaDataService: MetaDataService) {
  }

  // get lastUpdateTime(): Date {
  //   return this.metaDataService.metaData.lastUpdateTime;
  // }

  get currentUser():ApartmentTenant{
    return this.authService.user
  }


  get isLoggedIn(): boolean {
    return this.authService.user !== undefined;
  }

  onOpenedChange(isOpen: boolean) {
    this.margin = isOpen ? 200 : 0;
  }

  onLogOut() {
    this.authService.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
