import { Injectable } from "@angular/core";
import { map, tap, switchMap } from "rxjs/operators";
import { Actions, createEffect, Effect, ofType } from "@datorama/akita-ng-effects";
import { ApiService } from "../../services";
import * as actions from "./riders.actions";
import { RidersStore } from "./riders.store";
import { IApiResponse, IRider, IVehicle } from "@app/interfaces";

@Injectable()
export class RidersEffects {
  constructor(private actions$: Actions, private store: RidersStore, private api: ApiService) {}

  fetchRiders$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.initialize),
        switchMap((_) => {
          return this.api.get<IApiResponse<IRider<IVehicle>>>("users/rider?populate=vehicle").pipe(
            map((response) => {
              const { data = [] } = response;
              return actions.fetchRidersSuccess({ riders: data });
            })
          );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  fetchRidersSuccess$ = this.actions$.pipe(
    ofType(actions.fetchRidersSuccess),
    tap((action) => {
      this.store.update((state) => ({
        ...state,
        riders: action.riders,
      }));
    })
  );
}
