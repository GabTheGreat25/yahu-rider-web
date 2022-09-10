import { Injectable } from "@angular/core";
import { map, tap, switchMap } from "rxjs/operators";
import { Actions, createEffect, Effect, ofType } from "@datorama/akita-ng-effects";
import { ApiService } from "../../services";
import * as actions from "./parcels.actions";
import { ParcelsStore } from "./parcels.store";
import { IApiResponse, IParcel } from "@app/interfaces";

@Injectable()
export class ParcelsEffects {
  constructor(private actions$: Actions, private store: ParcelsStore, private api: ApiService) {}

  fetchParcels$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.initialize, actions.fetchParcels),
        switchMap(() => {
          return this.api.get<IApiResponse<IParcel<any, any, any>>>(`parcels`).pipe(
            map((response) => {
              const { data = [] } = response;
              return actions.fetchParcelsSuccess({ parcels: data });
            })
          );
        })
      ),
    { dispatch: true }
  );

  @Effect()
  fetchParcelsSuccess$ = this.actions$.pipe(
    ofType(actions.fetchParcelsSuccess),
    tap(({ parcels }) => {
      this.store.update((state) => ({
        ...state,
        parcels,
      }));
    })
  );
}
