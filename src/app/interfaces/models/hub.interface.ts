import { IDateStamps } from "./base.interface";

export interface IHub extends IDateStamps {
  _id: string;
  name: string;
  longitude: number;
  latitude: number;
  image?: string;
  deleted: boolean;
}
