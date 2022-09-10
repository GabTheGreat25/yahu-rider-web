import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, AddressQuery, AddressService, AccountQuery, AccountService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-addresses-add",
  templateUrl: "./addresses-add.component.html",
  styleUrls: ["./addresses-add.component.scss"],
})
export class AddressesAddComponent implements OnInit {
  accounts: any[] = [];
  showErrorMessage = false;
  form: FormGroup;
  canAdd = this.authUserQuery.hasPermissions("Address", "add");

  account = new FormControl("", [Validators.required]);
  company = new FormControl("", [Validators.required]);
  house = new FormControl("", [Validators.required]);
  building = new FormControl("", [Validators.required]);
  number = new FormControl("", [Validators.required]);
  street = new FormControl("", [Validators.required]);
  city = new FormControl("", [Validators.required]);
  barangay = new FormControl("", [Validators.required]);
  municipality = new FormControl("", [Validators.required]);
  province = new FormControl("", [Validators.required]);
  postalCode = new FormControl("", [Validators.required]);

  errors: any;
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private authUserQuery: AuthUserQuery,
    private addressQuery: AddressQuery,
    private addressService: AddressService,
    private accountQuery: AccountQuery,
    private accountService: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      account: this.account,
      company: this.company,
      house: this.house,
      building: this.building,
      number: this.number,
      street: this.street,
      city: this.city,
      barangay: this.barangay,
      municipality: this.municipality,
      province: this.province,
      postalCode: this.postalCode,
    });

    this.addressQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
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

  async addAddress(form: FormGroup) {
    const { account, company, house, building, number, street, city, barangay, municipality, province, postalCode } = form.value;
    let requestData = {
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

    await this.addressService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/adresses"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
