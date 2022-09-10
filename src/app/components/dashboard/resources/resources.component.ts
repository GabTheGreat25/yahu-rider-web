import { Component, OnInit } from "@angular/core";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-resources",
  templateUrl: "./resources.component.html",
  styleUrls: ["./resources.component.scss"],
})
export class ResourcesComponent implements OnInit {
  canAdd = this.authUserQuery.hasPermissions("Resource", "add");

  constructor(private authUserQuery: AuthUserQuery) {}

  ngOnInit(): void {}
}
