import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-coming-soon",
  templateUrl: "./coming-soon.component.html",
  styleUrls: ["./coming-soon.component.scss"],
})
export class ComingSoonComponent implements OnInit {
  logo = `${env.CDN}images/png/logo.png`;
  bg = `${env.CDN}images/svg/promdifarm-green-bg.svg`;
  image404 = `${env.CDN}images/svg/service-maintenance.svg`;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(["/dashboard"]);
  }
}
