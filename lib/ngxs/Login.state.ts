import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Login } from "../interface/Login";
import { SetLogin, DeleteLogin } from "./Login.action";

@State<Login |false>({
    name: "login",
    defaults: false
})
@Injectable()
export class LoginState {
    @Selector()
    static getLogin(state: Login) {
      return state;
    }
    @Selector()
    static isLogin(state: Login | false) {
      if (state) {
        return state;
      }
      return false;
    }
    @Action(SetLogin)
    SetLogin({ setState }: StateContext<Login>, { payload }: SetLogin): void {
      setState(payload);
    }
    @Action(DeleteLogin, { cancelUncompleted: true })
    DeleteLogin({ setState }: StateContext<false>) {
      setState(false);
    }
}
