import { IDateStamps } from "./base.interface";

export interface IParcel<T, U, V> extends IDateStamps {
  _id: string;
  refNum: string;
  pickupAddress: T;
  shippingAddress: T;
  items: {
    code: string;
    description?: string;
  }[];
  tracking: {
    _id: string;
    action: string;
  }[];
  consignee: U;
  tenant: V;
  weight: number;
  completed: boolean;
  status: string;
  deleted: boolean;
}
