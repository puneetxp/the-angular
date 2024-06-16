import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DropMenu } from 'the-angular/lib/interface/HeaderMenu';
import { Login } from 'the-angular/lib/interface/Login';
import { AuthService } from 'the-angular/lib/service/auth.service';
import { LoginService } from 'the-angular/lib/service/login.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'the-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    host: {
        class: 'z-10 top-0 right-0 left-0 fixed'
    },
    standalone: true,
    imports: [
        MatToolbar,
        MatAnchor,
        RouterLink,
        RouterLinkActive,
        NgIf,
        MatIconButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        NgFor,
        MatMenuItem,
        KeyValuePipe,
    ],
})
export class HeaderComponent implements OnInit {

  @Select() login$!: Observable<Login | undefined>;
  @Input() DropMenu: DropMenu = {};
  getLogin: Login | undefined = undefined;
  DropMenuItem: Record<string, string> = {};
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
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
