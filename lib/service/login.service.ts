import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { catchError, map, Observable, throwError } from 'rxjs';

import { domain } from '../breakpoint';
import { Login } from '../interface/Login';
import { DeleteLogin, SetLogin } from '../ngxs/Login.action';
import { LoginState } from '../ngxs/Login.state';

export interface loginform {
  name: string;
  password: string;
  remember_me: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private store: Store,
    public http: HttpClient,
  ) { }

  public error = '';

  @Select(LoginState.getLogin) login$!: Observable<Login | false>;
  login: Login | false = false;

  logcheck(): void {
    this.http.get<Login>(domain + '/api/login', {
      ...(localStorage.getItem('session_id') !== null
        ? {
          headers: new HttpHeaders({
            'x-session-id': localStorage.getItem('session_id') || '',
          }),
        }
        : {}),
      observe: 'response',
    }).subscribe({
      next: (j) => {
        if (j.headers.has('x-session-id')) {
          localStorage.setItem('session_id', j.headers.get('x-session-id') || '');
        }
        if (j.body) {
          this.store.dispatch(new SetLogin(j.body));
        }
      },
      error: (e) => {
        localStorage.removeItem('session_id');
        console.log(e);
        this.store.dispatch(new DeleteLogin()).subscribe(() =>
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
          }),
        );
      },
    });
  }

  get() {
    return this.login$.pipe(map((i) => i));
  }

  logout(): void {
    this.http.get<string>(domain + '/api/logout', {
      ...(localStorage.getItem('session_id') !== null
        ? {
          headers: new HttpHeaders({
            'x-session-id': localStorage.getItem('session_id') || '',
          }),
        }
        : {}),
      observe: 'response',
    }).subscribe({
      next: () => {
        localStorage.removeItem('session_id');
        this.store.dispatch(new DeleteLogin()).subscribe(() =>
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
          }),
        );
      },
      error: (e) => {
        localStorage.removeItem('session_id');
        console.log(e);
        this.store.dispatch(new DeleteLogin()).subscribe(() =>
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
          }),
        );
      },
    });
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
