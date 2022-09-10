import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserQuery, ResourceService } from "src/app/states";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { METHODS } from "src/app/constants";

@Component({
  selector: "app-resource-add",
  templateUrl: "./resource-add.component.html",
  styleUrls: ["./resource-add.component.scss"],
})
export class ResourceAddComponent implements OnInit {
  form: FormGroup;
  errors: ValidationErrors | null = null;
  showErrorMessage = false;
  methods = METHODS;

  name = new FormControl("", [Validators.required]);
  path = new FormControl("", [Validators.required]);
  method = new FormControl("", [Validators.required]);

  canAdd = this.authUserQuery.hasPermissions("Resource", "add");

  constructor(
    private authUserQuery: AuthUserQuery,
    private router: Router,
    private fb: FormBuilder,
    private resourceService: ResourceService
  ) {
    this.form = this.fb.group({
      name: this.name,
      path: this.path,
      method: this.method,
    });
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

  async onSubmit() {
    await this.resourceService.create(this.form.value);
    if (!this.errors) this.router.navigate(["dashboard/resources"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
