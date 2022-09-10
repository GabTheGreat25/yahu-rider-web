import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services";
import { environment as env } from "src/environments/environment";
import { Location } from "@angular/common";

@Component({
  selector: "app-tracking-items",
  templateUrl: "./tracking-items.component.html",
  styleUrls: ["./tracking-items.component.scss"],
})
export class TrackingItemsComponent implements OnInit {
  origin = "NOT FOUND";
  timelines: any[] = [];
  trackingNumber: string = "NOT FOUND";
  date: string = "";
  noItems: number = 0;
  status: string = "NOT FOUND";
  fullName: string = "NOT FOUND";
  weight: string = "";
  fullAddress: string = "NOT FOUND";
  qrCode: string = "";
  filter: string[] = ["Created", "Arrived", "ItemAccepted"];
  notFound: string = `${env.CDN}images/svg/delivery/empty_completed_delivery.svg`;

  constructor(private api: ApiService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get("id");
      if (id) this.getTrackingById(id);
    });
  }

  async getTrackingById(id: string) {
    this.trackingNumber = id;
    try {
      const { status, data } = await this.api.get<any>(`tracking/${id}`, true);
      const {
        consignee: { firstName, lastName },
      } = data[0];
      this.trackingNumber = id;
      this.date = data[0].DateCreated;
      this.noItems = data[0].items.length;
      this.status = data[0].status;
      this.fullName = `${firstName} ${lastName}`;
      this.weight = data[0].weight;
      this.fullAddress = data[0].shippingAddress.address.fullAddress;
      this.qrCode = data[0].qrCode;
      this.timelines = data[0].tracking.filter((e: any) => {
        return !this.filter.includes(e.type);
      });
    } catch (error) {}
  }

  goBack() {
    this.location.back();
  }
}
