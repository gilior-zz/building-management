import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  onOpenedChange(isOpen: boolean) {
    this.margin = isOpen ? 200 : 0;
  }
}
