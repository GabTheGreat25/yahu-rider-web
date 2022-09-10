import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IShipper } from "src/app/interfaces";
export interface ShipperState extends EntityState<IShipper, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "shipper", idKey: "_id" })
export class ShipperStore extends EntityStore<ShipperState> {
  constructor() {
    super();
  }
}
