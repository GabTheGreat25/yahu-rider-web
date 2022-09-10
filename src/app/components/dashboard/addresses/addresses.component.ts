import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-addresses",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.scss"],
})
export class AddressesComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Address", "add");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }
}
