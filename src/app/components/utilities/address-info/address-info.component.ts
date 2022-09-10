import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "@app/services";

@Component({
  selector: "address-info",
  templateUrl: "./address-info.component.html",
  styleUrls: ["./address-info.component.scss"],
})
export class AddressInfoComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() title: string = "";
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  form: FormGroup;
  name = new FormControl("", [Validators.required]);
  number = new FormControl("", this.validator.phoneNumber());
  description = new FormControl("", [Validators.required]);

  constructor(private fb: FormBuilder, private validator: ValidatorService) {
    this.form = this.fb.group({
      name: this.name,
      number: this.number,
      description: this.description,
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.save.emit(this.form.value);
    this.form.reset();
  }

  onCancel() {
    this.close.emit();
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return charCode > 31 && (charCode < 48 || charCode > 57) ? false : true;
  }
}
