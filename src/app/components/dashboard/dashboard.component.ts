import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;
  constructor() {}

  ngOnInit(): void {}
}
