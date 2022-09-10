import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IResource } from "src/app/interfaces";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-parcel-edit",
  templateUrl: "./parcel-edit.component.html",
  styleUrls: ["./parcel-edit.component.scss"],
})
export class ParcelEditComponent implements OnInit {
  canEdit = this.authUserQuery.hasPermissions("Parcel", "edit");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);
  }
}
