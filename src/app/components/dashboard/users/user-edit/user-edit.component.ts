import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidatorService } from "src/app/services";
import { AuthService, AuthUserQuery, UserQuery, UserService } from "src/app/states";
import { IPermission, IResource, IUser } from "src/app/interfaces";
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  user?: IUser<any>;
  errors: any;
  permission: IResource[] = [];
  canEdit = this.authUserQuery.hasPermissions("User", "edit");

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private validator: ValidatorService,
    private route: ActivatedRoute,
    private userQuery: UserQuery,
    private authUserQuery: AuthUserQuery
  ) {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.user = this.userQuery.getEntity(params["id"]);
      }
    });

    this.form = this.fb.group({
      firstName: [this.user?.firstName, [Validators.required]],
      lastName: [this.user?.lastName, [Validators.required]],
      email: [this.user?.email, [Validators.required, this.validator.email]],
      phoneNumber: [this.user?.phoneNumber, [Validators.required, this.validator.mobile]],
    });
    this.userQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => {
      this.errors = error;
    });
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);
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

  async editUser(form: FormGroup) {
    const { ...requestData } = form.value;
    await this.userService.update(this.user?._id ?? "", requestData);
    if (!this.errors) this.router.navigate(["dashboard/users"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
