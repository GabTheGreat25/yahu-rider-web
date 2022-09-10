import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ItemState, ItemStore } from "..";

@Injectable({ providedIn: "root" })
export class ItemQuery extends QueryEntity<ItemState> {
  items$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  items = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedItems$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedItems = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected itemStore: ItemStore) {
    super(itemStore);
  }
}
