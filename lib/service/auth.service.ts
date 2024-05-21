import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormDataService } from './Form/FormData.service';
import { Login } from '../interface/Login';
import { DeleteLogin, SetLogin } from '../ngxs/Login.action';
import { loginform } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error = "";
  public returnUrl = "/";
  constructor(private store: Store, private router: Router, public form: FormDataService) { }
  login(sign: loginform, returnUrl?: string): void {
    this.form.post<Login>("/api/login", sign).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j))
          .subscribe(() => this.router.navigateByUrl(returnUrl || this.returnUrl));
      },
      error: (e) => {
        this.error = e.error;
      },
    });
  }

  logout(): void {
    this.form.get<string>("/api/logout").subscribe({
      next: () => this.store.dispatch(new DeleteLogin()).subscribe(() => this.router.navigateByUrl("/"))
    });
  }

  google(token: string) {
    this.form.get<Login>("/api/googleauth/" + token).subscribe({
      next: (j) => { this.store.dispatch(new SetLogin(j)).subscribe(() => this.router.navigateByUrl(this.returnUrl)) },
      error: (e) => { this.error = e.error },
    });
  }

  facebook(token:string) {
    this.form.get<Login>("/api/facebookauth/" + token).subscribe({
      next: (j) => { this.store.dispatch(new SetLogin(j)).subscribe(() => this.router.navigateByUrl(this.returnUrl)) },
      error: (e) => { this.error = e.error },
    });
  }
  register(sign: loginform, returnUrl: string = ""): void {
    this.form.post<Login>("/api/register", sign).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j))
          .subscribe(() => this.router.navigateByUrl(returnUrl || this.returnUrl));
      },
      error: (e) => {
        this.error = e.error;
      },
    });
  }
}
