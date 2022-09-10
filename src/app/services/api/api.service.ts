import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IAuthorizationHeaders, IApiResponse, HandlerFunction, ASYNC_RESPONSE_DATA, ASYNC_RESPONSE } from "src/app/interfaces";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private API_URL = env.API_URL;
  private TOKEN_NAME = env.TOKEN_NAME;
  private token = "";
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => (error.error ? { ...error.error, statusText: error.statusText } : error));
  }

  get authorization(): IAuthorizationHeaders {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  public post<T>(uri: string, body: any): Observable<T>;
  public post<T>(uri: string, body: any, isPromise: boolean): ASYNC_RESPONSE_DATA<T>;
  public post<T>(uri: string, body: any, isPromise?: boolean): any {
    if (!isPromise) return this.http.post(this.API_URL + uri, body);

    return new Promise((resolve, reject) =>
      this.http
        .post(this.API_URL + uri, body)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: this.responseHandler<T>(resolve),
          error: this.responseHandler<T>(reject),
        })
    );
  }

  public postFile<T extends U, U>(uri: string, body: any, api = this.API_URL): ASYNC_RESPONSE {
    return new Promise((resolve, reject) =>
      this.http
        .post(api + uri, body)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: this.responseHandler<T>(resolve),
          error: this.responseHandler<T>(reject),
        })
    );
  }

  public get<T>(uri: string): Observable<T>;
  public get<T>(uri: string, isPromise: boolean): ASYNC_RESPONSE_DATA<T>;
  public get<T>(uri: string, isPromise?: boolean): any {
    if (!isPromise) return this.http.get(this.API_URL + uri);

    return new Promise((resolve, reject) =>
      this.http
        .get(this.API_URL + uri)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: this.responseHandler<T>(resolve),
          error: this.responseHandler<T>(reject),
        })
    );
  }

  public patch<T>(uri: string, body: any, api = this.API_URL): ASYNC_RESPONSE_DATA<T> {
    return new Promise((resolve, reject) =>
      this.http
        .patch(api + uri, body || {})
        .pipe(catchError(this.handleError))
        .subscribe({
          next: this.responseHandler<T>(resolve),
          error: this.responseHandler<T>(reject),
        })
    );
  }

  public delete<T>(uri: string, api = this.API_URL): ASYNC_RESPONSE_DATA<T> {
    return new Promise((resolve, reject) =>
      this.http
        .delete(api + uri)
        .pipe(catchError(this.handleError))
        .subscribe({
          next: this.responseHandler<T>(resolve),
          error: this.responseHandler<T>(reject),
        })
    );
  }

  private responseHandler<T>(callback: (...args: any) => void): HandlerFunction<T> {
    return (res: IApiResponse<T>) => callback(res);
  }

  public async authValidate(): Promise<boolean> {
    const token = localStorage.getItem(this.TOKEN_NAME);
    if (token && !this.isLoggedIn) {
      await this.refreshToken(token);
    } else {
      this.refreshToken(token as string);
    }
    return this.isLoggedIn;
  }

  private async refreshToken(token: string): Promise<void> {
    try {
      const { meta } = await this.post("token/validate", { token }, true);
      this.setToken(meta?.token);
      this.isLoggedIn = true;
    } catch (err) {
      const error = err as { message: string; statusText: string };
      if (error.message === "jwt expired" || error.statusText.toLowerCase() === "unauthorized") {
        this.logout();
      }

      this.isLoggedIn = false;
    }
  }

  public setToken(token?: string): void {
    if (token) {
      localStorage.setItem(this.TOKEN_NAME, token);
    } else {
      localStorage.removeItem(this.TOKEN_NAME);
    }
  }

  public logout(url: string = ""): Promise<boolean> {
    this.isLoggedIn = false;
    localStorage.removeItem(this.TOKEN_NAME);
    return this.router.navigate([url]);
  }
}
