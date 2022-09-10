import { IDateStamps } from "./base.interface";

export interface IItem extends IDateStamps {
  _id: string;
  trackingNo: string;
  code: string;
  description: string;
  value: number;
  weight: number;
  deleted: boolean;
}
