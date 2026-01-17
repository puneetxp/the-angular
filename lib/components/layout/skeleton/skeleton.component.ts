import { Component, Input, OnInit } from "@angular/core";
import { DropMenu } from "../../../interface/HeaderMenu";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../page-components/header/header.component";
import { FooterComponent } from "../../page-components/footer/footer.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { KeyValuePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Login } from "../../../interface/Login";
import { AuthService } from "../../../service/auth.service";
import { Store } from "@ngxs/store";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "the-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrls: ["./skeleton.component.scss"],
  host: {
    class: "flex flex-col h-screen"
  },
  imports: [HeaderComponent, MatSidenavModule, RouterOutlet, RouterLink, MatIcon, KeyValuePipe, MatButtonModule]
})
export class SkeletonComponent implements OnInit {
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
