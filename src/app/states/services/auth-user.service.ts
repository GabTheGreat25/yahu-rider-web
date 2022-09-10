import { Injectable } from "@angular/core";
import { IUser } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { AuthUserStore } from "../store";
@Injectable({ providedIn: "root" })
export class AuthUserService {
  constructor(private authUserStore: AuthUserStore, private api: ApiService) {}

  setAuthUser(authUser: IUser<any>) {
    this.authUserStore.update(authUser);
  }
}
