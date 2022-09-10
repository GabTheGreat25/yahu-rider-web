import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "tracking-body",
  templateUrl: "./tracking-body.component.html",
  styleUrls: ["./tracking-body.component.scss"],
})
export class TrackingBodyComponent implements OnInit {
  @Input() timelines: any[] = [];
  @Input() qrCode: string = "";

  constructor() {}

  ngOnInit(): void {}
}
