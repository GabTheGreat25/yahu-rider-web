import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SHIPPER } from "src/app/constants";
import { IDataHeader, IShipper } from "src/app/interfaces";
import { HelperService } from "src/app/services";
import { ShipperQuery } from "src/app/states";

@Component({
  selector: "app-shippers-detail",
  templateUrl: "./shippers-detail.component.html",
  styleUrls: ["./shippers-detail.component.scss"],
})
export class ShippersDetailComponent implements OnInit {
  shipper!: IShipper;
  constructor(private shipperQuery: ShipperQuery, private route: ActivatedRoute, private helper: HelperService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.["id"]) {
        this.shipper = this.shipperQuery.getEntity(params["id"]) as IShipper;
      }
    });
  }

  get fields() {
    return this.helper.getHeaderList(<IDataHeader[]>SHIPPER, ["action"]);
  }
}
