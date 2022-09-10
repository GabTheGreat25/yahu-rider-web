import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IResource } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, HubQuery, HubService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-hub-add",
  templateUrl: "./hub-add.component.html",
  styleUrls: ["./hub-add.component.scss"],
})
export class HubAddComponent implements OnInit {
  showErrorMessage = false;
  form: FormGroup;

  name = new FormControl("", [Validators.required]);
  latitude = new FormControl();
  longitude = new FormControl();
  canAdd = this.authUserQuery.hasPermissions("Hub", "add");

  errors: any;
  permission: IResource[] = [];
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private hubQuery: HubQuery,
    private hubService: HubService,
    private authUserQuery: AuthUserQuery,
    private router: Router
  ) {
    this.latitude = new FormControl("", [Validators.required, this.validator.integer]);
    this.longitude = new FormControl("", [Validators.required, this.validator.integer]);
    this.form = this.fb.group({
      name: this.name,
    });

    this.hubQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  removeMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }

  async addHub(form: FormGroup) {
    const { latitude, longitude, ...rest } = form.value;
    let requestData = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      ...rest,
    };
    await this.hubService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/hubs"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
