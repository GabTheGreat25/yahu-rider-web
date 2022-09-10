import { IDateStamps } from "./base.interface";

export interface IAccount extends IDateStamps {
  _id: string;
  accNum: string;
  title: string;
  firstName: string;
  surname: string;
  company: string;
  phoneNumber?: string;
  mobileNumber: string;
  email: string;
  type: string;
  deleted: boolean;
}

export interface IConsignee extends IAccount {
  delivery: "Residential" | "Commercial";
}
export interface IShipper extends IAccount {
  pickup: "Residential" | "Commercial";
}
