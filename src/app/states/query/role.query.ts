import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { RoleState, RoleStore } from "../store";

@Injectable({ providedIn: "root" })
export class RoleQuery extends QueryEntity<RoleState> {
  roles$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  roles = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedRoles$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedRoles = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected roleStore: RoleStore) {
    super(roleStore);
  }
}
