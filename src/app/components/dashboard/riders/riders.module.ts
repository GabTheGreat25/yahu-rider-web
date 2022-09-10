import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RidersComponent } from "./riders.component";
import { RiderEditComponent } from "./rider-edit/rider-edit.component";
import { RiderListComponent } from "./rider-list/rider-list.component";
import { RiderDetailComponent } from "./rider-detail/rider-detail.component";
import { CustomFormModule } from "../../custom-form/custom-form.module";

const routes: Routes = [
  {
    path: "",
    component: RidersComponent,
    children: [
      { path: "", component: RiderListComponent },
      { path: ":id", component: RiderDetailComponent },
      { path: "edit/:id", component: RiderEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [RiderEditComponent, RiderListComponent, RiderDetailComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), CustomFormModule, ReactiveFormsModule],
})
export class RidersModule {}
