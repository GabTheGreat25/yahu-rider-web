import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  background = `${env.CDN}images/svg/background/home-page-yhu.svg`;
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goto(url: string) {
    this.router.navigate([url]);
  }
}
