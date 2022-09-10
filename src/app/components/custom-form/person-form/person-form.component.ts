import { Component, forwardRef, OnDestroy } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ValidatorService } from "src/app/services";
import { PersonForm } from "src/app/interfaces";

@Component({
  selector: "person-form",
  templateUrl: "./person-form.component.html",
  styleUrls: ["./person-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonFormComponent),
      multi: true,
    },
  ],
})
export class PersonFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  showErrorMessage = false;

  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  phoneNumber = new FormControl();
  email = new FormControl();

  constructor(private fb: FormBuilder, private validator: ValidatorService) {
    this.phoneNumber = new FormControl("", [Validators.required, this.validator.phoneNumber]);
    this.email = new FormControl("", [Validators.required, this.validator.email]);
    this.form = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
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

  set value(value: PersonForm) {
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
