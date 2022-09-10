import { Component } from "@angular/core";
import { environment as env } from "../../../environments/environment";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent {
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo.png`;
}
