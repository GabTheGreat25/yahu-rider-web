import { Component, OnInit } from "@angular/core";
import { environment as env } from "../../../../environments/environment";
@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"],
})
export class RegisterUserComponent implements OnInit {
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;
  background = `${env.CDN}images/svg/background/login-bg.svg`;
  constructor() {}

  ngOnInit(): void {}
}
