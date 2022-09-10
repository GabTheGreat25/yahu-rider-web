import { Injectable } from "@angular/core";
import { IRider } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { RiderStore } from "../store";

@Injectable({ providedIn: "root" })
export class RiderService {
  constructor(private riderStore: RiderStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IRider<any>>("users/rider?populate", true);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.riderStore.set(data);
    this.setErrors(error);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IRider<any>>(`users/rider`, body, true);
      const { data = [] } = response;
      this.riderStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IRider<any>>(`users/rider/${id}`, body);
      this.riderStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IRider<any>>(`users/rider/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.riderStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(error: any) {
    this.riderStore.setError(error);
  }
}
