import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesModule } from "../utilities/utilities.module";
import { PersonFormComponent } from "./person-form/person-form.component";
import { AccountProfileFormComponent } from "./account-profile-form/account-profile-form.component";
import { ParcelAddressFormComponent } from "./parcel-address-form/parcel-address-form.component";
import { AccountAddressFormComponent } from "./account-address-form/account-address-form.component";

@NgModule({
  declarations: [PersonFormComponent, AccountProfileFormComponent, ParcelAddressFormComponent, AccountAddressFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UtilitiesModule],
  exports: [ParcelAddressFormComponent, PersonFormComponent, AccountProfileFormComponent, AccountAddressFormComponent],
})
export class CustomFormModule {}
