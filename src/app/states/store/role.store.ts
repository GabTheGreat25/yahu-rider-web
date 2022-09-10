import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IRole } from "src/app/interfaces";

export interface RoleState extends EntityState<IRole<any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "role", idKey: "_id" })
export class RoleStore extends EntityStore<RoleState> {
  constructor() {
    super();
  }
}
