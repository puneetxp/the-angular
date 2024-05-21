import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'the-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
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
