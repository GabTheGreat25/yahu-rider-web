import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IDataHeader, IResource } from "src/app/interfaces";
import { AuthUserQuery } from "src/app/states";

@Component({
  selector: "app-parcel-list",
  templateUrl: "./parcel-list.component.html",
  styleUrls: ["./parcel-list.component.scss"],
})
export class ParcelListComponent implements OnInit {
  headers: any[] = [];
  paginations: any[] = [];
  rows: any[] = [];
  permission!: IResource[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rows = this.getUserList();
    this.paginations = this.getPagination();
    this.headers = this.getHeaderList();
  }

  getPagination() {
    return ["1", "2", "3", "4", "5", "6"];
  }

  getHeaderList(): IDataHeader[] {
    return [
      {
        text: "ID",
        dataField: "id",
        type: "text",
      },
      {
        text: "Type",
        dataField: "type",
        type: "text",
      },
      {
        text: "Amount",
        dataField: "amount",
        type: "text",
      },
      {
        text: "Price",
        dataField: "price",
        type: "text",
      },
      {
        text: "ID",
        dataField: "id",
        type: "text",
      },
      {
        text: "USD",
        dataField: "usd",
        type: "text",
      },
      {
        text: "Fee",
        dataField: "fee",
        type: "text",
      },
      {
        text: "Status",
        dataField: "status",
        type: "text",
      },
    ];
  }

  getUserList() {
    return [
      {
        id: "1",
        type: "Buy",
        amount: "₱586",
        price: "120.55",
        usd: "50.78",
        fee: "0.5",
        status: "Active",
      },
      {
        id: "2",
        type: "Sell",
        amount: "₱876",
        price: "175.23",
        usd: "67.38",
        fee: "0.4",
        status: "Pending",
      },
      {
        id: "3",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
      {
        id: "4",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
      {
        id: "5",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
      {
        id: "6",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
      {
        id: "7",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
      {
        id: "8",
        type: "Buy",
        amount: "₱999",
        price: "213.33",
        usd: "77.88",
        fee: "0.3",
        status: "Cancel",
      },
    ];
  }

  onEdit(event: any) {
    this.router.navigate([this.router.url + `/edit/${event.id}`]);
  }

  onDelete(event: any) {}
}
