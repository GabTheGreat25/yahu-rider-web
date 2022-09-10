import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { initialize, RidersQuery } from "@app/states/riders";
import { Actions } from "@datorama/akita-ng-effects";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource } from "src/app/interfaces";

@UntilDestroy()
@Component({
  selector: "app-rider-list",
  templateUrl: "./rider-list.component.html",
  styleUrls: ["./rider-list.component.scss"],
})
export class RiderListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission: IResource[] = [];
  statusList: string[] = ["Pending", "Approved", "Active", "Inactive", "Reject", "All"];
  riders = this.query.selectRider$.pipe(untilDestroyed(this));

  constructor(private query: RidersQuery, private router: Router, private actions: Actions) {}

  ngOnInit(): void {
    this.actions.dispatch(initialize());

    this.riders.subscribe((riders: any[]) => {
      this.rows = riders;
    });

    this.paginations = this.getPagination();
    this.headers = this.getHeaderList().filter(({ type }) => type !== "action");
    this.headers = this.getHeaderList();
  }

  getPagination() {
    return ["1", "2", "3", "4", "5", "6"];
  }

  optionChange(value: string) {
    this.riders.subscribe((riders: any[]) => {
      this.rows = riders.filter((rider: any) => rider.status === value);
    });
  }

  // TODO: IDataHeader for number not working
  getHeaderList(): IDataHeader[] {
    return [
      {
        text: "Avatar",
        dataField: "avatar",
        type: "image",
      },
      {
        text: "Name",
        dataField: "firstName",
        type: "name",
      },
      {
        text: "Email",
        dataField: "email",
        type: "text",
      },
      {
        text: "Birth Date",
        dataField: "birthday",
        type: "birthday",
      },
      {
        text: "Phone Number",
        dataField: "phoneNumber",
        type: "text",
      },
      {
        text: "Status",
        dataField: "status",
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

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
