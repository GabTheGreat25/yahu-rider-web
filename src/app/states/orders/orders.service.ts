import { Injectable } from "@angular/core";
import { Actions } from "@datorama/akita-ng-effects";
import {
  orderAddItem,
  orderClear,
  orderDeliverOrder,
  orderPaymentByChange,
  orderPaymentChange,
  orderRemoveItem,
  orderUpdateDropOff,
  orderUpdateDropOffInfo,
  orderUpdatePickUp,
  orderUpdatePickUpInfo,
} from "./orders.actions";
import { OrdersQuery } from "./orders.query";
import { OrdersStore } from "./orders.store";

export interface IItem {
  description: string;
  value: number;
  weight: number;
  code?: string;
}

export interface IAddress {
  name: string;
  number: string;
  description: string;
  province: string;
  city: string;
  region: string;
  lng: number;
  lat: number;
  show: boolean;
}

export interface OrdersState {
  pickUp: IAddress;
  dropOff: IAddress;
  payment: string;
  paymentBy: string;
  items: IItem[];
}

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private store: OrdersStore, private actions: Actions, private query: OrdersQuery) {}

  pickUp$ = this.query.select("pickUp");
  dropOff$ = this.query.select("dropOff");
  items$ = this.query.select("items");
  order$ = this.query.select();
  errors$ = this.query.selectError().pipe();
  error$ = this.query.selectError();
  loading$ = this.query.selectLoading();

  createParcel(fee: number) {
    this.actions.dispatch(orderDeliverOrder({ fee }));
  }

  addItem(item: IItem) {
    this.actions.dispatch(orderAddItem({ item }));
  }

  removeItem(itemIndex: number) {
    this.actions.dispatch(orderRemoveItem({ itemIndex }));
  }

  changePayment(payment: string) {
    this.actions.dispatch(orderPaymentChange({ payment }));
  }

  changePaymentBy(paymentBy: string) {
    this.actions.dispatch(orderPaymentByChange({ paymentBy }));
  }

  clear() {
    this.actions.dispatch(orderClear());
  }

  updateAddress(type: "pickUp" | "dropOff", address: { description: string; lng: number; lat: number; components: any[] }) {
    if (type === "pickUp") {
      this.actions.dispatch(orderUpdatePickUp({ address }));
    } else {
      this.actions.dispatch(orderUpdateDropOff({ address }));
    }
  }

  updateAddressInfo(type: "pickUp" | "dropOff", address: { name: string; number: string }) {
    if (type === "pickUp") {
      this.actions.dispatch(orderUpdatePickUpInfo({ address }));
    } else {
      this.actions.dispatch(orderUpdateDropOffInfo({ address }));
    }
  }
}
