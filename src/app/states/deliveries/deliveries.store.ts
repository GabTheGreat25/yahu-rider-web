import { Injectable } from "@angular/core";
import { IDelivery } from "@app/interfaces";
import { Store, StoreConfig } from "@datorama/akita";

export interface DeliveriesState {
  deliveries: IDelivery<any, any, any>[];
  total: number;
}

export function createInitialState(): DeliveriesState {
  return {
    deliveries: [],
    total: 0,
  };
}

@StoreConfig({ name: "deliveries" })
@Injectable({ providedIn: "root" })
export class DeliveriesStore extends Store<DeliveriesState> {
  constructor() {
    super(createInitialState());
  }
}
