import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent implements OnInit {
  @Input() title = "";
  @Input() name = "";
  @Input() number = "";
  @Input() description = "";
  @Input() color = "#fbc472";

  constructor() {}

  ngOnInit(): void {}
}
