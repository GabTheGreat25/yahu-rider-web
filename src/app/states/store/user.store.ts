import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IUser } from "src/app/interfaces";

export interface UserState extends EntityState<IUser<any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "users", idKey: "_id" })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super();
  }
}
