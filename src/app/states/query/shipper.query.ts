import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ShipperState, ShipperStore } from "../store";

@Injectable({ providedIn: "root" })
export class ShipperQuery extends QueryEntity<ShipperState> {
  shippers$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  shippers = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedShippers$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedShippers = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected shipperStore: ShipperStore) {
    super(shipperStore);
  }
}
