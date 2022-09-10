import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { BillingState, BillingStore } from "../store";

@Injectable({ providedIn: "root" })
export class BillingQuery extends QueryEntity<BillingState> {
  billings$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  billings = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedBillings$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedBillings = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected billingStore: BillingStore) {
    super(billingStore);
  }
}
