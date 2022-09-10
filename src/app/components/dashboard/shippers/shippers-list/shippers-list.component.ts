import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery, ShipperQuery, ShipperService } from "src/app/states";
import { SHIPPER } from "src/app/constants";
import { HelperService } from "src/app/services";
@UntilDestroy()
@Component({
  selector: "app-shippers-list",
  templateUrl: "./shippers-list.component.html",
  styleUrls: ["./shippers-list.component.scss"],
})
export class ShippersListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("Shipper", "edit");
  isDelete = this.authUserQuery.hasPermissions("Shipper", "remove");
  excludeFields = ["company"];
  constructor(
    private shipperQuery: ShipperQuery,
    private shipperService: ShipperService,
    private router: Router,
    private authUserQuery: AuthUserQuery,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    if (!this.shipperQuery.hasEntity()) this.shipperService.get();
    this.shipperQuery.shippers$.pipe(untilDestroyed(this)).subscribe((shippers) => (this.rows = shippers));

    this.paginations = this.getPagination();
    this.headers = this.helper.getHeaderList(<IDataHeader[]>SHIPPER, ["action"]);
    this.headers = this.helper.getHeaderList(<IDataHeader[]>SHIPPER, this.excludeFields);
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
    this.shipperService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
