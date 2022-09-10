import { Component, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { IDelivery } from "@app/interfaces";

@UntilDestroy()
@Component({
  selector: "app-delivery-detail",
  templateUrl: "./delivery-detail.component.html",
  styleUrls: ["./delivery-detail.component.scss"],
})
export class DeliveryDetailComponent implements OnInit {
  delivery!: IDelivery<any, any, any>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params["id"]) this.router.navigate(["/dashboard"]);

      // Replace with proper api call
      // this.delivery = this.repository.getById(params["id"]);
    });
  }

  onDetail(event: any) {
    this.router.navigate([this.router.url + `/${event}`]);
  }
}
