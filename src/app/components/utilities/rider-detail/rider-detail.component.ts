import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "rider-detail",
  templateUrl: "./rider-detail.component.html",
  styleUrls: ["./rider-detail.component.scss"],
})
export class RiderDetailComponent implements OnInit {
  @Input() title: string = "";
  @Input() data: any;
  @Input() fields: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
