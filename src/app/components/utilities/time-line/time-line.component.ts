import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "timeline",
  templateUrl: "./time-line.component.html",
  styleUrls: ["./time-line.component.scss"],
})
export class TimeLineComponent implements OnInit {
  @Input() timelines: any[] = [];
  @Input() trackingNumber: string = "";
  @Input() notFound: string = "";
  @Input() qrCode: string = "";
  @Input() origin = "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines";

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
