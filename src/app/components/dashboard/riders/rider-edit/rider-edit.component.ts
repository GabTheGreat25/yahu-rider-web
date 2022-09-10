import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { IRider } from "src/app/interfaces";
import { AuthUserQuery, RiderQuery, RiderService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-rider-edit",
  templateUrl: "./rider-edit.component.html",
  styleUrls: ["./rider-edit.component.scss"],
})
export class RiderEditComponent implements OnInit {
  rider!: IRider<any>;

  form!: FormGroup;
  errors: any;
  canEdit = this.authUserQuery.hasPermissions("Rider", "edit");

  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private riderQuery: RiderQuery,
    private riderService: RiderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!this.riderQuery.hasEntity()) this.riderService.get();
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);

    this.route.params.subscribe((params) => {
      if (params?.["id"]) this.rider = <IRider<any>>this.riderQuery.getEntity(params["id"]);
    });
    this.form = this.fb.group({
      firstName: this.rider?.firstName,
      lastName: this.rider?.lastName,
      email: this.rider?.email,
      birthday: this.rider?.birthday,
      phoneNumber: this.rider?.phoneNumber,
      status: this.rider?.status,
    });
  }

  get firstName(): AbstractControl {
    return this.form.controls["firstName"];
  }

  get firstNameInvalid(): boolean {
    return this.firstName.touched && this.firstName.invalid;
  }

  get lastName(): AbstractControl {
    return this.form.controls["lastName"];
  }

  get lastNameInvalid(): boolean {
    return this.lastName.touched && this.lastName.invalid;
  }
  get email(): AbstractControl {
    return this.form.controls["email"];
  }

  get emailInvalid(): boolean {
    return this.email.touched && this.email.invalid;
  }
  get birthdate(): AbstractControl {
    return this.form.controls["birthdate"];
  }

  get birthdateInvalid(): boolean {
    return this.birthdate.touched && this.birthdate.invalid;
  }
  get phoneNumber(): AbstractControl {
    return this.form.controls["phoneNumber"];
  }

  get phoneNumberInvalid(): boolean {
    return this.phoneNumber.touched && this.phoneNumber.invalid;
  }
  get status(): AbstractControl {
    return this.form.controls["status"];
  }

  get statusInvalid(): boolean {
    return this.status.touched && this.status.invalid;
  }
  async updateRider(form: FormGroup) {
    const res = await this.riderService.update(this.rider?._id, form.value);

    if (!this.errors) this.router.navigate(["dashboard/riders"]);
    form.setErrors(this.errors);
    form.markAsDirty();
    form.markAsTouched();
  }
}
