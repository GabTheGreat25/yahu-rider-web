import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IParcel } from "src/app/interfaces";

export interface ParcelState extends EntityState<IParcel<any, any, any>, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "parcel", idKey: "_id" })
export class ParcelStore extends EntityStore<ParcelState> {
  constructor() {
    super();
  }
}
