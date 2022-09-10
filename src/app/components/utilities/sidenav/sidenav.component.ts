import { Component, OnInit } from "@angular/core";
import { IResource } from "src/app/interfaces";
import { AuthService } from "@app/states/auth";

interface ITabs {
  route: string;
  name: string;
  icon: string;
}

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  icons: { [key: string]: string } = {
    users: "las la-user-circle",
    deliveries: "las la-shipping-fast",
    hubs: "las la-warehouse",
    parcels: "las la-box",
    billings: "las la-file-invoice-dollar",
    consignees: "las la-user",
    shippers: "las la-dolly",
    items: "las la-sitemap",
    addresses: "las la-address-book",
    riders: "las la-address-card",
    roles: "las la-users-cog",
    resources: "las la-users-cog",
  };

  tabs: ITabs[] = [];
  permission: IResource[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getTabs();
  }

  getTabs() {
    this.tabs = this.auth.resource.reduce((acc, { name, path }) => {
      const filter = "View ";
      if (name.includes(filter) && !name.includes("single")) {
        name = this.capitalizeFirstLetter(name.replace(filter, ""));
        acc.push({ route: path, name, icon: this.icons[name.toLocaleLowerCase()] ?? "" });
      }
      return acc;
    }, [] as ITabs[]);
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
