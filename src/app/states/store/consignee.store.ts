import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IConsignee } from "src/app/interfaces";
export interface ConsigneeState extends EntityState<IConsignee, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "consignee", idKey: "_id" })
export class ConsigneeStore extends EntityStore<ConsigneeState> {
  constructor() {
    super();
  }
}
