import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { PermissionState, PermissionStore } from "..";

@Injectable({ providedIn: "root" })
export class PermissionQuery extends QueryEntity<PermissionState> {
  permissions$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  permissions = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedPermissions$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedPermissions = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected permissionStore: PermissionStore) {
    super(permissionStore);
  }
}
