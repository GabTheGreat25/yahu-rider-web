import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ShippersComponent } from "./shippers.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ShippersListComponent } from "./shippers-list/shippers-list.component";
import { ShippersAddComponent } from "./shippers-add/shippers-add.component";
import { ShippersEditComponent } from "./shippers-edit/shippers-edit.component";
import { ShippersDetailComponent } from "./shippers-detail/shippers-detail.component";
import { CustomFormModule } from "../../custom-form/custom-form.module";

const routes: Routes = [
  {
    path: "",
    component: ShippersComponent,
    children: [
      { path: "", component: ShippersListComponent },
      { path: "add", component: ShippersAddComponent },
      { path: ":id", component: ShippersDetailComponent },
      { path: "edit/:id", component: ShippersEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [ShippersListComponent, ShippersAddComponent, ShippersEditComponent, ShippersDetailComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), ReactiveFormsModule, CustomFormModule],
})
export class ShippersModule {}
