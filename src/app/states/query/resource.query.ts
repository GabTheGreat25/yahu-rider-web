import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ResourceState, ResourceStore } from "../store";

@Injectable({ providedIn: "root" })
export class ResourceQuery extends QueryEntity<ResourceState> {
  resources$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  resources = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedResources$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedResources = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected resourceStore: ResourceStore) {
    super(resourceStore);
  }
}
