import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.scss"],
})
export class PopUpComponent implements OnInit {
  showPopup: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  close() {
    this.router.navigate(["home"]);
  }
}
