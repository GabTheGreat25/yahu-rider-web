import { IDateStamps } from "./base.interface";

export interface IBilling<T, K> extends IDateStamps {
  _id: string;
  date: Date;
  shipper: T;
  consignee: K;
  content: {
    document: boolean;
    items: {
      description: string;
      value: number;
    }[];
  };
  location: {
    origin: string;
    destination: string;
  };
  package: {
    type: string;
    weight: number;
    quantity: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  service: "Express" | "Deferred" | "3 Days" | "5 Days";
  commodity: "Regular" | "Perishable";
  instruction: "HAL" | "ODA" | "OPA" | "Saturday" | "Sunday" | "Holiday" | "Shipment with Collection";
  clientRef: string;
  acceptance: {
    type: "Business Hub" | "Pick Up";
    accNum: string;
  };
  payment: {
    type: "Bill Shipper" | "Bill Consignee" | "Bill 3rd Party";
    accNum: string;
  };
  signature: {
    sender: string;
    recipient: string;
  };
  deleted: boolean;
}
