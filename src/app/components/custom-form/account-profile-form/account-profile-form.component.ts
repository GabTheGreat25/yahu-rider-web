import { Component, forwardRef, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ValidatorService } from "src/app/services";
import { AccountProfileForm } from "src/app/interfaces";

@Component({
  selector: "account-profile-form",
  templateUrl: "./account-profile-form.component.html",
  styleUrls: ["./account-profile-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountProfileFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccountProfileFormComponent),
      multi: true,
    },
  ],
})
export class AccountProfileFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  showErrorMessage = false;

  firstName = new FormControl("", [Validators.required]);
  surname = new FormControl("", [Validators.required]);
  title = new FormControl("", [Validators.required]);
  phoneNumber = new FormControl();
  mobileNumber = new FormControl();
  email = new FormControl();
  company = new FormControl("", [Validators.required]);
  accNum = new FormControl("", [Validators.required]);

  constructor(private fb: FormBuilder, private validator: ValidatorService) {
    this.phoneNumber = new FormControl("", [Validators.required, this.validator.phone]);
    this.mobileNumber = new FormControl("", [Validators.required, this.validator.mobile]);
    this.email = new FormControl("", [Validators.required, this.validator.email]);
    this.form = this.fb.group({
      firstName: this.firstName,
      surname: this.surname,
      title: this.title,
      company: this.company,
      accNum: this.accNum,
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

  removeMessage() {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }

  field(name: string) {
    return this.form.controls[name];
  }

  set value(value: AccountProfileForm) {
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
    return this.form.valid ? null : { profile: { valid: false } };
  }
}
