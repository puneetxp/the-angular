import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { domain } from "../../../breakpoint";

@Component({
    selector: "the-sticky-buttom-float",
    templateUrl: "./sticky-buttom-float.component.html",
    styleUrls: ["./sticky-buttom-float.component.scss"],
    host: {
        class: "fixed w-10 bottom-2 left-0 m-3 p-2 z-20 rounded-full grid gap-2 bg-mat_blu/80"
    },
    imports: [MatIcon]
})
export class StickyButtomFloatComponent {
  @Input({ required: true }) number: number = 0;
  public domain = domain;
}
