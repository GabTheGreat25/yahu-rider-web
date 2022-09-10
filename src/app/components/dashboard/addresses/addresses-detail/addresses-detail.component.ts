import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ADDRESS } from "src/app/constants";
import { IDataHeader, IAddress } from "src/app/interfaces";
import { HelperService } from "src/app/services";
import { AddressQuery } from "src/app/states";

@Component({
  selector: "app-addresses-detail",
  templateUrl: "./addresses-detail.component.html",
  styleUrls: ["./addresses-detail.component.scss"],
})
export class AddressesDetailComponent implements OnInit {
  address!: IAddress<any>;
  constructor(private addressQuery: AddressQuery, private route: ActivatedRoute, private helper: HelperService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.["id"]) {
        this.address = this.addressQuery.getEntity(params["id"]) as IAddress<any>;
      }
    });
  }

  get fields() {
    return this.helper.getHeaderList(<IDataHeader[]>ADDRESS, ["action"]);
  }
}
