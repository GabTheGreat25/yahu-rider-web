import { Component, OnInit, Input } from "@angular/core";
import { VALIDATOR_MSG } from "src/app/constants";
@Component({
  selector: "app-validation-message",
  templateUrl: "./validation-msg.component.html",
  styleUrls: ["./validation-msg.component.scss"],
})
export class ValidationMsgComponent implements OnInit {
  _text: string = "";
  @Input()
  set validator(value: string) {
    if (!VALIDATOR_MSG[value]) {
      console.error(`VALIDATOR MESSAGE NOT FOUND. Is the validator name: "${value}" registered in validator message constants?`);
    }
    this._text = VALIDATOR_MSG[value];
  }
  constructor() {}

  ngOnInit(): void {}
}
