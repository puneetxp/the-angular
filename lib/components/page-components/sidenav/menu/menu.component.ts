
import { Component, Input, OnInit } from '@angular/core';
import { Params, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from 'the-angular/lib/interface/Menu';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItem } from '@angular/material/list';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'the-menu',
    templateUrl: './menu.component.html',
    styleUrls: ["./menu.component.sass"],
    standalone: true,
    imports: [
        NgIf,
        MatNavList,
        NgFor,
        MatListItem,
        RouterLinkActive,
        RouterLink,
        MatIcon,
        AsyncPipe,
    ],
})
export class MenuComponent {

  @Input() params: Observable<Params> | undefined;
  @Input() menus: Menu[] = [];
  constructor(public router: Router) {
    router.events.subscribe(() => this.menus = this.menus);
  }
  orderRouteLink$ = new BehaviorSubject<any[] | string>([]);
  ngOnInit(): void {
  }
}
