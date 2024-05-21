import { Login } from "../interface/Login";

export class SetLogin {
      static readonly type = "[LOGIN] Edit";
      constructor(public payload: Login) { }
}

export class DeleteLogin {
      static readonly type = "[LOGIN] reset";
}