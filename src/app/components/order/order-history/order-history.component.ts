import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.scss"],
})
export class OrderHistoryComponent implements OnInit {
  date = new Date();
  todayDate: string = "";
  currentYear = this.date.getUTCFullYear();
  currentMonth = this.date.getUTCMonth() + 1;
  currentDay = this.date.getUTCDate();
  finalMonth: any;
  finalDay: any;

  yahuBg = `${env.CDN}images/svg/background/home-page-yhu.svg`;
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;

  orders = [
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
    {
      id: "123-523-52",
      status: "Complete",
      delivery: {
        date: "May 28, 2022",
        time: "8:30 AM",
        type: "Motorcycle",
      },
      driver: {
        firstName: "Ricardo",
        lastName: "De. Curfew",
        number: "09123456789",
      },
      routes: {
        pickUp: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
        dropOff: "52 Zambales St. near arcy bakery , 52 Zambales St, Taguig, 1632 Metro Manila, Philippines",
      },
      type: "Schedule",
      price: 559.0,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    } else {
      this.finalMonth = this.currentMonth;
    }

    if (this.currentDay < 10) {
      this.finalDay = "0" + this.currentDay;
    } else {
      this.finalDay = this.currentDay;
    }

    this.todayDate = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;
  }
}
