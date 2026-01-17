import { Component, Input } from "@angular/core";
import { DropMenu } from '../../../interface/HeaderMenu';
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../page-components/header/header.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FooterComponent } from "../../page-components/footer/footer.component";
import { StickyButtomFloatComponent } from "../sticky-buttom-float/sticky-buttom-float.component";
import { AsyncPipe, JsonPipe, KeyValuePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Login } from '../../../interface/Login';
import { AuthService } from '../../../service/auth.service';
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-simple-skeleton',
  templateUrl: './simple-skeleton.component.html',
  styleUrls: ['./simple-skeleton.component.css'],
  host: {
    class: "flex flex-col min-h-[calc(100vh -56px)]"
  },
  providers: [],
  imports: [
    HeaderComponent,
    RouterOutlet,
    RouterModule,
    MatIcon,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    FooterComponent,
    StickyButtomFloatComponent,
    AsyncPipe,
    KeyValuePipe
]
})
export class SimpleSkeletonComponent {
  @Input() DropMenu: DropMenu = {};
  login$!: Observable<Login | undefined>;
  constructor(private auth: AuthService, private store: Store) {
    this.login$ = this.store.select(state => state.login);
  }
  logout() {
    this.auth.logout();
  }
  DropMenuItem: Record<string, string> = {};
  ngOnInit(): void { 
    this.login$.subscribe(i => {
      if (i) {
        this.DropMenu && (Object.keys(this.DropMenu).forEach((key) => {
          i?.roles?.find(i => key == i) && this.DropMenu[key].forEach(i => {
            this.DropMenuItem[i.name] = i.route;
          })
        }));
        this.DropMenuItem["Dashboard"] || (this.DropMenuItem["Dashboard"] = "/dashboard");
      }
    });
  }

}