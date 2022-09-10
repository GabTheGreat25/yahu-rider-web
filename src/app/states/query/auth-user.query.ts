import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { AuthUserStore, AuthUserState } from "../store";
import { IPermission, IResource, IRole, RESOURCES_TYPE, TABS } from "../../interfaces";
import { RESOURCE_METHOD } from "src/app/constants";

@Injectable({ providedIn: "root" })
export class AuthUserQuery extends Query<AuthUserState> {
  authUser$ = this.select();
  authUser = this.getValue();
  private _resource: IResource[] = [];

  constructor(protected authUserStore: AuthUserStore) {
    super(authUserStore);
  }

  get resource(): IResource[] {
    if (this._resource.length === 0) {
      const permissions = this.getValue().roles.flatMap((role: IRole<any>) => role.permissions);
      const resources = permissions.flatMap((permission: IPermission<IResource>) => permission.resources);
      this._resource = [];

      resources.forEach((item) => {
        const hasSeen = this._resource.some((e) => e._id === item._id);
        if (!hasSeen) this._resource.push(item);
      });
    }

    return this._resource;
  }

  hasPermissions(name: TABS, type: RESOURCES_TYPE): boolean {
    return this._resource.some((resource) => resource.method === RESOURCE_METHOD(type) && resource.name.includes(name));
  }
}
