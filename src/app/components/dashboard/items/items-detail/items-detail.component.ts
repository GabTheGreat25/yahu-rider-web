import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITEM } from "src/app/constants";
import { IDataHeader, IItem } from "src/app/interfaces";
import { HelperService } from "src/app/services";
import { ItemQuery } from "src/app/states";

@Component({
  selector: "app-items-detail",
  templateUrl: "./items-detail.component.html",
  styleUrls: ["./items-detail.component.scss"],
})
export class ItemsDetailComponent implements OnInit {
  item!: IItem;
  constructor(private itemQuery: ItemQuery, private route: ActivatedRoute, private helper: HelperService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.["id"]) {
        this.item = this.itemQuery.getEntity(params["id"]) as IItem;
      }
    });
  }

  get fields() {
    return this.helper.getHeaderList(<IDataHeader[]>ITEM, ["action"]);
  }
}
