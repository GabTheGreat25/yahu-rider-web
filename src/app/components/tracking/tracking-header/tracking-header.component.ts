import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "tracking-header",
  templateUrl: "./tracking-header.component.html",
  styleUrls: ["./tracking-header.component.scss"],
})
export class TrackingHeaderComponent implements OnInit {
  @Input() trackingNumber: string = "";
  @Input() timelines: any[] = [];
  @Input() status: string = "";
  @Input() fullName: string = "";
  @Input() fullAddress: string = "";
  @Input() origin: string = "";
  constructor() {}

  ngOnInit(): void {}
}
