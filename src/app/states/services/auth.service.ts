import { Injectable } from "@angular/core";
import { resetStores } from "@datorama/akita";
import { AuthStore, AuthUserStore } from "..";
import { IRole, IUser } from "src/app/interfaces";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private authStore: AuthStore, private authUserStore: AuthUserStore) {}

  setToken(token: string, refresh: string) {
    this.setAccess(token);
    this.setRefresh(refresh);
  }

  setAccess(token: string = "") {
    this.authStore.update({ token });
  }

  setRefresh(refresh: string = "") {
    localStorage.setItem("refresh", JSON.stringify({ refresh }));
  }

  getRefresh(): string {
    const { refresh = "" } = JSON.parse(localStorage.getItem("refresh") ?? "{}");
    return refresh;
  }

  setAuth(user: IUser<any>, roles: IRole<any>[]) {
    this.authUserStore.update({
      ...user,
      roles: roles,
    });
  }

  setErrors(error: any) {
    this.authStore.setError(error);
  }

  logout() {
    localStorage.clear();
    resetStores();
  }
}
