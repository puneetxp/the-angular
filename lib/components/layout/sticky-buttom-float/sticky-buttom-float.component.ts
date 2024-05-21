import { Component, Input } from "@angular/core";

@Component({
  selector: "the-sticky-buttom-float",
  templateUrl: "./sticky-buttom-float.component.html",
  styleUrls: ["./sticky-buttom-float.component.scss"],
  host: {
    class: "fixed w-6 bottom-2 left-0 m-3 p-2 rounded-full grid gap-2 bg-mat_blu/80"
  }
})
export class StickyButtomFloatComponent {
  @Input({ required: true }) number: number = 0;
}
