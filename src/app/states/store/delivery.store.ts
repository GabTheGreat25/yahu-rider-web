import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IDelivery } from "src/app/interfaces";

export interface DeliveryState extends EntityState<IDelivery<any, any, any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "deliveries", idKey: "_id" })
export class DeliveryStore extends EntityStore<DeliveryState> {
  constructor() {
    super();
  }
}
