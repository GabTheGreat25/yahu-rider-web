import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { HubStore, HubState } from "../store";

@Injectable({ providedIn: "root" })
export class HubQuery extends QueryEntity<HubState> {
  hubs$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  hubs = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedHubs$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedHubs = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected hubStore: HubStore) {
    super(hubStore);
  }
}
