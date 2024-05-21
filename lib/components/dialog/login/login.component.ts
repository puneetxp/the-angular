import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'the-angular/lib/module/material/material.module';
import { DynamicFormService } from 'the-angular/lib/service/Dynamic-form.service';
import { FormDataService } from 'the-angular/lib/service/Form/FormData.service';
import { AuthService } from 'the-angular/lib/service/auth.service';
import { ComponentsModule } from '../../components.module';
import { CommonModule } from '@angular/common';
import { FacebookSigninButtonDirective } from 'the-angular/lib/module/angularx-social-login-master/projects/lib/src/directives/facebook-singin-button-directive';
import { GoogleSigninButtonDirective } from 'the-angular/lib/module/angularx-social-login-master/projects/lib/src/public-api';
import { loginform } from 'the-angular/lib/service/login.service';
import { Login } from 'the-angular/lib/interface/Login';
import { Store } from '@ngxs/store';
import { SetLogin } from 'the-angular/lib/ngxs/Login.action';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    FacebookSigninButtonDirective,
    GoogleSigninButtonDirective,
    RouterLink,
    MatDialogModule
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
  ngOnInit(): void {
    this.auth.error = "";
    this.form.get("/api/login_method").subscribe((i: any) => {
      this.login_methods = i;
    })
  }
  Log = this.formdynamic.getForm([{
    key: "email", label: "Email", value: "", Validators: [Validators.required, Validators.email], controlType: 'textbox', class: 'w-full', error: "Please enter a valid email"
  }, {
    key: "password", label: "Password", value: "", Validators: [Validators.required, Validators.minLength(6)], controlType: 'password', class: 'w-full', error: "Min 6 charcter"
  }, {
    key: "remember_me", label: "Remeber Me", value: "", controlType: "checkbox"
  }]);

}
