import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IShipper } from "src/app/interfaces";
import { AuthUserQuery, ShipperQuery, ShipperService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-shippers-edit",
  templateUrl: "./shippers-edit.component.html",
  styleUrls: ["./shippers-edit.component.scss"],
})
export class ShippersEditComponent implements OnInit {
  shipper!: IShipper;
  form!: FormGroup;
  errors: any;
  canEdit = this.authUserQuery.hasPermissions("Shipper", "edit");

  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private shipperQuery: ShipperQuery,
    private shipperService: ShipperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.shipperQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);

    this.route.params.subscribe((params) => {
      if (params?.["id"]) this.shipper = <IShipper>this.shipperQuery.getEntity(params["id"]);
    });

    this.form = this.fb.group({
      accountProfile: [
        {
          accNum: this.shipper?.accNum,
          title: this.shipper?.title,
          firstName: this.shipper?.firstName,
          surname: this.shipper?.surname,
          phoneNumber: this.shipper?.phoneNumber,
          mobileNumber: this.shipper?.mobileNumber,
          email: this.shipper?.email,
          company: this.shipper?.company,
        },
      ],

      pickup: [this.shipper?.pickup, [Validators.required]],
    });
  }

  async updateShipper(e: any) {
    e.preventDefault();
    const { accountAddress, accountProfile, pickup } = this.form.value;
    let requestData = {
      ...accountAddress,
      ...accountProfile,
      pickup,
      type: "Shipper",
    };

    await this.shipperService.update(this.shipper?._id, requestData);
    if (!this.errors) this.router.navigate(["dashboard/shippers"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
