import { Component, forwardRef, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AccountAddressForm } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
@Component({
  selector: "account-address-form",
  templateUrl: "./account-address-form.component.html",
  styleUrls: ["./account-address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountAddressFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccountAddressFormComponent),
      multi: true,
    },
  ],
})
export class AccountAddressFormComponent implements OnDestroy, ControlValueAccessor {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder, private validator: ValidatorService) {
    this.form = this.fb.group({
      house: [""],
      building: [""],
      number: [""],
      street: [""],
      barangay: [""],
      municipality: [""],
      city: [""],
      province: [""],
      postalCode: ["", [Validators.required, Validators.min(400), Validators.max(10000)]],
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  fieldInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  field(name: string) {
    return this.form.controls[name];
  }

  get value(): AccountAddressForm {
    return this.form.value;
  }

  set value(value: AccountAddressForm) {
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
