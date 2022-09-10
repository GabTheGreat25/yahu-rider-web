import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  @Input() title: string = "";
  @Input() data: any;
  @Input() fields: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
