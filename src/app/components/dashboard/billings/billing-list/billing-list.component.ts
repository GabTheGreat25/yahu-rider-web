import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IPermission, IResource, IUser } from "src/app/interfaces";
import { IBilling } from "src/app/interfaces/models/billing.interface";
import { AuthUserQuery, BillingQuery, BillingService } from "src/app/states";
@UntilDestroy()
@Component({
  selector: "app-billing-list",
  templateUrl: "./billing-list.component.html",
  styleUrls: ["./billing-list.component.scss"],
})
export class BillingListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: IBilling<any, any>[] = [];
  permission: IResource[] = [];

  constructor(
    private router: Router,
    private billingQuery: BillingQuery,
    private billingService: BillingService,
  ) {}

  ngOnInit(): void {
    this.billingService.get();
    this.billingQuery.billings$.pipe(untilDestroyed(this)).subscribe((billings) => {
      this.rows = billings;
    });

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
        text: "Date",
        dataField: "date",
        childFields: [],
        type: "text",
      },
      {
        text: "Shipper",
        dataField: "shipper",
        childFields: [],
        type: "text",
      },
      {
        text: "Consignee",
        dataField: "consignee",
        childFields: [],
        type: "text",
      },
      {
        text: "Content",
        dataField: "content",
        childFields: [],
        type: "button",
        button: {
          class: "",
          name: "See items",
        },
      },
      {
        text: "Location",
        dataField: "location",
        childFields: ["origin", "destination"],
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

  onDelete(event: any) {}

  onButtonClick(event: any) {}

  onPageClick(event: any) {}
}
