import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthUserQuery, ConsigneeQuery, ConsigneeService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-consignees-add",
  templateUrl: "./consignees-add.component.html",
  styleUrls: ["./consignees-add.component.scss"],
})
export class ConsigneesAddComponent implements OnInit {
  form = this.fb.group({
    accountProfile: [""],
    accountAddress: [],
    delivery: ["", [Validators.required]],
  });
  errors: any;
  canAdd = this.authUserQuery.hasPermissions("Consignee", "add");

  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private consigneeQuery: ConsigneeQuery,
    private consigneeService: ConsigneeService,
    private router: Router
  ) {
    this.consigneeQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  async addConsignee(e: any) {
    e.preventDefault();
    const { accountAddress, accountProfile, delivery } = this.form.value;
    let requestData = {
      ...accountAddress,
      ...accountProfile,
      delivery,
      type: "Consignee",
    };

    await this.consigneeService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/consignees"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
