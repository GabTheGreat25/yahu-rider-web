export * from "./models/user.interface";
export * from "./models/base.interface";
export * from "./models/hub.interface";
export * from "./models/role.interface";
export * from "./models/permission.interface";
export * from "./models/resource.interface";
export * from "./models/parcel.interface";
export * from "./models/billing.interface";
export * from "./models/account.interface";
export * from "./models/item.interface";
export * from "./models/address.interface";
export * from "./models/delivery.interface";
export * from "./models/rider.interface";
export * from "./models/vehicle.interface";
export * from "./custom-forms/address-form.interface";
export * from "./custom-forms/person-form.interface";

export type HandlerFunction<T> = (value: any) => void;
export type HTTP_METHODS = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export type RESOURCES_TYPE = "create" | "add" | "access" | "view" | "view-single" | "edit" | "update" | "delete" | "remove";
export type RESOURCES_TYPES = RESOURCES_TYPE[];
export type TABS =
  | "Resource"
  | "Rider"
  | "User"
  | "Parcel"
  | "Shipper"
  | "Item"
  | "Hub"
  | "Deliveries"
  | "Consignee"
  | "Billing"
  | "Address";
export interface IAuthorizationHeaders {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
}

export type ApiResponseStatus = "success" | "error";
export type ApiResponseError = boolean;
export type ApiResponseMessage = string;
export type ResponseMetaVersion = number;
export type ResponseMetaPage = number;
export type ResponseMetaTotal = number;
export type ResponseMetaToken = string;
export type ResponseMetaRefresh = string;
export type ApiResponseMeta = {
  version?: ResponseMetaVersion;
  page?: ResponseMetaPage;
  total?: ResponseMetaTotal;
  token?: ResponseMetaToken;
  refresh?: ResponseMetaRefresh;
};

export interface IApiResponse<T> {
  status: ApiResponseStatus;
  error: ApiResponseError;
  message: ApiResponseMessage;
  data: T[];
  meta: ApiResponseMeta;
}

export type HeaderType =
  | "name"
  | "text"
  | "button"
  | "image"
  | "url"
  | "action"
  | "dropdown"
  | "toggle"
  | "slider"
  | "calendar"
  | "address"
  | "date"
  | "birthday";

export type HeaderAction = "edit" | "delete" | "view";

export interface IDataHeader {
  text: string;
  dataField: string;
  type: HeaderType;
  button?: {
    class: string;
    name: string;
  };
  image?: {
    class: string;
    alt: string;
  };
  url?: {
    link: string;
    text: string;
  };
  actions?: {
    class: string;
    name: HeaderAction;
  }[];
  childFields?: string[];
}

export type ASYNC_RESPONSE = Promise<IApiResponse<any>>;
export type ASYNC_RESPONSE_DATA<T> = Promise<IApiResponse<T>>;

export interface IRow<T> {
  data: T[];
  total: number;
}

export interface NavTab {
  route: string;
  name: string;
}
