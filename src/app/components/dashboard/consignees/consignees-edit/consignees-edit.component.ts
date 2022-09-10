import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IConsignee } from "src/app/interfaces";
import { AuthUserQuery, ConsigneeQuery, ConsigneeService } from "src/app/states";

@UntilDestroy()
@Component({
  selector: "app-consignees-edit",
  templateUrl: "./consignees-edit.component.html",
  styleUrls: ["./consignees-edit.component.scss"],
})
export class ConsigneesEditComponent implements OnInit {
  consignee!: IConsignee;
  form!: FormGroup;
  errors: any;
  canEdit = this.authUserQuery.hasPermissions("Consignee", "edit");

  constructor(
    private fb: FormBuilder,
    private authUserQuery: AuthUserQuery,
    private consigneeQuery: ConsigneeQuery,
    private consigneeService: ConsigneeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.consigneeQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {
    this.canEdit ? null : this.router.navigate(["/dashboard"]);

    this.route.params.subscribe((params) => {
      if (params?.["id"]) this.consignee = <IConsignee>this.consigneeQuery.getEntity(params["id"]);
    });
    this.form = this.fb.group({
      accountProfile: [
        {
          accNum: this.consignee?.accNum,
          title: this.consignee?.title,
          firstName: this.consignee?.firstName,
          surname: this.consignee?.surname,
          phoneNumber: this.consignee?.phoneNumber,
          mobileNumber: this.consignee?.mobileNumber,
          email: this.consignee?.email,
          company: this.consignee?.company,
        },
      ],

      delivery: [this.consignee?.delivery, [Validators.required]],
    });
  }

  async updateConsignee(e: any) {
    e.preventDefault();
    const { accountAddress, accountProfile, delivery } = this.form.value;
    let requestData = {
      ...accountAddress,
      ...accountProfile,
      delivery,
      type: "Consignee",
    };

    await this.consigneeService.update(this.consignee?._id, requestData);
    if (!this.errors) this.router.navigate(["dashboard/consignees"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
