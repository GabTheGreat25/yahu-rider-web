import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IHub, IResource } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, HubQuery, HubService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-hub-edit",
  templateUrl: "./hub-edit.component.html",
  styleUrls: ["./hub-edit.component.scss"],
})
export class HubEditComponent implements OnInit {
  form!: FormGroup;
  hub?: IHub;
  errors: any;
  canEdit = this.authUserQuery.hasPermissions("Hub", "edit");

  permission: IResource[] = [];
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private hubQuery: HubQuery,
    private hubService: HubService,
    private authUserQuery: AuthUserQuery,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({ id }) => {
      if (id) this.hub = this.hubQuery.getEntity(id);
    });
    this.form = this.fb.group({
      name: [this.hub?.name, [Validators.required]],
      latitude: [this.hub?.latitude, [Validators.required, this.validator.integer]],
      longitude: [this.hub?.longitude, [Validators.required, this.validator.integer]],
    });
    this.hubQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);
  }

  get name(): AbstractControl {
    return this.form.controls["name"];
  }

  get latitude(): AbstractControl {
    return this.form.controls["latitude"];
  }

  get longitude(): AbstractControl {
    return this.form.controls["longitude"];
  }

  get nameInvalid(): boolean {
    return this.name.invalid && this.name.touched;
  }

  get latitudeInvalid(): boolean {
    return this.latitude.invalid && this.latitude.touched;
  }

  get longitudeInvalid(): boolean {
    return this.longitude.invalid && this.longitude.touched;
  }

  async editHub(form: FormGroup) {
    const { latitude, longitude, ...rest } = form.value;
    let requestData = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      ...rest,
    };
    await this.hubService.update(this.hub?._id ?? "", requestData);
    if (!this.errors) this.router.navigate(["dashboard/hubs"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
