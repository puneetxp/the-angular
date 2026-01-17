import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { FacebookLoginProvider } from '../providers/facebook-login-provider';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[facebooksigninbutton]',
  standalone: true
})
export class FacebookSigninButtonDirective implements OnInit {


  constructor(private el: ElementRef) { }
  @Input() @HostBinding('attr.disabled') disabled: boolean | null = null;
  @Input({ required: true }) callback!: any;

  providor !: FacebookLoginProvider;

  @Input({ required: true }) client_id: string = "";

  @HostListener('click')
  onClick() {
    this.disabled = true
    this.providor = (new FacebookLoginProvider(this.client_id));
    this.providor.initialize().then(() => this.providor.signIn().then((i) => {
      this.callback.facebook(i);
    }));

  }
  ngOnInit(): void {

  }
}
