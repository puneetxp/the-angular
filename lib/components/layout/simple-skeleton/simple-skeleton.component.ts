import { Component, Input } from "@angular/core";
import { DropMenu } from 'the-angular/lib/interface/HeaderMenu';

@Component({
  selector: 'app-simple-skeleton',
  templateUrl: './simple-skeleton.component.html',
  styleUrls: ['./simple-skeleton.component.css'],
  host: {
    class: "flex flex-col min-h-screen"
  }
})
export class SimpleSkeletonComponent {

  @Input() DropMenu: DropMenu = {};

}
