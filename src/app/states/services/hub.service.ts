import { Injectable } from "@angular/core";
import { IHub } from "src/app/interfaces/models/hub.interface";
import { ApiService } from "src/app/services";
import { HubStore } from "../store";

@Injectable({ providedIn: "root" })
export class HubService {
  constructor(private hubStore: HubStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IHub>("hubs", true);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.hubStore.set(data);
    this.setErrors(error);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IHub>(`hubs`, body, true);
      const { data = [] } = response;
      this.hubStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IHub>(`hubs/${id}`, body);
      this.hubStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IHub>(`hubs/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.hubStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(error: any) {
    this.hubStore.setError(error);
  }
}
