import { createAction, props } from "@datorama/akita-ng-effects";

export const authLoginUser = createAction("[Login Page] Login User Submit", props<{ credential: string; password: string }>());

export const authValidate = createAction("[Auth Interceptor] Validate Refresh Token");

export const authSetAccessToken = createAction("[Auth Interceptor] Set Access Token", props<{ token: string }>());

export const authLogout = createAction("[Dashboard Page] Logout User Clicked");
