import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { map } from "rxjs";
import { DeliveriesState, DeliveriesStore } from "./deliveries.store";

@Injectable({ providedIn: "root" })
export class DeliveriesQuery extends Query<DeliveriesState> {
  constructor(protected override store: DeliveriesStore) {
    super(store);
  }

  select$ = this.select();
  deliveries$ = this.select("deliveries");

  selectDelivery(_id: string) {
    return this.deliveries$.pipe(map((deliveries) => deliveries.find((delivery) => delivery._id === _id)));
  }
}
