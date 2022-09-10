import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { OrdersState } from "./orders.service";
import { OrdersStore } from "./orders.store";

@Injectable({ providedIn: "root" })
export class OrdersQuery extends Query<OrdersState> {
  constructor(protected override store: OrdersStore) {
    super(store);
  }
}
