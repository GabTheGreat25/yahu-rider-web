import { IDateStamps } from "./base.interface";

export interface IAddress<T> extends IDateStamps {
  _id: string;
  account: T;
  company?: string;
  house?: string;
  building?: string;
  number?: string;
  street?: string;
  city?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  postalCode: number;
  deleted: boolean;
}
