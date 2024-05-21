import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { GoogleLoginProvider } from '../providers/google-login-provider';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[googlesigninbutton]',
  standalone: true
})
export class GoogleSigninButtonDirective implements OnInit {

  private _el: ElementRef;

  constructor(el: ElementRef) { this._el = el; }

  @Input() type: 'icon' | 'standard' = 'icon';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() text: 'signin_with' | 'signup_with' | 'continue_with' = 'signin_with';

  @Input() shape: 'square' | 'circle' | 'pill' | 'rectangular' = 'rectangular';

  @Input() theme: 'outline' | 'filled_blue' | 'filled_black' = 'outline';

  @Input() logo_alignment: 'left' | 'center' = 'left';

  @Input({ required: true }) callback!: any;

  @Input() width: string = "";

  @Input() locale: string = '';

  @Input({ required: true }) client_id: string = "";

  ngOnInit(): void {
    (new GoogleLoginProvider(this.client_id)).call(this.callback).initialize().then(() => {
      Promise.resolve(this.width).then((value) => {
        if (value > "400" || (value < "200" && value != "")) {
          Promise.reject(
            'Please note .. max-width 400 , min-width 200 ' +
            '(https://developers.google.com/identity/gsi/web/tools/configurator)'
          );
        } else {
          google.accounts.id.renderButton(this._el.nativeElement, {
            type: this.type,
            size: this.size,
            text: this.text,
            // @ts-ignore
            width: this.width,
            shape: this.shape,
            theme: this.theme,
            logo_alignment: this.logo_alignment,
            locale: this.locale
          });
        }
      });
    });
  }
}
