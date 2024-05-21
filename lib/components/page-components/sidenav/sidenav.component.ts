import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable, Subscription, combineLatest } from 'rxjs';
import { NavigationFocusService } from './navigation-focus/navigation-focus.service';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Menu } from 'the-angular/lib/interface/Menu';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 600;
const SMALL_WIDTH_BREAKPOINT = 959;
@Component({
  selector: 'the-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
  host: {
    class: 'flex flex-1'
  }
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  params: Observable<Params> | undefined;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;
  private subscriptions = new Subscription();

  @Input() menus: Menu[] = [];
  active: Menu = {
    name: 'Intaxing',
    route: '/',
    label: 'Intaxing'
  };
  constructor(
    private _route: ActivatedRoute,
    private _navigationFocusService: NavigationFocusService,
    public router: Router,
    breakpoints: BreakpointObserver) {
    this.router.events.subscribe(() => this.title());
    this.isExtraScreenSmall = breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }
  ngOnInit() {
    !this.menus.find(i => i.name == "Back to Main Site") && this.menus.push({
      name: "Back to Main Site",
      route: "/back",
      label: "Back to Main Site",
    });
    this.title();
    this.params = combineLatest(this._route.pathFromRoot.map(route => route.params), Object.assign);
    this.subscriptions.add(
      this._navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall))
        .subscribe((shouldCloseSideNav) => {
          if (shouldCloseSideNav && this.sidenav) {
            this.sidenav.close();
          }
        }
        ));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  regexp = new RegExp(":.+?(\/)|:.*", "g");
  title(): void {
    document.querySelector("mat-sidenav-content")?.scroll({ top: 0 });
    const active = this.menus.find(i =>
      this.router.url == i.route || this.router.url.match(new RegExp(i.route.replaceAll(this.regexp, '.+$1') + "$", "g")) ||
      i.child && i.child.find(i => this.router.url == i.route || this.router.url.match(new RegExp(i.route.replaceAll(this.regexp, '.+$1') + "$", "g")))
    );
    this.active = active === undefined ? this.active : active;
  }
  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
}
