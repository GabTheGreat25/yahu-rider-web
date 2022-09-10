import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-consignees",
  templateUrl: "./consignees.component.html",
  styleUrls: ["./consignees.component.scss"],
})
export class ConsigneesComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Consignee", "add");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }
}
