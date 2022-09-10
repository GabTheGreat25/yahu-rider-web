import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IResource } from "src/app/interfaces";

export interface ResourceState extends EntityState<IResource, string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "resource", idKey: "_id" })
export class ResourceStore extends EntityStore<ResourceState> {
  constructor() {
    super();
  }
}
