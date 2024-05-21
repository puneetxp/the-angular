
import { Component, Input, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from 'the-angular/lib/interface/Menu';

@Component({
  selector: 'the-menu',
  templateUrl: './menu.component.html',
  styleUrls: ["./menu.component.sass"],
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
