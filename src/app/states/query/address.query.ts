import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { AddressState, AddressStore } from "..";

@Injectable({ providedIn: "root" })
export class AddressQuery extends QueryEntity<AddressState> {
  addresses$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  addresses = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedAddresses$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedAddresses = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected addressStore: AddressStore) {
    super(addressStore);
  }
}
