import { Component, Input } from "@angular/core";
import { DropMenu } from "the-angular/lib/interface/HeaderMenu";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../page-components/header/header.component";

@Component({
    selector: "the-skeleton",
    templateUrl: "./skeleton.component.html",
    styleUrls: ["./skeleton.component.scss"],
    host: {
        class: "flex flex-col h-screen"
    },
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class SkeletonComponent {
  @Input() DropMenu: DropMenu = {};
}
