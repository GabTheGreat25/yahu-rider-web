import { Injectable } from "@angular/core";
import { IAccount } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { AccountStore } from "..";

@Injectable({ providedIn: "root" })
export class AccountService {
  constructor(private accountStore: AccountStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IAccount>("accounts", true);
    const { status = "", data = [], message = "" } = await promise;
    if (status === "success" && data) this.accountStore.set(data);
    else this.setErrors(message);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IAccount>(`accounts`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.accountStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const response = await this.api.patch<IAccount>(`accounts/${id}`, body);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.accountStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    let errors = null;
    try {
      const promise = this.api.delete<IAccount>(`accounts/${id}`);
      const { status = "", data = [], message = "" } = await promise;
      if (status === "success" && data) this.accountStore.update(data[0]._id, { deleted: data[0].deleted });
      else errors = this.setErrors({ text: message });
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  setErrors(error: any) {
    this.accountStore.setError(error);
  }
}
