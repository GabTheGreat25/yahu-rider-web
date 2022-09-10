import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "register-card",
  templateUrl: "./register-card.component.html",
  styleUrls: ["./register-card.component.scss"],
})
export class RegisterCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() body: string = "";
  @Input() button: string = "";
  @Input() image: string = "";
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  click() {
    this.onClick.emit();
  }
}
