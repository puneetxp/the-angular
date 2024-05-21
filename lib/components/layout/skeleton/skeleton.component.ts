import { Component, Input } from "@angular/core";
import { DropMenu } from "the-angular/lib/interface/HeaderMenu";

@Component({
  selector: "the-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrls: ["./skeleton.component.scss"],
  host: {
    class: "flex flex-col h-screen"
  }
})
export class SkeletonComponent {
  @Input() DropMenu: DropMenu = {};
}
