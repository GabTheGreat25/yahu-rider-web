import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { map } from "rxjs/operators";
import { RidersState, RidersStore } from "./riders.store";

@Injectable({ providedIn: "root" })
export class RidersQuery extends Query<RidersState> {
  constructor(protected override store: RidersStore) {
    super(store);
  }

  selectRider$ = this.select("riders");

  selectRider(_id: string) {
    return this.selectRider$.pipe(map((riders) => riders.find((rider) => rider._id === _id)));
  }
}
