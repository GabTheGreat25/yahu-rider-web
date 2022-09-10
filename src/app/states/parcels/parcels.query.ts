import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { ParcelsState, ParcelsStore } from "./parcels.store";

@Injectable({ providedIn: "root" })
export class ParcelsQuery extends Query<ParcelsState> {
  constructor(protected override store: ParcelsStore) {
    super(store);
  }

  select$ = this.select();
}
