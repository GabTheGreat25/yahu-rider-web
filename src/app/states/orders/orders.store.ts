import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { OrdersState } from "./orders.service";

export function createInitialState(): OrdersState {
  return {
    pickUp: {
      name: "",
      number: "",
      description: "",
      province: "",
      region: "",
      city: "",
      lng: 0,
      lat: 0,
      show: false,
    },
    dropOff: {
      name: "",
      number: "",
      description: "",
      province: "",
      region: "",
      city: "",
      lng: 0,
      lat: 0,
      show: false,
    },
    payment: "",
    paymentBy: "",
    items: [],
  };
}

@StoreConfig({ name: "orders" })
@Injectable({ providedIn: "root" })
export class OrdersStore extends Store<OrdersState> {
  constructor() {
    super(createInitialState());
  }
}
