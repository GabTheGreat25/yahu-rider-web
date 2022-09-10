import { IRider } from "@app/interfaces";
import { createAction, props } from "@datorama/akita-ng-effects";

export const initialize = createAction("[Riders] Rider Initialize");

export const fetchRidersSuccess = createAction("[Rider API] Fetch Riders Success", props<{ riders: IRider<any>[] }>());

export const fetchRiderFailed = createAction("[Rider API] Fetch Riders Failed", props<{ error: any }>());
