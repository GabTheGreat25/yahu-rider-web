import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery } from "src/app/states";
@UntilDestroy()
@Component({
  selector: "app-delivery-list",
  templateUrl: "./delivery-list.component.html",
  styleUrls: ["./delivery-list.component.scss"],
})
export class DeliveryListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("Deliveries", "edit");
  isDelete = this.authUserQuery.hasPermissions("Deliveries", "remove");
  currentPage = 1;
  limit = 10;

  constructor(private router: Router, private route: ActivatedRoute, private authUserQuery: AuthUserQuery) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    this.route.queryParams.subscribe(async (params: any) => {
      this.currentPage = params?.page ?? this.currentPage;

      // Replace with proper API call
      // const data = await this.repository.getAll(this.currentPage, this.limit);
      // this.parseData(data);
    });

    this.headers = this.getHeaderList().filter(({ type }) => type !== "action");
    this.headers = this.getHeaderList();
  }

  parseData(response: { data: any[]; total: number }) {
    const total = Math.ceil(response.total / this.limit);
    this.paginations = new Array(total).fill("").map((e, i) => (i + 1).toString());
    this.rows = response.data;
  }

  getHeaderList(): IDataHeader[] {
    return [
      {
        text: "Code",
        dataField: "code",
        type: "text",
      },
      {
        text: "Status",
        dataField: "status",
        type: "text",
      },
      {
        text: "Date Started",
        dataField: "DateCreated",
        type: "text",
      },
    ];
  }

  onDetail(event: any) {
    this.router.navigate([`${this.router.url}/${event._id}`]);
  }

  onPageChanged(event: any) {
    if (this.currentPage !== event.toString()) {
      this.router.navigate([this.router.url.split("?")[0]], { queryParams: { page: event } });
    }
  }
}
