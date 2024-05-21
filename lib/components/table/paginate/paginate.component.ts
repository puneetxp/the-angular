import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'the-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
  host: {
    class: "w-full"
  }
})
export class PaginateComponent implements OnInit {
  @Input() PageSize = 10;
  pageSize = 10;
  pageIndex = 0;
  ngOnInit() {
  }
}
