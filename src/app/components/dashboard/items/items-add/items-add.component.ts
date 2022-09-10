import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, ItemQuery, ItemService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-items-add",
  templateUrl: "./items-add.component.html",
  styleUrls: ["./items-add.component.scss"],
})
export class ItemsAddComponent implements OnInit {
  form = this.fb.group({
    trackingNo: ["", [Validators.required]],
    code: ["", [Validators.required]],
    description: ["", [Validators.required]],
    value: ["", [Validators.required, this.validator.number]],
    weight: ["", [Validators.required, this.validator.number]],
  });
  canAdd = this.authUserQuery.hasPermissions("Item", "add");

  errors: any;
  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
    private router: Router,
    private validator: ValidatorService
  ) {
    this.itemQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  get trackingNo(): AbstractControl {
    return this.form.controls["trackingNo"];
  }

  get code(): AbstractControl {
    return this.form.controls["code"];
  }

  get description(): AbstractControl {
    return this.form.controls["description"];
  }

  get value(): AbstractControl {
    return this.form.controls["value"];
  }

  get weight(): AbstractControl {
    return this.form.controls["weight"];
  }

  get trackingNoInvalid(): boolean {
    return this.trackingNo.touched && this.trackingNo.invalid;
  }
  get codeInvalid(): boolean {
    return this.code.touched && this.code.invalid;
  }

  get descriptionInvalid(): boolean {
    return this.description.touched && this.description.invalid;
  }

  get valueInvalid(): boolean {
    return this.value.touched && this.value.invalid;
  }

  get weightInvalid(): boolean {
    return this.weight.touched && this.weight.invalid;
  }

  async addItem(form: FormGroup) {
    const { trackingNo, code, description, value, weight } = form.value;
    let requestData = {
      trackingNo,
      code,
      description,
      value: Number(value),
      weight: Number(weight),
    };

    await this.itemService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/items"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
