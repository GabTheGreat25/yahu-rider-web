import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-shippers",
  templateUrl: "./shippers.component.html",
  styleUrls: ["./shippers.component.scss"],
})
export class ShippersComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Shipper", "add");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }
}
