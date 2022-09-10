import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { RiderState, RiderStore } from "..";

@Injectable({ providedIn: "root" })
export class RiderQuery extends QueryEntity<RiderState> {
  riders$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  riders = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedRiders$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedRiders = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected riderStore: RiderStore) {
    super(riderStore);
  }
}
