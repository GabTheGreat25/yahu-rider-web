import { Injectable } from "@angular/core";
import { IParcel } from "src/app/interfaces";
import { ApiService } from "src/app/services";
import { ParcelStore } from "../store";
import { environment as env } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class ParcelService {
  constructor(private parcelStore: ParcelStore, private api: ApiService) {}

  async get() {
    this.api
      .get<IParcel<any, any, any>>("parcels", true)
      .then(({ status = "", data = [], error = false, message = "" }) => {
        if (status === "success" && data && !error) return this.parcelStore.set(data);

        throw new Error(message);
      })
      .catch((err) => {
        this.setErrors(err);
      });
  }

  async create(body: any) {
    let errors = null;
    try {
      // const { data = [], message = "", error = false } = await this.api.post<IParcel<any, any, any>>("parcels", body, env.RIDER_URL);
      // if (error) {
      //   errors = error;
      //   return;
      // }
      // this.parcelStore.add(data);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async update(id: string, body: any) {
    let errors = null;
    try {
      // const { data = [] } = await this.api.patch<IParcel<any, any, any>>(`parcels/${id}`, body, env.RIDER_URL);
      // this.parcelStore.update(data[0]._id, data[0]);
    } catch (err) {
      errors = err;
    }
    this.setErrors(errors);
  }

  async delete(id: string) {
    // const promise = this.api.delete<IParcel<any, any, any>>(`parcels/${id}`, env.RIDER_URL);
    // const { status = "", data = [], error = null } = await promise;
    // if (status === "success" && data) this.parcelStore.update(data[0]._id, { deleted: data[0].deleted });
    // this.setErrors(error);
  }

  setErrors(err: any) {
    this.parcelStore.setError(err);
  }
}
