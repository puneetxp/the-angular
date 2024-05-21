import { LoginProvider } from './login-provider';
import { SocialUser } from './social-user';
import { AsyncSubject, Observable } from 'rxjs';
import { loadScript } from './load.script';

export abstract class BaseLoginProvider extends loadScript implements LoginProvider {
  abstract initialize(autoLogin?: boolean): Promise<void>;
  abstract getLoginStatus(): Promise<SocialUser>;
  abstract signIn(signInOptions?: object): Promise<SocialUser>;
  abstract signOut(revoke?: boolean): Promise<void>;
 
  public initialized = false;
  public _initState: AsyncSubject<boolean> = new AsyncSubject();  
  public initState(): Observable<boolean> {
    return this._initState.asObservable();
  }

}
