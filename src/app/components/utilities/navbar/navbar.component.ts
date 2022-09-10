import { Component, Input, OnInit } from "@angular/core";
import { NavbarService } from "@app/services/navbar/navbar.service";
import { AuthService } from "@app/states/auth";
@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() projectName = "";
  @Input() logo = "";
  @Input() tabs = [
    { route: "/home", name: "Home" },
    { route: "/order", name: "Place Order" },
    { route: "/tracking", name: "Track" },
    { route: "/order/history", name: "Orders" },
  ];

  isHidden: boolean = false;
  name: string = "";
  avatar: string = "";
  isLogin: boolean = false;

  constructor(public auth: AuthService, private navbar: NavbarService) {}

  ngOnInit(): void {
    this.name = this.auth.user.firstName;
    this.avatar = this.auth.user.avatar;

    this.navbar.init(this.tabs);

    this.navbar.tabs.subscribe((tabs) => {
      this.tabs = tabs;
    });

    this.auth.login$.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  onHide() {
    this.isHidden = !this.isHidden;
  }

  clickOutside() {
    this.isHidden = false;
  }

  logout() {
    this.auth.logout();
  }
}
