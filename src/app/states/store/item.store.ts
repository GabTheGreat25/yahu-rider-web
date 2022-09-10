import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IItem } from "src/app/interfaces";
export interface ItemState extends EntityState<IItem, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "items", idKey: "_id" })
export class ItemStore extends EntityStore<ItemState> {
  constructor() {
    super();
  }
}
