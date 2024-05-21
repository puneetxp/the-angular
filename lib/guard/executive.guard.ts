import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { map, Observable } from "rxjs";
import { Login } from "../interface/Login";

@Injectable({
  providedIn: "root",
})
export class ExecutiveGuard  {
  @Select()
  login$!: Observable<Login | undefined>;

  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.login$.pipe(map((i) => {
      if (i) {
        if (i.roles.includes("isuper") || i.roles.includes("executive")) return true;
        else return this.router.parseUrl("/not-allowed");
      } else return this.router.parseUrl("/login");
    }));
  }
}
