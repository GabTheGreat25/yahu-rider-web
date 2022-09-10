import { Injectable } from "@angular/core";
import { IPermission, IResource, IRole } from "@app/interfaces";
import { Query } from "@datorama/akita";
import { AuthState, AuthStore } from "./auth.store";

@Injectable({ providedIn: "root" })
export class AuthQuery extends Query<AuthState> {
  constructor(protected override store: AuthStore) {
    super(store);
  }
  auth$ = this.select();
  user$ = this.select("user");
}
