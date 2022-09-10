import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";
import { authLoginUser, authLogout, authSetAccessToken } from "./auth.actions";
import { Actions } from "@datorama/akita-ng-effects";
import { AuthQuery } from "./auth.query";
import { IPermission, IResource, IRole } from "@app/interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _login = new BehaviorSubject<boolean>(false);
  private _resource: IResource[] = [];
  error$ = this.query.selectError();
  loading$ = this.query.selectLoading();
  login$ = this._login.asObservable();
  isLogin = false;

  constructor(private store: AuthStore, private actions: Actions, private query: AuthQuery) {
    this.query.auth$.subscribe((auth) => {
      this.isLogin = !!auth.token && !!auth.refresh;
      this._login.next(this.isLogin);
    });
  }

  get value() {
    return this.store.getValue();
  }

  get refresh() {
    return this.value.refresh;
  }

  get token() {
    return this.value.token;
  }

  get user() {
    return this.value.user;
  }

  get roles() {
    return this.value.user.roles;
  }

  get resource(): IResource[] {
    return this._resource.length === 0 ? this.updateResource() : this._resource;
  }

  updateResource() {
    const permissions = this.roles.flatMap((role: IRole<any>) => role.permissions);
    const resources = permissions.flatMap((permission: IPermission<IResource>) => permission.resources);
    this._resource = [];

    resources.forEach((item) => {
      const hasSeen = this._resource.some((e) => e._id === item._id);
      if (!hasSeen) this._resource.push(item);
    });

    return this._resource;
  }

  setAccessToken(token: string) {
    this.actions.dispatch(authSetAccessToken({ token }));
  }

  login(body: { credential: string; password: string }) {
    this.actions.dispatch(authLoginUser(body));
  }

  logout() {
    this.actions.dispatch(authLogout());
  }
}
