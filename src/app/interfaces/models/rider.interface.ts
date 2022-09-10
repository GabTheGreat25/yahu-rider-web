import { IDateStamps } from "./base.interface";

export interface IRider<T> extends IDateStamps {
  _id: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  birthday: string;
  lastLogin: string;
  license: {
    front: string;
    back: string;
    number: string;
    class: string;
    issuedDate: string;
  };
  or: {
    image: string;
    number: string;
    issuedDate: string;
  };
  cr: {
    image: string;
    number: string;
    issuedDate: string;
  };
  vehicle: T;
  status: string;
  deleted: boolean;
}
