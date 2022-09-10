import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.scss"],
})
export class TrackingComponent implements OnInit {
  refNum = new FormControl("", [Validators.required]);
  form = this.fb.group({ refNum: this.refNum });
  delivery = `${env.CDN}/images/svg/delivery/empty_completed_delivery.svg`;
  background = `${env.CDN}/images/svg/background/login-bg.svg`;
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;
  trackingId = "";

  constructor(private fb: FormBuilder, public router: Router) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate([`tracking/${this.refNum.value}`]);
  }
}
