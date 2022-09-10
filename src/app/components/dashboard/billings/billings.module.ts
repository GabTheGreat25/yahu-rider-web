import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { BillingsComponent } from "./billings.component";
import { BillingAddComponent } from "./billing-add/billing-add.component";
import { BillingEditComponent } from "./billing-edit/billing-edit.component";
import { BillingListComponent } from "./billing-list/billing-list.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: BillingsComponent,
    children: [
      { path: "", component: BillingListComponent },
      { path: "add", component: BillingAddComponent },
      { path: "edit/:id", component: BillingEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
@NgModule({
  declarations: [BillingEditComponent, BillingAddComponent, BillingListComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class BillingsModule {}
