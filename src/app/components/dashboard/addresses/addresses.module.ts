import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomFormModule } from "../../custom-form/custom-form.module";
import { AddressesComponent } from "./addresses.component";
import { AddressesListComponent } from "./addresses-list/addresses-list.component";
import { AddressesAddComponent } from "./addresses-add/addresses-add.component";
import { AddressesEditComponent } from "./addresses-edit/addresses-edit.component";
import { AddressesDetailComponent } from "./addresses-detail/addresses-detail.component";

const routes: Routes = [
  {
    path: "",
    component: AddressesComponent,
    children: [
      { path: "", component: AddressesListComponent },
      { path: "add", component: AddressesAddComponent },
      { path: ":id", component: AddressesDetailComponent },
      { path: "edit/:id", component: AddressesEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [AddressesListComponent, AddressesAddComponent, AddressesDetailComponent, AddressesEditComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), CustomFormModule, ReactiveFormsModule],
})
export class AddressesModule {}
