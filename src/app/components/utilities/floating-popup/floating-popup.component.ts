import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "floating-popup",
  templateUrl: "./floating-popup.component.html",
  styleUrls: ["./floating-popup.component.scss"],
})
export class FloatingPopupComponent implements OnInit {
  @Input() show: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
