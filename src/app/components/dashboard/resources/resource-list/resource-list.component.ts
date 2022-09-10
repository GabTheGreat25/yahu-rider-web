import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { HelperService } from "src/app/services";
import { ResourceQuery, ResourceService } from "src/app/states";
import { RESOURCE } from "src/app/constants";

@UntilDestroy()
@Component({
  selector: "app-resource-list",
  templateUrl: "./resource-list.component.html",
  styleUrls: ["./resource-list.component.scss"],
})
export class ResourceListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  excludeFields = ["company"];

  constructor(
    private resourceQuery: ResourceQuery,
    private resourceService: ResourceService,
    private router: Router,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    if (!this.resourceQuery.hasEntity()) this.resourceService.get();
    this.resourceQuery.resources$.pipe(untilDestroyed(this)).subscribe((resources) => (this.rows = resources));

    this.paginations = this.getPagination();
    this.headers = this.helper.getHeaderList(<IDataHeader[]>RESOURCE, ["action"]);
    this.headers = this.helper.getHeaderList(<IDataHeader[]>RESOURCE, this.excludeFields);
  }

  getPagination() {
    return ["1", "2", "3", "4", "5", "6"];
  }

  onEdit(event: any) {
    this.router.navigate([this.router.url + `/edit/${event._id}`]);
  }

  onDetail(event: any) {
    this.router.navigate([`${this.router.url}/${event._id}`]);
  }

  onDelete(event: any) {
    // this.shipperService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
