import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IRider } from "src/app/interfaces";
export interface RiderState extends EntityState<IRider<any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "rider", idKey: "_id" })
export class RiderStore extends EntityStore<RiderState> {
  constructor() {
    super();
  }
}
