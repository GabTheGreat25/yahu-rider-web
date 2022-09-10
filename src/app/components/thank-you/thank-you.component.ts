import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment as env } from "src/environments/environment";
@Component({
  selector: "app-order-placed",
  templateUrl: "./thank-you.component.html",
  styleUrls: ["./thank-you.component.scss"],
})
export class ThankYouComponent implements OnInit {
  projectName = env.PROJECT_NAME;
  logo: string = `${env.CDN}icons/png/logo.png`;
  vector: string = `${env.CDN}/images/png/delivery/order-placed.png`;
  trackingNumber: string = "/";

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tnum) {
        this.trackingNumber = params.tnum;
      }
    });
  }

  goToTracking() {
    this.router.navigate([`/tracking/${this.trackingNumber}`]);
  }

  goToOrder() {
    this.router.navigate(["/order"]);
  }
}
