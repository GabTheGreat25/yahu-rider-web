import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { AccountState, AccountStore } from "..";

@Injectable({ providedIn: "root" })
export class AccountQuery extends QueryEntity<AccountState> {
  accounts$ = this.selectAll({
    filterBy: ({ deleted }) => !deleted,
  });
  accounts = this.getAll({
    filterBy: ({ deleted }) => !deleted,
  });
  deletedAccounts$ = this.selectAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  deletedAccounts = this.getAll({
    filterBy: ({ deleted }) => !!deleted,
  });
  errors$ = this.selectError();
  constructor(protected accountStore: AccountStore) {
    super(accountStore);
  }
}
