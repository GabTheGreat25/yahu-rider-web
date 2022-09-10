import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/states/auth";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ValidatorService } from "src/app/services";
import { environment as env } from "src/environments/environment";

@UntilDestroy()
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    credential: ["", [Validators.required]],
    password: ["", [Validators.required, this.validator.password]],
  });

  loginImg = `${env.CDN}/icons/png/logo.png`;
  errors: string;
  background = `${env.CDN}images/svg/background/login-bg.svg`;
  redirect: string = "/";

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.errors = "";
  }

  get credential(): AbstractControl {
    return this.form.controls["credential"];
  }

  get password(): AbstractControl {
    return this.form.controls["password"];
  }

  get credentialInvalid(): boolean {
    return this.credential.invalid && this.credential.touched;
  }

  get passwordInvalid(): boolean {
    return this.password.invalid && this.password.touched;
  }
  get credentialValid(): boolean {
    return this.credential.valid && this.credential.touched;
  }

  get passwordValid(): boolean {
    return this.password.valid && this.password.touched;
  }

  get invalidControlClass(): string {
    return "ng-invalid ng-touched";
  }

  get validControlClass(): string {
    return "ng-valid ng-touched";
  }

  ngOnInit(): void {
    this.form.markAsDirty();
    this.form.markAsTouched();
    this.auth.error$.subscribe((error) => {
      if (error?.message) {
        this.errors = error.message;
        this.form.markAsDirty();
        this.form.markAsTouched();
      }
    });

    this.route.queryParams.subscribe((params: any) => {
      if (params.redirect) {
        this.redirect = params.redirect;
      }
    });
  }

  login() {
    this.form.setErrors(null);
    this.auth.login(this.form.value);
    this.auth.loading$.subscribe((loading) => {
      if (!loading) {
        this.router.navigate([this.redirect]);
      }
    });
  }
}
