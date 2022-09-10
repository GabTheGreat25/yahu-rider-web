import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@datorama/akita-ng-effects";
import { ApiService } from "../../services";
import * as actions from "./orders.actions";
import { OrdersStore } from "./orders.store";
import { arrayAdd } from "@datorama/akita";

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private store: OrdersStore, private api: ApiService) {}

  @Effect()
  orderAddItem$ = this.actions$.pipe(
    ofType(actions.orderAddItem),
    tap((action) => {
      this.store.setLoading(true);
      this.store.update((state) => ({
        ...state,
        items: arrayAdd(state.items, action.item),
      }));

      this.store.setLoading(false);
    })
  );

  @Effect()
  orderRemoveItem$ = this.actions$.pipe(
    ofType(actions.orderRemoveItem),
    tap((action) => {
      this.store.setLoading(true);
      const items = [...this.store.getValue().items];
      items.splice(action.itemIndex, 1);
      this.store.update((state) => ({
        ...state,
        items: items,
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderUpdatePickUp$ = this.actions$.pipe(
    ofType(actions.orderUpdatePickUp),
    tap((action) => {
      this.store.setLoading(true);
      const body: any = {};
      action.address.components.forEach((e: any) => {
        if (e.types.includes("postal_code")) body["zipCode"] = e.long_name;
        if (e.types.includes("administrative_area_level_2")) body["province"] = e.long_name;
        if (e.types.includes("administrative_area_level_1")) body["region"] = e.long_name;
        if (e.types.includes("sublocality")) body["barangay"] = e.long_name;
        if (e.types.includes("street_number")) body["street"] = e.long_name;
        if (e.types.includes("locality")) body["city"] = e.long_name;
      });

      if (!body["province"]) body["province"] = body["region"];

      this.store.update((state) => ({
        ...state,
        pickUp: {
          ...state.pickUp,
          ...action.address,
          ...body,
          show: true,
        },
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderUpdatePickUpInfo$ = this.actions$.pipe(
    ofType(actions.orderUpdatePickUpInfo),
    tap((action) => {
      this.store.setLoading(true);
      this.store.update((state) => ({
        ...state,
        pickUp: {
          ...state.pickUp,
          ...action.address,
          show: false,
        },
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderUpdateDropoff$ = this.actions$.pipe(
    ofType(actions.orderUpdateDropOff),
    tap((action) => {
      this.store.setLoading(true);
      const body: any = {};
      action.address.components.forEach((e: any) => {
        if (e.types.includes("postal_code")) body["zipCode"] = e.long_name;
        if (e.types.includes("administrative_area_level_2")) body["province"] = e.long_name;
        if (e.types.includes("administrative_area_level_1")) body["region"] = e.long_name;
        if (e.types.includes("sublocality")) body["barangay"] = e.long_name;
        if (e.types.includes("street_number")) body["street"] = e.long_name;
        if (e.types.includes("locality")) body["city"] = e.long_name;
      });

      if (!body["province"]) body["province"] = body["region"];

      this.store.update((state) => ({
        ...state,
        dropOff: {
          ...state.dropOff,
          ...action.address,
          ...body,
          show: true,
        },
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderUpdateDropoffInfo$ = this.actions$.pipe(
    ofType(actions.orderUpdateDropOffInfo),
    tap((action) => {
      this.store.setLoading(true);
      this.store.update((state) => ({
        ...state,
        dropOff: {
          ...state.dropOff,
          ...action.address,
          show: false,
        },
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderDeliverOrder$ = this.actions$.pipe(
    ofType(actions.orderDeliverOrder),
    tap(async (action) => {
      this.store.setLoading(true);

      const { dropOff, pickUp, items, payment, paymentBy } = this.store.getValue();

      const response = await this.api.post(
        "parcels",
        {
          pickupAddress: { ...pickUp },
          shippingAddress: { ...dropOff },
          items,
          fee: action.fee,
          weight: items.reduce((previous, e) => Number(previous) + Number(e.weight), 0),
          payment,
          paymentBy,
        },
        true
      );

      if (response.status !== "success") {
        this.store.setError(response.message);
      } else {
        this.store.reset();
      }

      this.store.setLoading(false);
    })
  );

  @Effect()
  orderPaymentChange$ = this.actions$.pipe(
    ofType(actions.orderPaymentChange),
    tap((action) => {
      this.store.update((state) => ({
        ...state,
        payment: action.payment,
      }));
    })
  );

  @Effect()
  orderPaymentByChange$ = this.actions$.pipe(
    ofType(actions.orderPaymentByChange),
    tap((action) => {
      this.store.setLoading(true);
      this.store.update((state) => ({
        ...state,
        paymentBy: action.paymentBy,
      }));
      this.store.setLoading(false);
    })
  );

  @Effect()
  orderClear$ = this.actions$.pipe(
    ofType(actions.orderClear),
    tap(() => {
      this.store.setLoading(true);
      this.store.reset();
      this.store.setLoading(false);
    })
  );
}
