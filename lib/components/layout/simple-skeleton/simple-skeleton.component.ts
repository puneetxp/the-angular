import { Component, Input } from "@angular/core";
import { DropMenu } from 'the-angular/lib/interface/HeaderMenu';
import { FooterComponent } from "../../page-components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../page-components/header/header.component";

@Component({
    selector: 'app-simple-skeleton',
    templateUrl: './simple-skeleton.component.html',
    styleUrls: ['./simple-skeleton.component.css'],
    host: {
        class: "flex flex-col min-h-screen"
    },
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class SimpleSkeletonComponent {

  @Input() DropMenu: DropMenu = {};

}
