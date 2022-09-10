import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IAddress } from "src/app/interfaces";
import { AuthUserQuery, AddressQuery, AddressService, AccountQuery, AccountService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-addresses-edit",
  templateUrl: "./addresses-edit.component.html",
  styleUrls: ["./addresses-edit.component.scss"],
})
export class AddressesEditComponent implements OnInit {
  address!: IAddress<any>;
  accounts: any[] = [];
  canEdit = this.authUserQuery.hasPermissions("Address", "edit");

  form!: FormGroup;
  errors: any;
  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private addressQuery: AddressQuery,
    private addressService: AddressService,
    private accountQuery: AccountQuery,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addressQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
    if (!this.accountQuery.hasEntity()) this.accountService.get();
    this.accountQuery.accounts$.pipe(untilDestroyed(this)).subscribe((accounts) => {
      this.accounts = accounts;
      return accounts;
    });
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);

    this.route.params.subscribe((params) => {
      if (params?.["id"]) this.address = <IAddress<any>>this.addressQuery.getEntity(params["id"]);
    });

    this.form = this.fb.group({
      account: this.address?.account,
      company: this.address?.company,
      house: this.address?.house,
      building: this.address?.building,
      number: this.address?.number,
      street: this.address?.street,
      city: this.address?.city,
      barangay: this.address?.barangay,
      municipality: this.address?.municipality,
      province: this.address?.province,
      postalCode: this.address?.postalCode,
    });
  }

  get account(): AbstractControl {
    return this.form.controls["account"];
  }

  get company(): AbstractControl {
    return this.form.controls["company"];
  }

  get house(): AbstractControl {
    return this.form.controls["house"];
  }

  get building(): AbstractControl {
    return this.form.controls["building"];
  }

  get number(): AbstractControl {
    return this.form.controls["number"];
  }

  get street(): AbstractControl {
    return this.form.controls["street"];
  }

  get city(): AbstractControl {
    return this.form.controls["city"];
  }

  get barangay(): AbstractControl {
    return this.form.controls["barangay"];
  }

  get municipality(): AbstractControl {
    return this.form.controls["municipality"];
  }

  get province(): AbstractControl {
    return this.form.controls["province"];
  }

  get postalCode(): AbstractControl {
    return this.form.controls["postalCode"];
  }

  get accountInvalid(): boolean {
    return this.account.touched && this.account.invalid;
  }
  get companyInvalid(): boolean {
    return this.company.touched && this.company.invalid;
  }

  get houseInvalid(): boolean {
    return this.house.touched && this.house.invalid;
  }

  get buildingInvalid(): boolean {
    return this.building.touched && this.building.invalid;
  }

  get numberInvalid(): boolean {
    return this.number.touched && this.number.invalid;
  }

  get streetInvalid(): boolean {
    return this.street.touched && this.street.invalid;
  }

  get cityInvalid(): boolean {
    return this.city.touched && this.city.invalid;
  }

  get barangayInvalid(): boolean {
    return this.barangay.touched && this.barangay.invalid;
  }

  get municipalityInvalid(): boolean {
    return this.municipality.touched && this.municipality.invalid;
  }

  get provinceInvalid(): boolean {
    return this.province.touched && this.province.invalid;
  }

  get postalCodeInvalid(): boolean {
    return this.postalCode.touched && this.postalCode.invalid;
  }

  async updateAddress(form: FormGroup) {
    const { account, company, house, building, number, street, city, barangay, municipality, province, postalCode } = form.value;
    const requestData = {
      account,
      company,
      house,
      building,
      number,
      street,
      city,
      barangay,
      municipality,
      province,
      postalCode: Number(postalCode),
    };

    await this.addressService.update(this.address?._id, requestData);
    if (!this.errors) this.router.navigate(["dashboard/adresses"]);
    form.setErrors(this.errors);
    form.markAsDirty();
    form.markAsTouched();
  }
}
