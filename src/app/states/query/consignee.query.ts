import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ConsigneeStore, ConsigneeState } from "..";

@Injectable({ providedIn: "root" })
export class ConsigneeQuery extends QueryEntity<ConsigneeState> {
  consignees$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  consignees = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedConsignees$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedConsignees = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected consigneeStore: ConsigneeStore) {
    super(consigneeStore);
  }
}
