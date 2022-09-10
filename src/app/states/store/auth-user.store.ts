import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { IUser } from "src/app/interfaces";

export interface AuthUserState extends IUser<any> {}

export function createInitialState(): AuthUserState {
  return {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    deleted: false,
    DateCreated: "",
    DateUpdated: "",
    password: "",
    roles: [],
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "auth-user" })
export class AuthUserStore extends Store<AuthUserState> {
  constructor() {
    super(createInitialState());
  }
}
