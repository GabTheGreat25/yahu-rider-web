import { HTTP_METHODS, RESOURCES_TYPE, RESOURCES_TYPES } from "../interfaces";

export * from "./validator-msg";
export * from "./data-headers";

export type USER_ADMIN = "Admin";
export type USER_CLIENT = "";
export type USER_TYPE = USER_ADMIN | USER_CLIENT;
export const USER_TYPES: USER_TYPE[] = ["Admin", ""];

export const METHODS: HTTP_METHODS[] = ["POST", "PATCH", "DELETE", "GET", "PUT"];

const RESOURCES_METHODS: { [key in RESOURCES_TYPE]: HTTP_METHODS } = {
  create: "POST",
  add: "POST",
  access: "GET",
  view: "GET",
  "view-single": "GET",
  edit: "PATCH",
  update: "PATCH",
  delete: "DELETE",
  remove: "DELETE",
};

export const RESOURCE_METHOD = (type: RESOURCES_TYPE) =>
  RESOURCES_METHODS[(Object.keys(RESOURCES_METHODS) as RESOURCES_TYPES).filter((_) => _ === type)?.[0]] ?? "";
