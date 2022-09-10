import { Injectable } from "@angular/core";
import { IPermission } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { PermissionStore } from "../store";

@Injectable({ providedIn: "root" })
export class PermissionService {
  constructor(private permissionStore: PermissionStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IPermission<any>>("permissions?populate=resources", true);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.permissionStore.set(data);
    this.setErrors(error);
  }

  async create(body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.post<IPermission<any>>(`permissions`, body, true);
      this.permissionStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IPermission<any>>(`permissions/${id}`, body);
      this.permissionStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IPermission<any>>(`permissions/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.permissionStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(err: any) {
    this.permissionStore.setError(err);
  }
}
