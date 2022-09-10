import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IAddress } from "src/app/interfaces";
export interface AddressState extends EntityState<IAddress<any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "address", idKey: "_id" })
export class AddressStore extends EntityStore<AddressState> {
  constructor() {
    super();
  }
}
