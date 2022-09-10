import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { IParcel, IResource } from "src/app/interfaces";
import { AuthUserQuery, ParcelQuery } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-parcel-detail",
  templateUrl: "./parcel-detail.component.html",
  styleUrls: ["./parcel-detail.component.scss"],
})
export class ParcelDetailComponent implements OnInit {
  parcel!: IParcel<any, any, any>;
  rows: any[] = [];
  permission: IResource[] = [];
  hasDeletePermission = false;
  hasEditPermission = false;

  constructor(private router: Router, private parcelQuery: ParcelQuery, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.["parcelid"]) {
        this.parcel = this.parcelQuery.getEntity(params["parcelid"]) as IParcel<any, any, any>;
      }
    });
  }

  track(trackNum: any) {
    this.router.navigate([`tracking/${trackNum}`]);
  }
}
