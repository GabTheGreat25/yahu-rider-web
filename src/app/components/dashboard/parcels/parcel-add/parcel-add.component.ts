import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IResource } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, ParcelQuery, ParcelService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-parcel-add",
  templateUrl: "./parcel-add.component.html",
  styleUrls: ["./parcel-add.component.scss"],
})
export class ParcelAddComponent implements OnInit {
  showErrorMessage = false;
  form: FormGroup;

  referenceNumber = new FormControl("", [Validators.required]);
  pickupAddress = new FormControl();
  shippingAddress = new FormControl();
  itemCode = new FormControl("", [Validators.required]);
  weight = new FormControl();
  itemDescription = new FormControl("", [Validators.required]);
  consigneeInfo = new FormControl();
  consigneeAddress = new FormControl();
  errors: any;
  permission!: IResource[];
  canAdd = this.authUserQuery.hasPermissions("Parcel", "add");

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private parcelQuery: ParcelQuery,
    private parcelService: ParcelService,
    private authUserQuery: AuthUserQuery,
    private router: Router
  ) {
    this.weight = new FormControl("", [Validators.required, this.validator.number]);
    this.form = this.fb.group({
      referenceNumber: this.referenceNumber,
      pickupAddress: this.pickupAddress,
      shippingAddress: this.shippingAddress,
      itemCode: this.itemCode,
      weight: this.weight,
      itemDescription: this.itemDescription,
    });
    this.parcelQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  fieldInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  removeMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }

  field(name: string) {
    return this.form.controls[name];
  }

  async addParcel(e: any) {
    e.preventDefault();
    const { pickupAddress, shippingAddress, consigneeAddress, consigneeInfo, ...rest } = this.form.value;
    let requestData = {
      refNum: rest.referenceNumber,
      pickupAddress: {
        ...pickupAddress,
        lat: Number(pickupAddress.lat),
        lng: Number(pickupAddress.lng),
      },
      shippingAddress: {
        ...shippingAddress,
        lat: Number(shippingAddress.lat),
        lng: Number(shippingAddress.lng),
      },
      consignee: {
        ...consigneeInfo,
        ...consigneeAddress,
        lat: Number(consigneeAddress.lat),
        lng: Number(consigneeAddress.lng),
      },
      item: {
        code: rest.itemCode,
        description: rest.itemDescription,
      },
      weight: Number(rest.weight),
    };
    await this.parcelService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/parcels"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
