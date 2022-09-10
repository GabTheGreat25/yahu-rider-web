import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IResource } from "src/app/interfaces";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("User", "add");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }
}
