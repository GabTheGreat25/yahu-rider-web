import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
})
export class ItemsComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Item", "add");

  constructor(private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }
}
