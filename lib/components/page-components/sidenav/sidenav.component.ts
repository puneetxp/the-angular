import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { map, Observable, Subscription, combineLatest } from 'rxjs';
import { NavigationFocusService } from './navigation-focus/navigation-focus.service';
import { MatDrawerToggleResult, MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Menu, MenuAction } from '../../../interface/Menu';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PageTitleComponent } from '../page-title/page-title.component';
import { MenuComponent } from './menu/menu.component';
import { NgClass, AsyncPipe, CommonModule } from '@angular/common';
import { MenuActionButton, MenuBarService } from './menu-bar.service';
import { MatMenuModule } from '@angular/material/menu';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 600;
const SMALL_WIDTH_BREAKPOINT = 959;
@Component({
  selector: 'the-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
  host: {
    class: 'flex flex-1'
  },
  imports: [
    CommonModule,
    MatSidenavContainer, MatSidenav, MenuComponent, MatSidenavContent,
    PageTitleComponent, MatButton, NgClass, MatIcon, RouterLinkActive, RouterLink,
    RouterOutlet, AsyncPipe, MatMenuModule
  ]
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  params: Observable<Params> | undefined;
  private currentParams: Params = {};
  isExtraScreenSmall: Observable<boolean>;
  menuBarService = inject(MenuBarService);
  isScreenSmall: Observable<boolean>;
  private subscriptions = new Subscription();
  readonly secondaryInlineLimit = 2;

  @Input() menus: Menu[] = [];
  active: Menu = {
    name: 'Rentzoma',
    route: '/',
    label: 'Rentzoma'
  };
  editingContext?: string;

  private _route = inject(ActivatedRoute);
  private _navigationFocusService = inject(NavigationFocusService);

  public router = inject(Router);
  private breakpoints = inject(BreakpointObserver);
  constructor() {
    this.router.events.subscribe(() => this.title());
    this.isExtraScreenSmall = this.breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = this.breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
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
    this.subscriptions.add(this.params.subscribe(latest => this.currentParams = latest));
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
      this.router.url == i.route || this.router.url.match(new RegExp(this.normalizeRoute(i.route) + "$", "g")) ||
      i.child && i.child.find(child => this.router.url == child.route || this.router.url.match(new RegExp(this.normalizeRoute(child.route) + "$", "g")))
    );
    this.active = active === undefined ? this.active : active;
    this.syncMenuBarActions(this.active);
  }
  toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
    return sidenav.toggle();
  }
  private syncMenuBarActions(menu?: Menu) {
    this.editingContext = undefined;
    this.menuBarService.resetPrimaryActionButton();
    this.menuBarService.resetActionButtons();
    if (!menu) return;
    const uniqueButtons = new Map<string, MenuActionButton>();
    const pushButton = (button?: MenuActionButton) => {
      if (!button?.href) return;
      if (uniqueButtons.has(button.href)) return;
      uniqueButtons.set(button.href, button);
    };
    (menu.child || []).forEach(child => {
      if (this.isRouteMatch(child.route) && child.name?.toLowerCase().includes('edit')) {
        const contextValue = this.resolveContextValue(child.route);
        this.editingContext = contextValue ? `${child.label || child.name} (${contextValue})` : (child.label || child.name);
      }
    });
    const explicitActions: (Menu | MenuAction)[] = Array.isArray(menu.actions) && menu.actions.length > 0
      ? [...menu.actions]
      : [
        ...((menu.child || []).filter(child => child.route && !child.route.includes('/:'))),
        ...(menu.links || [])
      ];
    explicitActions.forEach(action => {
      const button = this.toActionButton(action);
      if (button) pushButton(button);
    });
    const buttons = Array.from(uniqueButtons.values());
    if (!buttons.length) return;
    const primaryCandidate = buttons.find(btn => btn.icon === 'add') || buttons[0];
    this.menuBarService.setPrimaryActionButton(primaryCandidate);
    buttons.filter(btn => btn !== primaryCandidate).forEach(btn => this.menuBarService.setActionButton(btn));
  }
  private toActionButton(menu: Menu | MenuAction): MenuActionButton | undefined {
    if (!menu.route) return undefined;
    return {
      href: menu.route,
      icon: menu.icon || this.iconForName(menu.name || menu.label),
      label: menu.label || menu.name,
    };
  }
  private isRouteMatch(route?: string): boolean {
    if (!route) return false;
    if (this.router.url === route) return true;
    const transformed = this.normalizeRoute(route);
    try {
      return !!this.router.url.match(new RegExp(transformed + "$", "g"));
    } catch {
      return false;
    }
  }
  private normalizeRoute(route?: string): string {
    if (!route) return '';
    return route.replace(this.regexp, '.+$1');
  }
  private resolveContextValue(route?: string): string | undefined {
    if (!route) return undefined;
    const paramName = this.extractParamName(route);
    if (!paramName) return undefined;
    return this.currentParams?.[paramName];
  }
  private extractParamName(route: string): string | undefined {
    const match = route.match(/:([^/]+)/);
    return match ? match[1] : undefined;
  }
  private iconForName(name?: string): string | undefined {
    if (!name) return undefined;
    const lower = name.toLowerCase();
    if (lower.includes('add')) return 'add';
    if (lower.includes('edit')) return 'edit';
    if (lower.includes('sort')) return 'tune';
    if (lower.includes('view')) return 'visibility';
    if (lower.includes('show')) return 'visibility';
    return undefined;
  }
}
