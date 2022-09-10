import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "@app/states/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh: string = "";
  token: string = "";

  constructor(private auth: AuthService) {
    const { refresh, token } = this.auth.value;
    this.refresh = refresh;
    this.token = token;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        "X-Grant-Type": "refresh_token",
        "X-Refresh-Token": this.refresh,
      },
    });
    return next.handle(request).pipe(
      tap({
        next: async (res) => {
          if (res instanceof HttpResponse) {
            if (res.body.status.toLowerCase() === "success") {
              this.auth.setAccessToken(res.body?.meta?.token);
            }
            if (res.body.status.toLowerCase() === "unauthorized" || res.body.message === "jwt expired") {
              this.auth.setAccessToken("");
            }
          }
        },
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
