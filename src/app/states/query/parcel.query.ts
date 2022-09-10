import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ParcelStore, ParcelState } from "../store";
@Injectable({ providedIn: "root" })
export class ParcelQuery extends QueryEntity<ParcelState> {
  parcel$ = this.selectAll();
  parcel = this.getAll();
  errors$ = this.selectError();
  constructor(protected parcelStore: ParcelStore) {
    super(parcelStore);
  }
}
