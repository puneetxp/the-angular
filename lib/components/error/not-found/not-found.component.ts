import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'the-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  host: {
    class: "w-full flex justify-center grow content-center bg-mat_blu/80"
  }
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
