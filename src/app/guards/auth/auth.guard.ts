import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@app/states/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  prevRoute = "/";

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { refresh, user } = this.auth.value;
    const protectedRoutes = ["/order"];
    const isClient = !user?.type && refresh !== "" && refresh !== "";
    const isAdmin = user?.type?.toLowerCase() === "admin" && refresh !== "";
    const isValidUrl = state.url.includes("login") || state.url.includes("404");
    const isHome = state.url === "/";
    this.prevRoute = state.url;

    if (protectedRoutes.includes(state.url) && !this.auth.isLogin) {
      return this.router.navigate(["/login"], { queryParams: { redirect: state.url } });
    }

    if (state.url.includes("login") && !this.auth.isLogin) {
      return true;
    }

    if (!isHome && isClient && (isValidUrl || !state.url.includes("order"))) {
      return this.router.navigate(["/order"]);
    }

    if (!isHome && isAdmin && (isValidUrl || !state.url.includes("dashboard"))) {
      return this.router.navigate(["/dashboard"]);
    }

    return true;
  }
}
