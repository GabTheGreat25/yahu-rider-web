import { Component, forwardRef, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  Validators,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { ParcelAddressForm } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";

@Component({
  selector: "parcel-address-form",
  templateUrl: "./parcel-address-form.component.html",
  styleUrls: ["./parcel-address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelAddressFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelAddressFormComponent),
      multi: true,
    },
  ],
})
export class ParcelAddressFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  barangays: string[] = [];
  regionss: string[] = [];
  cities: string[] = [];
  provinces: string[] = [];
  showErrorMessage = false;
  street = new FormControl("", [Validators.required]);
  building = new FormControl("", [Validators.required]);
  description = new FormControl("", [Validators.required]);
  region = new FormControl("", [Validators.required]);
  barangay = new FormControl("", [Validators.required]);
  city = new FormControl("", [Validators.required]);
  province = new FormControl("", [Validators.required]);
  zipCode = new FormControl("", [Validators.required, Validators.min(400), Validators.max(10000)]);
  lat = new FormControl("", [Validators.required]);
  lng = new FormControl("", [Validators.required]);

  constructor(private fb: FormBuilder, private validator: ValidatorService) {
    this.form = this.fb.group({
      street: this.street,
      building: this.building,
      description: this.description,
      region: this.region,
      barangay: this.barangay,
      city: this.city,
      province: this.province,
      zipCode: this.zipCode,
      lat: this.lat,
      lng: this.lng,
    });
    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get value(): ParcelAddressForm {
    return this.form.value;
  }

  fieldInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  removeMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }

  set value(value: ParcelAddressForm) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { address: { valid: false } };
  }
}
