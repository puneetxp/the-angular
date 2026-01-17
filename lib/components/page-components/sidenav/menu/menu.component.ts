import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Params, Router, RouterLinkActive, RouterLink, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu } from '../../../../interface/Menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';

interface MenuGroup {
  group?: string;
  menus: Menu[];
}

@Component({
  selector: 'the-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  host: {
    class: 'block w-full lg:w-[280px] lg:min-w-[280px]'
  },
  imports: [
    CommonModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    MatButtonModule,
    AsyncPipe
  ],
})

export class MenuComponent implements OnInit, OnChanges {

  childRouteActive(menus: Menu[]): boolean {
    return menus.some(menu => this.ActiveRoute(menu));
  }
  ActiveRoute(menu: Menu) {
    if (menu.route) {
      // Check for exact match
      if (this.router.isActive(menu.route, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })) {
        return true;
      }
      
      // Check for routes with parameters
      const currentUrlNoQuery = this.router.url.split('?')[0];
      
      const routeParts = menu.route.split('/').filter(p => !!p);
      const currentUrlParts = currentUrlNoQuery.split('/').filter(p => !!p);

      if (routeParts.includes(':id')) {
        const reservedSegments = ['add', 'sort', 'by', 'serviceplan'];
        if (currentUrlParts.some(segment => reservedSegments.includes(segment))) {
          return false;
        }
      }

      if (routeParts.length === currentUrlParts.length && routeParts.every((part, index) => part.startsWith(':') || part === currentUrlParts[index])) {
        return true;
      }
    }
    if (menu.child) {
      return this.childRouteActive(menu.child);
    }
    return false;
  }
  @Input() params: Observable<Params> | undefined;
  @Input() menus: Menu[] = [];
  @Input() editingContext?: string;
  private expandedMenus = new Set<string>();
  groupedMenus: MenuGroup[] = [];
  constructor(public router: Router) {
    router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      this.ensureActiveParentsExpanded();
    });
  }
  orderRouteLink$ = new BehaviorSubject<any[] | string>([]);
  ngOnInit(): void {
    this.rebuildGroupedMenus();
    this.ensureActiveParentsExpanded();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menus']) {
      this.rebuildGroupedMenus();
    }
    this.ensureActiveParentsExpanded();
  }
  toggleExpansion(menu: Menu, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const key = this.menuKey(menu);
    if (this.expandedMenus.has(key)) {
      this.expandedMenus.delete(key);
    } else {
      this.expandedMenus.add(key);
    }
  }
  isExpanded(menu: Menu): boolean {
    return this.expandedMenus.has(this.menuKey(menu));
  }
  private ensureActiveParentsExpanded(menus: Menu[] = this.menus): void {
    menus?.forEach(menu => {
      if (this.ActiveRoute(menu)) {
        this.expandedMenus.add(this.menuKey(menu));
      }
      if (menu.child) {
        this.ensureActiveParentsExpanded(menu.child);
      }
    });
  }
  private rebuildGroupedMenus(): void {
    const grouped = new Map<string, Menu[]>();
    this.menus.forEach(menu => {
      const key = menu.group || 'Misc';
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(menu);
    });
    this.groupedMenus = Array.from(grouped.entries()).map(([group, menus]) => ({
      group: group === 'Misc' && !menus[0]?.group ? undefined : group,
      menus
    }));
  }
  private menuKey(menu: Menu): string {
    return menu.route || menu.name;
  }
  isEditingChild(child: Menu): boolean {
    return !!this.editingContext && this.ActiveRoute(child) && child.name?.toLowerCase().includes('edit');
  }
  hasEditingChild(menu: Menu): boolean {
    return !!menu.child?.some(child => this.isEditingChild(child));
  }
}
