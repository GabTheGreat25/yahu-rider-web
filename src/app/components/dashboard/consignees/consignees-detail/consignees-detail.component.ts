import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CONSIGNEE } from "src/app/constants";
import { IConsignee, IDataHeader } from "src/app/interfaces";
import { HelperService } from "src/app/services";
import { ConsigneeQuery } from "src/app/states";

@Component({
  selector: "app-consignees-detail",
  templateUrl: "./consignees-detail.component.html",
  styleUrls: ["./consignees-detail.component.scss"],
})
export class ConsigneesDetailComponent implements OnInit {
  consignee!: IConsignee;
  constructor(private consigneeQuery: ConsigneeQuery, private route: ActivatedRoute, private helper: HelperService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.["id"]) {
        this.consignee = this.consigneeQuery.getEntity(params["id"]) as IConsignee;
      }
    });
  }

  get fields() {
    return this.helper.getHeaderList(<IDataHeader[]>CONSIGNEE, ["action"]);
  }
}
