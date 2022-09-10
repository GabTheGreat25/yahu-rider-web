import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery, AddressQuery, AddressService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-addresses-list",
  templateUrl: "./addresses-list.component.html",
  styleUrls: ["./addresses-list.component.scss"],
})
export class AddressesListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("Address", "edit");
  isDelete = this.authUserQuery.hasPermissions("Address", "remove");

  constructor(
    private addressQuery: AddressQuery,
    private addressService: AddressService,
    private router: Router,
    private authUserQuery: AuthUserQuery
  ) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    if (!this.addressQuery.hasEntity()) this.addressService.get();
    this.addressQuery.addresses$.pipe(untilDestroyed(this)).subscribe((addresses) => (this.rows = addresses));

    this.paginations = this.getPagination();
    this.headers = this.getHeaderList().filter(({ type }) => type !== "action");
    this.headers = this.getHeaderList();
  }

  getPagination() {
    return ["1", "2", "3", "4", "5", "6"];
  }

  // TODO: IDataHeader for number not working
  getHeaderList(): IDataHeader[] {
    return [
      {
        text: "house",
        dataField: "house",
        type: "text",
      },
      {
        text: "building",
        dataField: "building",
        type: "text",
      },
      {
        text: "number",
        dataField: "number",
        type: "text",
      },
      {
        text: "street",
        dataField: "street",
        type: "text",
      },
      {
        text: "city",
        dataField: "city",
        type: "text",
      },
      {
        text: "barangay",
        dataField: "barangay",
        type: "text",
      },
      {
        text: "municipality",
        dataField: "municipality",
        type: "text",
      },
      {
        text: "province",
        dataField: "province",
        type: "text",
      },
      {
        text: "postalCode",
        dataField: "postalCode",
        type: "text",
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
    this.addressService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
