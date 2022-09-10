import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery, ParcelService } from "src/app/states";

@Component({
  selector: "app-deliveries",
  templateUrl: "./deliveries.component.html",
  styleUrls: ["./deliveries.component.scss"],
})
export class DeliveriesComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Deliveries", "add");

  constructor(private parcelService: ParcelService, private authUserQuery: AuthUserQuery, private router: Router) {}

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
    this.parcelService.get();
  }
}
