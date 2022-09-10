import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnInit {
  @Input() icon: string = "las la-times";
  @Input() style = { cursor: "pointer" };
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onBtnClick() {
    this.onClick.emit();
  }
}
