import { IDateStamps } from "./base.interface";

export interface IPermission<T> extends IDateStamps {
  _id: string;
  name: string;
  resources: T[];
  deleted: boolean;
}
