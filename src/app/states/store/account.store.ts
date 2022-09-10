import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IAccount } from "src/app/interfaces";
export interface AccountState extends EntityState<IAccount, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "account", idKey: "_id" })
export class AccountStore extends EntityStore<AccountState> {
  constructor() {
    super();
  }
}
