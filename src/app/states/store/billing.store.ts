import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IBilling } from "src/app/interfaces";

export interface BillingState extends EntityState<IBilling<any, any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "billing", idKey: "_id" })
export class BillingStore extends EntityStore<BillingState> {
  constructor() {
    super();
  }
}
