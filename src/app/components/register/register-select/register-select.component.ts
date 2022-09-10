import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

type CardType = "User" | "Rider";

interface ICardInfo {
  title: string;
  type: CardType;
  body: string;
  button: string;
  image: string;
}

@Component({
  selector: "app-register-select",
  templateUrl: "./register-select.component.html",
  styleUrls: ["./register-select.component.scss"],
})
export class RegisterSelectComponent implements OnInit {
  bg = `${env.CDN}images/svg/background/login-bg.svg`;
  cards: ICardInfo[];

  constructor(private router: Router) {
    this.cards = [
      {
        title: "Become our rider partner",
        type: "Rider",
        body: "Partner with us to ride your own livelihood and more. Let’s get started on this journey together.",
        button: "Register as Rider",
        image: `${env.CDN}images/png/rider/rider-register.png`,
      },
      {
        title: "Become our rider partner",
        type: "User",
        body: "Partner with us to set your own price, grow your own living and more. Let us prosper to the greatest opportunity..",
        button: "Register as User",
        image: `${env.CDN}images/png/people/customer-register.png`,
      },
    ];
  }

  ngOnInit(): void {}

  goToUser() {
    this.router.navigate([`${this.router.url}/user`]);
  }

  goToRider() {
    this.router.navigate([`${this.router.url}/rider`]);
  }
}
