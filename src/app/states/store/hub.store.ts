import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IHub } from "src/app/interfaces";

export interface HubState extends EntityState<IHub, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "hub", idKey: "_id" })
export class HubStore extends EntityStore<HubState> {
  constructor() {
    super();
  }
}
