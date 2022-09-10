import { USER_TYPE } from "@app/constants";
import { IDateStamps, IEntity } from "./base.interface";

export interface IUser<T> extends IDateStamps, IEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type?: USER_TYPE;
  phoneNumber: string;
  roles: T[];
  avatar: string;
}
