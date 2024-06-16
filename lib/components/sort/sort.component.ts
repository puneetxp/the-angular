import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';

@Component({
    selector: 'the-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css'],
    standalone: true,
    imports: [MatTabNav, NgFor, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet]
})
export class SortComponent implements OnInit {

  constructor(public router: Router) {

  }
  regexp = new RegExp(":.+?(\/)|:.*", "g");
  checkroute(route: string): boolean {
    return this.router.url.match(new RegExp(route.replaceAll(this.regexp, '.+$1') + "$", "g")) && true || false;
  }
  @Input() navmenu!: {
    name: string,
    route: string,
  }[]
  ngOnInit() { }

}
