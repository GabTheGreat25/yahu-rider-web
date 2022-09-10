import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IItem } from "src/app/interfaces";
import { AuthUserQuery, ItemQuery, ItemService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-items-edit",
  templateUrl: "./items-edit.component.html",
  styleUrls: ["./items-edit.component.scss"],
})
export class ItemsEditComponent implements OnInit {
  item!: IItem;
  form!: FormGroup;
  canEdit = this.authUserQuery.hasPermissions("Item", "edit");

  errors: any;
  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);

    this.route.params.subscribe((params) => {
      if (params?.["id"]) this.item = <IItem>this.itemQuery.getEntity(params["id"]);
    });

    this.form = this.fb.group({
      trackingNo: this.item?.trackingNo,
      code: this.item?.code,
      description: this.item?.description,
      value: this.item?.value,
      weight: this.item?.weight,
    });
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

  async updateItem(form: FormGroup) {
    const { trackingNo, code, description, value, weight } = form.value;
    let requestData = {
      trackingNo,
      code,
      description,
      value: Number(value),
      weight: Number(weight),
    };

    await this.itemService.update(this.item?._id, requestData);
    if (!this.errors) this.router.navigate(["dashboard/items"]);
    form.setErrors(this.errors);
    form.markAsDirty();
    form.markAsTouched();
  }
}
