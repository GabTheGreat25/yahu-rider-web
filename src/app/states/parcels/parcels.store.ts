import { Injectable } from "@angular/core";
import { IParcel } from "@app/interfaces";
import { Store, StoreConfig } from "@datorama/akita";

export interface ParcelsState {
  parcels: IParcel<any, any, any>[];
  total: number;
}

export function createInitialState(): ParcelsState {
  return {
    parcels: [],
    total: 0,
  };
}

@StoreConfig({ name: "parcels" })
@Injectable({ providedIn: "root" })
export class ParcelsStore extends Store<ParcelsState> {
  constructor() {
    super(createInitialState());
  }
}
