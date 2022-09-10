import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthUserQuery, ShipperQuery, ShipperService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-shippers-add",
  templateUrl: "./shippers-add.component.html",
  styleUrls: ["./shippers-add.component.scss"],
})
export class ShippersAddComponent implements OnInit {
  form = this.fb.group({
    accountProfile: [""],
    accountAddress: [],
    pickup: ["", [Validators.required]],
  });
  errors: any;
  canAdd = this.authUserQuery.hasPermissions("Shipper", "add");

  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private shipperQuery: ShipperQuery,
    private shipperService: ShipperService,
    private router: Router
  ) {
    this.shipperQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  async addShipper(e: any) {
    e.preventDefault();
    const { accountAddress, accountProfile, pickup } = this.form.value;
    let requestData = {
      ...accountAddress,
      ...accountProfile,
      pickup,
      type: "Shipper",
    };

    await this.shipperService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/shippers"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
