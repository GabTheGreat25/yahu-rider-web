import { Injectable } from "@angular/core";
import { IDelivery } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { DeliveryStore } from "../store";

@Injectable({ providedIn: "root" })
export class DeliveryService {
  constructor(private deliveryStore: DeliveryStore, private api: ApiService) {}

  async get(query: string = "") {
    const {
      status = "",
      data = [],
      message = "",
      meta: { total = 0 },
    } = await this.api.get<IDelivery<any, any, any>>("deliveries" + query, true);
    if (status === "success" && data) this.deliveryStore.set(data);
    else this.setErrors(message);
    return { data, total };
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IDelivery<any, any, any>>(`deliveries`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.deliveryStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const response = await this.api.patch<IDelivery<any, any, any>>(`deliveries/${id}`, body);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.deliveryStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    let errors = null;
    try {
      const promise = this.api.delete<IDelivery<any, any, any>>(`deliveries/${id}`);
      const { status = "", data = [], message = "" } = await promise;
      if (status === "success" && data) this.deliveryStore.update(data[0]._id, { deleted: data[0].deleted });
      else errors = this.setErrors({ text: message });
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  setErrors(error: any) {
    this.deliveryStore.setError(error);
  }
}
