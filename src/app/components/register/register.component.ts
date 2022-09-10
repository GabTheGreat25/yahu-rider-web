import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env } from "../../../environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;
  bg = `${env.CDN}images/svg/background/login-bg.svg`;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
