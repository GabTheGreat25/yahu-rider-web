import { Injectable } from "@angular/core";
import { IBilling } from "src/app/interfaces/models/billing.interface";
import { ApiService } from "src/app/services";
import { BillingStore } from "../store";

@Injectable({ providedIn: "root" })
export class BillingService {
  constructor(private billingStore: BillingStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IBilling<any, any>>("billings?populate=consignee,shipper", true);
    const { status = "", data = [], error = null } = await promise;

    if (status === "success" && data) this.billingStore.set(data);
    this.setErrors(error);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IBilling<any, any>>(`billings`, body, true);
      const { data = [] } = response;
      this.billingStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IBilling<any, any>>(`billings/${id}`, body);
      this.billingStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IBilling<any, any>>(`billings/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.billingStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(error: any) {
    this.billingStore.setError(error);
  }
}
