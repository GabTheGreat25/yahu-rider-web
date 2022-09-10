import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IResource } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, UserQuery, UserService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  form = this.fb.group(
    {
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, this.validator.email]],
      phoneNumber: ["", [Validators.required, this.validator.mobile]],
      password: ["", [Validators.required, this.validator.password]],
      confirmPassword: ["", [Validators.required]],
    },
    {
      validators: this.validator.matchPassword,
    }
  );
  errors: any;
  permission!: IResource[];
  canAdd = this.authUserQuery.hasPermissions("User", "add");

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userQuery: UserQuery,
    private authUserQuery: AuthUserQuery,
    private router: Router,
    private validator: ValidatorService
  ) {
    this.userQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  get firstName() {
    return this.form.controls["firstName"];
  }
  get lastName() {
    return this.form.controls["lastName"];
  }
  get email() {
    return this.form.controls["email"];
  }
  get phoneNumber() {
    return this.form.controls["phoneNumber"];
  }
  get password() {
    return this.form.controls["password"];
  }
  get confirmPassword() {
    return this.form.controls["confirmPassword"];
  }

  get firstNameInvalid() {
    return this.firstName.invalid && this.firstName.touched;
  }
  get lastNameInvalid() {
    return this.lastName.invalid && this.lastName.touched;
  }
  get emailInvalid() {
    return this.email.invalid && this.email.touched;
  }
  get phoneNumberInvalid() {
    return this.phoneNumber.invalid && this.phoneNumber.touched;
  }
  get passwordInvalid() {
    return this.password.invalid && this.password.touched;
  }
  get confirmPasswordInvalid() {
    return this.confirmPassword.invalid && this.confirmPassword.touched;
  }

  async addUser(form: FormGroup) {
    const { confirmPassword, ...requestData } = form.value;
    await this.userService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/users"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
