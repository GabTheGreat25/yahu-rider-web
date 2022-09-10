import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IPermission } from "src/app/interfaces";

export interface PermissionState extends EntityState<IPermission<any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "permission", idKey: "_id" })
export class PermissionStore extends EntityStore<PermissionState> {
  constructor() {
    super();
  }
}
