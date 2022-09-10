import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IDataHeader, IResource, IUser } from "src/app/interfaces";
import { AuthUserQuery, UserQuery, UserService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: IUser<any>[] = [];
  permission: IResource[] = [];
  isEdit = this.authUserQuery.hasPermissions("User", "edit");
  isDelete = this.authUserQuery.hasPermissions("User", "remove");

  constructor(
    private userService: UserService,
    private userQuery: UserQuery,
    private router: Router,
    private authUserQuery: AuthUserQuery
  ) {}

  ngOnInit(): void {
    this.isEdit && this.isDelete ? null : this.router.navigate(["/dashboard"]);

    if (!this.userQuery.hasEntity()) this.userService.get();
    this.userQuery.users$.pipe(untilDestroyed(this)).subscribe((users) => {
      this.rows = users.map((e) => {
        const roles = e.roles.map((r) => r.name);
        return { ...e, roles };
      });
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
        text: "Avatar",
        dataField: "avatar",
        type: "image",
        image: {
          class: "avatar",
          alt: "avatar",
        },
      },
      {
        text: "Name",
        dataField: "name",
        type: "name",
      },
      {
        text: "Email Address",
        dataField: "email",
        type: "text",
      },
      {
        text: "Phone Number",
        dataField: "phoneNumber",
        type: "text",
      },
      {
        text: "Roles",
        dataField: "roles",
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

  onDelete(event: any) {
    this.userService.delete(event._id);
  }

  onPageClick(event: any) {
    // TODO: Get current list using the event as page number
  }
}
