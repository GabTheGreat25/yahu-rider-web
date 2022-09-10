import { Injectable } from "@angular/core";
import { IAddress } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { AddressStore } from "../store";

@Injectable({ providedIn: "root" })
export class AddressService {
  constructor(private addressStore: AddressStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IAddress<any>>("addresses", true);
    const { status = "", data = [], message = "" } = await promise;
    if (status === "success" && data) this.addressStore.set(data);
    else this.setErrors(message);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IAddress<any>>(`addresses`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.addressStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const response = await this.api.patch<IAddress<any>>(`addresses/${id}`, body);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.addressStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    let errors = null;
    try {
      const promise = this.api.delete<IAddress<any>>(`addresses/${id}`);
      const { status = "", data = [], message = "" } = await promise;
      if (status === "success" && data) this.addressStore.update(data[0]._id, { deleted: data[0].deleted });
      else errors = this.setErrors({ text: message });
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  setErrors(error: any) {
    this.addressStore.setError(error);
  }
}
