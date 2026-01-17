import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';

@Component({
    selector: 'the-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css'],
    imports: [MatTabNav, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet]
})
export class SortComponent implements OnInit {

  constructor(public router: Router) {

  }
  regexp = new RegExp(":.+?(\/)|:.*", "g");
  checkroute(route: string): boolean {
    return this.router.url.match(new RegExp(this.normalizeRoute(route) + "$", "g")) && true || false;
  }
  @Input() navmenu!: {
    name: string,
    route: string,
  }[]
  ngOnInit() { }

  private normalizeRoute(route: string): string {
    return route.replace(this.regexp, '.+$1');
  }

}
