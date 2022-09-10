import { Injectable } from "@angular/core";
import { RoleStore } from "../store";
import { IApiResponse, IRole } from "src/app/interfaces";
import { ApiService } from "src/app/services";

@Injectable({ providedIn: "root" })
export class RoleService {
  constructor(private roleStore: RoleStore, private api: ApiService) {}

  async get(): Promise<IRole<any>[]> {
    const promise = this.api.get<IRole<any>>("roles?populate=permissions-populate=resources", true);
    const { status = "", data = [], error = null } = await promise;

    if (status === "success" && data) {
      this.roleStore.set(data);
      return data;
    }

    this.setErrors(error);
    return [];
  }

  async getOne(id: string): Promise<IRole<any>[]> {
    const promise = this.api.get<IRole<any>>(`roles/${id}?populate=permissions-populate=resources`, true);
    const { status = "", data = [], error = null } = await promise;

    if (status === "success" && data) {
      return data;
    }

    this.setErrors(error);
    return data;
  }

  async create(body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.post<IRole<any>>(`users`, body, true);
      this.roleStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IRole<any>>(`roles/${id}`, body);
      this.roleStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IRole<any>>(`roles/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.roleStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(err: any) {
    this.roleStore.setError(err);
  }
}
