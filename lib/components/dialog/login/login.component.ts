import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

import { DynamicFormService } from '../../../service/Dynamic-form.service';
import { FormDataService } from '../../../service/Form/FormData.service';
import { AuthService } from '../../../service/auth.service';

import { FacebookSigninButtonDirective } from '../../../module/angularx-social-login-master/projects/lib/src/directives/facebook-singin-button-directive';
import { GoogleSigninButtonDirective } from '../../../module/angularx-social-login-master/projects/lib/src/public-api';
import { loginform } from '../../../service/login.service';
import { Login } from '../../../interface/Login';

import { Store } from '@ngxs/store';
import { SetLogin } from '../../../ngxs/Login.action';

import { MatCardActions, MatCardModule, MatCardSubtitle } from '@angular/material/card';
import { FormDynamicComponent } from '../../Input/form-dynamic/form-dynamic.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';

@Component({
    imports: [
    FacebookSigninButtonDirective,
    GoogleSigninButtonDirective,
    RouterLink,
    MatButton,
    MatDialogModule,
    MatCardActions,
    MatCardModule,
    FormDynamicComponent,
    MatExpansionModule
],
    selector: 'the-login-dialog',
    templateUrl: './login.component.html'
})
export class LoginDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public auth: AuthService,
    public formdynamic: DynamicFormService,
    private form: FormDataService,
    private store: Store
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  google(token: string) {
    this.form.get<Login>("/api/googleauth/" + token).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j)).subscribe(() => {
          this.dialogRef.close(true);
        })
      },
      error: (e) => { console.log(e) },
    });
  }

  facebook(token: string) {
    this.form.get<Login>("/api/facebookauth/" + token).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j)).subscribe(() => {
          this.dialogRef.close(true);
        })
      },
      error: (e) => { console.log(e) },
    });
  }
  returnUrl: string = "/";
  login_methods: any = {};
  login(sign: loginform) {
    this.form.post<Login>("/api/login", sign).subscribe({
      next: (j) => {
        this.store.dispatch(new SetLogin(j))
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      },
      error: (e) => {

      },
    });
  }
  Log!: ReturnType<DynamicFormService['getForm']>;
  ngOnInit(): void {
    this.Log = this.formdynamic.getForm([
      {
        key: "email", label: "Email", value: "", Validators: [Validators.required, Validators.email], controlType: 'textbox', class: 'w-full', error: "Please enter a valid email"
      },
      {
        key: "password", label: "Password", value: "", Validators: [Validators.required, Validators.minLength(6)], controlType: 'password', class: 'w-full', error: "Min 6 charcter"
      },
      {
        key: "remember_me", label: "Remeber Me", value: "", controlType: "checkbox"
      }
    ]);
    this.auth.error = "";
    this.form.get("/api/login_method").subscribe((i: any) => {
      this.login_methods = i;
    })
  }

}
