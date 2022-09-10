import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"],
})
export class QrCodeComponent implements OnInit {
  @Input() qrCode: string = "";

  constructor() {}

  ngOnInit(): void {}
}
