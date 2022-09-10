import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { IHub } from "src/app/interfaces/models/hub.interface";
import { AuthUserQuery, HubQuery, HubService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-hub-list",
  templateUrl: "./hub-list.component.html",
  styleUrls: ["./hub-list.component.scss"],
})
export class HubListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: IHub[] = [];
  permission: IResource[] = [];

  constructor(private router: Router, private hubQuery: HubQuery, private hubService: HubService) {}

  ngOnInit(): void {
    if (!this.hubQuery.hasEntity()) this.hubService.get();
    this.hubQuery.hubs$.pipe(untilDestroyed(this)).subscribe((hubs) => (this.rows = hubs));

    this.paginations = this.getPagination();
    this.headers = this.getHeaderList().filter(({ type }) => type !== "action");
    this.headers = this.getHeaderList();
  }

  getPagination() {
    return ["1", "2", "3", "4", "5", "6"];
  }

  getHeaderList(): IDataHeader[] {
    return [
      {
        text: "Image",
        dataField: "image",
        type: "image",
      },
      {
        text: "Name",
        dataField: "name",
        type: "text",
      },
      {
        text: "Latitude",
        dataField: "latitude",
        type: "text",
      },
      {
        text: "Longitude",
        dataField: "longitude",
        type: "text",
      },
    ];
  }

  onEdit(event: any) {
    this.router.navigate([this.router.url + `/edit/${event._id}`]);
  }

  onDelete(event: any) {
    this.hubService.delete(event._id);
  }
}
