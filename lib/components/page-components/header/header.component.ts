import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { DropMenu } from '../../../interface/HeaderMenu';
import { Login } from '../../../interface/Login';
import { AuthService } from '../../../service/auth.service';

import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { KeyValuePipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

type ServiceOption = {
  title: string;
  description: string;
  route: string;
};

type NavItem = {
  label: string;
  route?: string;
  children?: ServiceOption[];
  callToAction?: boolean;
};

@Component({
  selector: 'the-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'z-10 top-0 right-0 left-0 fixed'
  },
  imports: [
    MatSidenavModule,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    KeyValuePipe,
    NgClass
  ]
})
export class HeaderComponent implements OnInit {
  login$!: Observable<Login | undefined>;
  constructor(private auth: AuthService, private store: Store, private elementRef: ElementRef<HTMLElement>) {
    this.login$ = this.store.select(state => state.login);
  }

  logout() {
    this.auth.logout();
  }
  @Input() DropMenu: DropMenu = {};
  @Output() drawerx = new EventEmitter<number>();
  toggle() {
    this.drawerx.emit(1);
  }

  getLogin: Login | undefined = undefined;
  DropMenuItem: Record<string, string> = {};
  showFiller: boolean = false;
  activeDropdown: string | null = null;

  serviceOptions: ServiceOption[] = [
    {
      title: 'GST Services',
      description: 'GST filing and compliance',
      route: '/services/tax',
    },
    {
      title: 'Income Tax',
      description: 'Income tax filing & planning',
      route: '/services/tax',
    },
    {
      title: 'Web Development',
      description: 'Custom website design and development',
      route: '/services/web-development',
    },
  ];

  navItems: NavItem[] = [
    // { label: 'Home', route: '/' },
    // { label: 'Service', children: this.serviceOptions },
    // { label: 'About', route: '/about-us' },
    // { label: 'Raise Inquiry', route: '/contact', callToAction: true },
  ];

  toggleDropdown(event: Event, label: string) {
    event.preventDefault();
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  openDropdown(label: string) {
    this.activeDropdown = label;
  }

  closeDropdown(label: string) {
    if (this.activeDropdown === label) {
      this.activeDropdown = null;
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.activeDropdown = null;
    }
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.activeDropdown = null;
  }

  ngOnInit(): void {
    this.login$.subscribe(i => {
      if (i) {
        this.getLogin = i;
        this.DropMenu && (Object.keys(this.DropMenu).forEach((key) => {
          this.getLogin?.roles?.find(i => key == i) && this.DropMenu[key].forEach(i => {
            this.DropMenuItem[i.name] = i.route;
          })
        }));
        this.DropMenuItem["Dashboard"] || (this.DropMenuItem["Dashboard"] = "/dashboard");
      }
    });
  }
}