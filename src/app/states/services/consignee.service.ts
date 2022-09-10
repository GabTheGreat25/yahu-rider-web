import { Injectable } from "@angular/core";
import { IConsignee } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { ConsigneeStore } from "..";

@Injectable({ providedIn: "root" })
export class ConsigneeService {
  constructor(private consigneeStore: ConsigneeStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IConsignee>("accounts/consignee", true);
    const { status = "", data = [], message = "" } = await promise;
    if (status === "success" && data) this.consigneeStore.set(data);
    else this.setErrors(message);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IConsignee>(`accounts/consignee`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.consigneeStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const response = await this.api.patch<IConsignee>(`accounts/consignee/${id}`, body);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.consigneeStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    let errors = null;
    try {
      const promise = this.api.delete<IConsignee>(`accounts/${id}`);
      const { status = "", data = [], message = "" } = await promise;
      if (status === "success" && data) this.consigneeStore.update(data[0]._id, { deleted: data[0].deleted });
      else errors = this.setErrors({ text: message });
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  setErrors(error: any) {
    this.consigneeStore.setError(error);
  }
}
