import { Injectable } from "@angular/core";
import { IUser } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { UserStore } from "../store";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private userStore: UserStore, private api: ApiService) {}

  async get() {
    this.api
      .get<IUser<any>>("users?populate=roles", true)
      .then(({ status = "", data = [], error = false, message = "" }) => {
        if (status === "success" && data && !error) return this.userStore.set(data);

        throw new Error(message);
      })
      .catch((err) => {
        this.setErrors(err);
      });
  }

  async create(body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.post<IUser<any>>(`users`, body, true);
      this.userStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const { data = [] } = await this.api.patch<IUser<any>>(`users/${id}`, body);
      this.userStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    const promise = this.api.delete<IUser<any>>(`users/${id}`);
    const { status = "", data = [], error = null } = await promise;
    if (status === "success" && data) this.userStore.update(data[0]._id, { deleted: data[0].deleted });
    this.setErrors(error);
  }

  setErrors(err: any) {
    this.userStore.setError(err);
  }
}
