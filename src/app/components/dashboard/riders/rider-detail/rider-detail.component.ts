import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RidersQuery } from "@app/states/riders";
import { map, switchMap } from "rxjs";
import { IRider } from "src/app/interfaces";

@Component({
  selector: "app-rider-detail",
  templateUrl: "./rider-detail.component.html",
  styleUrls: ["./rider-detail.component.scss"],
})
export class RiderDetailComponent implements OnInit {
  rider!: IRider<any>;
  id$ = this.route.params.pipe(map((params) => params["id"]));
  rider$ = this.id$.pipe(switchMap((id) => this.query.selectRider(id)));
  constructor(private query: RidersQuery, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.rider$.subscribe((e) => {
      if (e) this.rider = e;
    });
  }

  getFormatedDate(dateTime: string, format: string) {
    return new DatePipe("en-US").transform(new Date(dateTime), format);
  }
}
