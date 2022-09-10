import { Injectable } from "@angular/core";
import { IResource } from "src/app/interfaces/models/resource.interface";
import { ApiService } from "src/app/services";
import { ResourceStore } from "../store";

@Injectable({ providedIn: "root" })
export class ResourceService {
  constructor(private resourceStore: ResourceStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IResource>("resources", true);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.resourceStore.set(data);
    this.setErrors(error);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IResource>(`resources`, body, true);
      const { data = [] } = response;
      this.resourceStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IResource>(`resources/${id}`, body);
      this.resourceStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IResource>(`resources/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.resourceStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(error: any) {
    this.resourceStore.setError(error);
  }
}
