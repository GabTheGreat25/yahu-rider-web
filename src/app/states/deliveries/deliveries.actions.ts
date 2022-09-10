import { IDelivery } from "@app/interfaces";
import { createAction, props } from "@datorama/akita-ng-effects";

export const initialize = createAction("[Deliveries] Deliveries Initialize", props<{ page: number; limit: number }>());

export const fetchDeliveries = createAction("[Deliveries API] Fetch Deliveries", props<{ page: number; limit: number }>());

export const fetchDeliveriesSuccess = createAction(
  "[Deliveries API] Fetch Deliveries Success",
  props<{ deliveries: IDelivery<any, any, any>[]; total: number }>()
);
