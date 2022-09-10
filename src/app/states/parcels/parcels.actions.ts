import { IParcel } from "@app/interfaces";
import { createAction, props } from "@datorama/akita-ng-effects";

export const initialize = createAction("[Parcels] Deliveries Initialize", props<{ page: number; limit: number }>());

export const fetchParcels = createAction("[Parcels API] Fetch Parcels");

export const fetchParcelsSuccess = createAction("[Parcels API] Fetch Deliveries Success", props<{ parcels: IParcel<any, any, any>[] }>());
