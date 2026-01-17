import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { domain } from '../../breakpoint';
import { predefined } from '../../class/predefined';

@Injectable({
  providedIn: 'root'
})
export class FormJsonService {
  constructor(private http: HttpClient, private login: LoginService) { }
  method = "GET";
  action!: string;
  formJson: Record<string, any> = {};
  get<T>(url: string, json: Record<string, any> = {}) {
    return this.Req<T>("get" , url + "?" + (new URLSearchParams(json).toString()));
  }
  reset() {
    this.formJson = {};
    this.method = "POST";
    this.action = "";
    return this;
  }
  post<T>(url: string, json?: Record<string, any>) {
    this.method = "post";
    this.action
    return this.reset().Req<T>('post', url, json, true);
  }
  HTML(form: HTMLFormElement): this {
    this.reset();
    const m = form.getAttribute("method");
    if (m) {
      this.method = m;
    }
    if (form.action) {
      this.action = form.action;
    }
    form.querySelectorAll("input").forEach((element) => {
      if (element.name) {
        this.formJson[element.name] = element.value;
      }
    });
    return this;
  }
  Req<T>(method?: string, url?: string, json?: Record<string, any>, checklogin?: boolean): Observable<T> {
    method && (this.method = method);
    url = domain + url;
    return this.http.request(this.method, url, {
      body: json,
      ...(localStorage.getItem("session_id") !== null ? {
        headers: new HttpHeaders({
          'x-session-id': localStorage.getItem("session_id") || "",
        }),
      } : { headers: {} }),
      observe: "response"
    }).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      if (checklogin) {
        (error.status == 401 || error.status == 403) && this.login.logcheck();
      }
      return throwError(() => { return error });
    }), map((i) => {
      console.log(i);
      if (i.type === 4) {// Check if session_id exists
        if (i.headers.has("x-session-id")) {
          predefined.set_session(i.headers)
        }
      }
      return i.body as T;
    }));
  }
  ReqReport(): Observable<HttpEvent<Object>> {
    //only for the php 
    return this.http.request(this.method, this.action, {
      body: this.formJson,
      observe: "events",
      reportProgress: true,
    }).pipe(catchError(this.login.errorMgmt));
  }
}
