import { Injectable } from "@angular/core";
import { map, tap, switchMap } from "rxjs/operators";
import { Actions, createEffect, Effect, ofType } from "@datorama/akita-ng-effects";
import { ApiService } from "../../services";
import * as actions from "./deliveries.actions";
import { DeliveriesStore } from "./deliveries.store";
import { IApiResponse, IDelivery } from "@app/interfaces";

@Injectable()
export class DeliveriesEffects {
  constructor(private actions$: Actions, private store: DeliveriesStore, private api: ApiService) {}

  fetchDeliveries$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.initialize, actions.fetchDeliveries),
        switchMap((action) => {
          const { page = 1, limit = 10 } = action;
          return this.api.get<IApiResponse<IDelivery<any, any, any>>>(`deliveries?page=${page}&limit=${limit}`).pipe(
            map((response) => {
              const {
                data = [],
                meta: { total = 0 },
              } = response;
              return actions.fetchDeliveriesSuccess({ deliveries: data, total });
            })
          );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  fetchDeliveriesSuccess$ = this.actions$.pipe(
    ofType(actions.fetchDeliveriesSuccess),
    tap(({ deliveries, total }) => {
      this.store.update((state) => ({
        ...state,
        deliveries,
        total,
      }));
    })
  );
}
