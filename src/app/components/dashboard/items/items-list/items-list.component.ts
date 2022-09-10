import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery, ItemQuery, ItemService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"],
})
export class ItemsListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("Parcel", "edit");
  isDelete = this.authUserQuery.hasPermissions("Parcel", "remove");

  constructor(
    private itemQuery: ItemQuery,
    private itemService: ItemService,
    private router: Router,
    private authUserQuery: AuthUserQuery
  ) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    if (!this.itemQuery.hasEntity()) this.itemService.get();
    this.itemQuery.items$.pipe(untilDestroyed(this)).subscribe((items) => (this.rows = items));

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
        text: "Tracking No",
        dataField: "trackingNo",
        type: "text",
      },
      {
        text: "Code",
        dataField: "code",
        type: "text",
      },
      {
        text: "Description",
        dataField: "description",
        type: "text",
      },
      {
        text: "Value",
        dataField: "value",
        type: "text",
      },
      {
        text: "Weight",
        dataField: "weight",
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
    this.itemService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
