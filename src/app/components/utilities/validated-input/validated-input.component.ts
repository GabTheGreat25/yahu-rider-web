import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: "validated-input",
  templateUrl: "./validated-input.component.html",
  styleUrls: ["./validated-input.component.scss"],
})
export class ValidatedInputComponent implements OnInit {
  _show = false;

  @Input() control!: AbstractControl;
  @Input() set showErrorMessage(value: boolean) {
    if (!value) setTimeout(() => (this._show = false), 2000);
    else this._show = value;
  }

  constructor() {}

  ngOnInit(): void {}
}
