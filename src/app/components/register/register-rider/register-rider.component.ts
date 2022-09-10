import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ApiService, PopUpService } from "src/app/services";
import { AuthUserQuery, RiderService } from "src/app/states";
import { RiderQuery } from "src/app/states/query/rider.query";
import { environment as env } from "../../../../environments/environment";

@UntilDestroy()
@Component({
  selector: "app-register-rider",
  templateUrl: "./register-rider.component.html",
  styleUrls: ["./register-rider.component.scss"],
})
export class RegisterRiderComponent implements OnInit {
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo-m.png`;
  background = `${env.CDN}images/svg/background/login-bg.svg`;
  form: FormGroup;
  showErrorMessage = false;
  images: string[] = [];
  isOpen: boolean = false;
  license: FormGroup;
  or: FormGroup;
  cr: FormGroup;
  vehicle: FormGroup;
  address = new FormControl("", [Validators.required]);
  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  phoneNumber = new FormControl("", [Validators.required]);
  licenseNumber = new FormControl("", [Validators.required]);
  licenseIssue = new FormControl("", [Validators.required]);
  licenseClass = new FormControl("", [Validators.required]);
  birthDate = new FormControl("", [Validators.required]);
  licenseFront = new FormControl("", [Validators.required]);
  licenseBack = new FormControl("", [Validators.required]);
  ORimage = new FormControl("", [Validators.required]);
  ORnumber = new FormControl("", [Validators.required]);
  CRimage = new FormControl("", [Validators.required]);
  CRnumber = new FormControl("", [Validators.required]);
  type = new FormControl("", [Validators.required]);
  model = new FormControl("", [Validators.required]);
  color = new FormControl("", [Validators.required]);
  plateNumber = new FormControl("", [Validators.required]);

  canAdd = false;
  errors: any;
  fileName = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private riderQuery: RiderQuery,
    private authUserQuery: AuthUserQuery,
    private riderService: RiderService,
    public popupService: PopUpService,
    public api: ApiService
  ) {
    this.email = new FormControl("", [Validators.required, Validators.email]);

    this.license = this.fb.group({
      front: this.licenseFront,
      back: this.licenseBack,
      number: this.licenseNumber,
      class: this.licenseClass,
      issuedDate: this.licenseIssue,
    });

    this.or = this.fb.group({ image: this.ORimage, number: this.ORnumber });
    this.cr = this.fb.group({ image: this.CRimage, number: this.CRnumber });

    this.vehicle = this.fb.group({
      type: this.type,
      model: this.model,
      color: this.color,
      number: this.plateNumber,
    });

    this.form = this.fb.group({
      address: this.address,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthDate: this.birthDate,
      license: this.license,
      or: this.or,
      cr: this.cr,
      vehicle: this.vehicle,
    });

    this.riderQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }

  ngOnInit(): void {}

  fieldInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  removeMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }

  field(name: string) {
    return this.form.controls[name];
  }

  async registerRider(form: FormGroup) {
    await this.riderService.create({
      address: this.form.value.address,
      license: {
        front: this.images[0],
        back: this.images[1],
        number: this.form.value.license.number,
        class: this.form.value.license.class,
        issuedDate: this.form.value.license.issuedDate,
      },
      or: {
        image: this.images[2],
        number: this.form.value.or.number,
      },
      cr: {
        image: this.images[3],
        number: this.form.value.cr.number,
      },
      vehicle: this.form.value.vehicle,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      birthdate: this.form.value.birthDate,
    });
    this.isOpen = true;

    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  redirect() {
    this.router.navigate(["home"]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
    }
  }

  onFront(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    this.api.postFile("uploads", formData).then((e: any) => {
      this.images[0] = e.data[0]["image"];
    });
  }

  onBack(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    this.api.postFile("uploads", formData).then((e: any) => {
      this.images[1] = e.data[0]["image"];
    });
  }

  onCR(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    this.api.postFile("uploads", formData).then((e: any) => {
      this.images[2] = e.data[0]["image"];
    });
  }

  onOR(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    this.api.postFile("uploads", formData).then((e: any) => {
      this.images[3] = e.data[0]["image"];
    });
  }
}
