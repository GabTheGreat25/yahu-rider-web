import { IDateStamps } from "./base.interface";

export interface IVehicle extends IDateStamps {
  _id: string;
  type: string;
  vehicleModel: string;
  plateNumber: string;
  color: string;
  deleted: false;
}
