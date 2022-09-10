import { IDateStamps } from "./base.interface";

export interface IDeliveryDestination<T> {
  coordinates: number[];
  title: string;
  type: string;
  parcels: T[];
}

export interface IDelivery<T, K, L> extends IDateStamps {
  _id: string;
  status: string;
  start: {
    type: string;
    address: K;
    coordinates: number[];
  };
  parcels: L[];
  end: {
    address: K;
    coordinates: number[];
  };
  destinations: IDeliveryDestination<L>[];
  rider?: T;
  deleted?: boolean;
}
