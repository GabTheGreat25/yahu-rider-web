import { createAction, props } from "@datorama/akita-ng-effects";
import { IItem } from "./orders.service";

export const orderUpdatePickUp = createAction(
  "[Order Page] Update Pickup Input",
  props<{
    address: {
      description: string;
      lng: number;
      lat: number;
      components: any[];
    };
  }>()
);

export const orderUpdateDropOff = createAction(
  "[Order Page] Update Drop Off Input",
  props<{ address: { description: string; lng: number; lat: number; components: any[] } }>()
);

export const orderUpdatePickUpInfo = createAction(
  "[Order Page] Update Pickup Info Input",
  props<{
    address: {
      name: string;
      number: string;
    };
  }>()
);

export const orderUpdateDropOffInfo = createAction(
  "[Order Page] Update Drop off Info Input",
  props<{
    address: {
      name: string;
      number: string;
    };
  }>()
);

export const orderAddItem = createAction("[Order Type Page] Add Item Submit", props<{ item: IItem }>());

export const orderRemoveItem = createAction("[Order Type Page] Remove Item Submit", props<{ itemIndex: number }>());

export const orderDeliverOrder = createAction("[Order Type Page] Delivery Order Submit", props<{ fee: number }>());

export const orderPaymentChange = createAction("[Order Type Page] Payment Change", props<{ payment: string }>());

export const orderPaymentByChange = createAction("[Order Type Page] Payment By Change", props<{ paymentBy: string }>());

export const orderClear = createAction("[Order Page] Clear State");
