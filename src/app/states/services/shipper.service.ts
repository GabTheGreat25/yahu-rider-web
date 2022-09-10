import { Injectable } from "@angular/core";
import { IShipper } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { ShipperStore } from "..";

@Injectable({ providedIn: "root" })
export class ShipperService {
  constructor(private shipperStore: ShipperStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IShipper>("accounts/shipper", true);
    const { status = "", data = [], message = "" } = await promise;
    if (status === "success" && data) this.shipperStore.set(data);
    else this.setErrors(message);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IShipper>(`accounts/shipper`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.shipperStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [], status = "", message = "" } = await this.api.patch<IShipper>(`accounts/shipper/${id}`, body);
      if (status === "success" && data) this.shipperStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IShipper>(`accounts/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.shipperStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(error: any) {
    this.shipperStore.setError(error);
  }
}
