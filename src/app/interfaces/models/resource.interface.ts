import { HTTP_METHODS } from "..";
import { IDateStamps } from "./base.interface";

export interface IResource extends IDateStamps {
  _id: string;
  name: string;
  path: string;
  method: HTTP_METHODS;
  deleted: boolean;
}
