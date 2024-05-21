import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { map, Observable, throwError } from "rxjs";
import { Login } from "../interface/Login";
import { DeleteLogin, SetLogin } from "../ngxs/Login.action";

export interface loginform {
  name: string;
  password: string,
  remember_me: boolean,
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private router: Router,
    private store: Store,
    public http: HttpClient
  ) { }
  public error: string = "";

  @Select() login$!: Observable<Login | false>;
  login: Login | false = false
  logcheck(): void {
    this.http.get<Login>(
      "/api/login",
    ).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j));
      },
      error: (e) => {
        console.log(e);
        this.store.dispatch(new DeleteLogin()).subscribe(() => this.router.navigate(["/login"], {
          queryParams: { returnUrl: this.router.url },
        }))
      },
    });
  }
  get() {
    return this.login$.pipe(map((i) => {
      return i;
    }));
  }
  logout(): void {
    this.http.get<string>("/api/logout").subscribe(
      {
        next: () => this.store.dispatch(new DeleteLogin()).subscribe(() => this.router.navigate(["/login"], {
          queryParams: { returnUrl: this.router.url },
        }))
      }
    );
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
