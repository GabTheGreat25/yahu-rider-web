import { Injectable } from "@angular/core";
import { IUser } from "@app/interfaces";
import { Store, StoreConfig } from "@datorama/akita";

export interface AuthState {
  user: IUser<any>;
  refresh: string;
  token: string;
}

export function createInitialState(): AuthState {
  return {
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      type: "",
      phoneNumber: "",
      roles: [],
      avatar: "",
      deleted: false,
      DateCreated: "",
      DateUpdated: "",
    },
    refresh: "",
    token: "",
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "auth" })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
