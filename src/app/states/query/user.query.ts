import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { UserState, UserStore } from "../store";

@Injectable({ providedIn: "root" })
export class UserQuery extends QueryEntity<UserState> {
  users$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  users = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedUsers$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedUsers = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected userStore: UserStore) {
    super(userStore);
  }
}
