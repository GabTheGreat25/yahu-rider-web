import { Injectable } from "@angular/core";
import { IItem } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { ItemStore } from "../store";

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private itemStore: ItemStore, private api: ApiService) {}

  async get() {
    const promise = this.api.get<IItem>("items", true);
    const { status = "", data = [], message = "" } = await promise;
    if (status === "success" && data) this.itemStore.set(data);
    else this.setErrors(message);
  }

  async create(body: any) {
    let errors = null;
    try {
      const response = await this.api.post<IItem>(`items`, body, true);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.itemStore.add(data);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      const response = await this.api.patch<IItem>(`items/${id}`, body);
      const { data = [], status = "", message = "" } = response;
      if (status === "success" && data) this.itemStore.update(data[0]._id, data[0]);
      else errors = { text: message };
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    let errors = null;
    try {
      const promise = this.api.delete<IItem>(`items/${id}`);
      const { status = "", data = [], message = "" } = await promise;
      if (status === "success" && data) this.itemStore.update(data[0]._id, { deleted: data[0].deleted });
      else errors = this.setErrors({ text: message });
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  setErrors(error: any) {
    this.itemStore.setError(error);
  }
}
