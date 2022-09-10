import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "order-table",
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],
})
export class OrderTableComponent implements OnInit {
  @Input() orders: any[] = [];
  headers: string[];

  constructor() {
    this.headers = ["Order ID", "Status", "Delivery Date", "Routes", "Driver", "Delivery Type", "Order Type", "Price"];
  }

  ngOnInit(): void {}
}
