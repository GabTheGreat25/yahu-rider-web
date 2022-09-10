import { Injectable } from "@angular/core";
import { IRider } from "@app/interfaces";
import { Store, StoreConfig } from "@datorama/akita";

export interface RidersState {
  riders: IRider<any>[];
}

export function createInitialState(): RidersState {
  return {
    riders: [],
  };
}

@StoreConfig({ name: "riders" })
@Injectable({ providedIn: "root" })
export class RidersStore extends Store<RidersState> {
  constructor() {
    super(createInitialState());
  }
}
