import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { DeliveryStore, DeliveryState } from "..";

@Injectable({ providedIn: "root" })
export class DeliveryQuery extends QueryEntity<DeliveryState> {
  deliveries$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deliveries = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedDeliveries$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedDeliveries = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected deliveryStore: DeliveryStore) {
    super(deliveryStore);
  }
}
