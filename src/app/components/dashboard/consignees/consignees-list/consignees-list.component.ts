import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery, ConsigneeQuery, ConsigneeService } from "src/app/states";
@UntilDestroy()
@Component({
  selector: "app-consignees-list",
  templateUrl: "./consignees-list.component.html",
  styleUrls: ["./consignees-list.component.scss"],
})
export class ConsigneesListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("Deliveries", "edit");
  isDelete = this.authUserQuery.hasPermissions("Deliveries", "remove");

  constructor(
    private consigneeQuery: ConsigneeQuery,
    private consigneeService: ConsigneeService,
    private router: Router,
    private authUserQuery: AuthUserQuery
  ) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    if (!this.consigneeQuery.hasEntity()) this.consigneeService.get();
    this.consigneeQuery.consignees$.pipe(untilDestroyed(this)).subscribe((consignees) => (this.rows = consignees));

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
        text: "Account Number",
        dataField: "accNum",
        type: "text",
      },
      {
        text: "Name",
        dataField: "name",
        type: "name",
      },
      {
        text: "Delivery",
        dataField: "delivery",
        type: "text",
      },
      {
        text: "Email",
        dataField: "email",
        type: "text",
      },
      {
        text: "Mobile Number",
        dataField: "mobileNumber",
        type: "text",
      },
      {
        text: "Address",
        dataField: "address",
        type: "address",
      },
      {
        text: "Actions",
        dataField: "action",
        type: "action",
        actions: [
          { class: "las la-pen", name: "edit" },
          { class: "las la-trash", name: "delete" },
        ],
      },
    ];
  }

  onEdit(event: any) {
    this.router.navigate([this.router.url + `/edit/${event._id}`]);
  }

  onDetail(event: any) {
    this.router.navigate([`${this.router.url}/${event._id}`]);
  }

  onDelete(event: any) {
    this.consigneeService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
