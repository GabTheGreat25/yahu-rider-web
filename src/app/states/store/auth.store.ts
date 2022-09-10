import { Injectable } from "@angular/core";
import { persistState, Store, StoreConfig } from "@datorama/akita";
import { environment as env } from "src/environments/environment";

export interface AuthState {
  token: string;
}

export function createInitialState(): AuthState {
  return {
    token: "",
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "auth" })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}

export const tokenPersistStorage = persistState({
  key: env.TOKEN_NAME,
});
