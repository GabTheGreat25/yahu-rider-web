import { Injectable } from "@angular/core";
import { IDataHeader } from "src/app/interfaces";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  getHeaderList(dataHeader: IDataHeader[], excludeFields?: string[]): IDataHeader[] {
    if (!excludeFields) return dataHeader;
    return dataHeader.filter((s) => !excludeFields.includes(s.dataField));
  }
}
