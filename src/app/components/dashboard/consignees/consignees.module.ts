import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ConsigneesComponent } from "./consignees.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ConsigneesListComponent } from "./consignees-list/consignees-list.component";
import { ConsigneesDetailComponent } from "./consignees-detail/consignees-detail.component";
import { ConsigneesAddComponent } from "./consignees-add/consignees-add.component";

import { CustomFormModule } from "../../custom-form/custom-form.module";
import { ConsigneesEditComponent } from "./consignees-edit/consignees-edit.component";

const routes: Routes = [
  {
    path: "",
    component: ConsigneesComponent,
    children: [
      { path: "", component: ConsigneesListComponent },
      { path: "add", component: ConsigneesAddComponent },
      { path: ":id", component: ConsigneesDetailComponent },
      { path: "edit/:id", component: ConsigneesEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [ConsigneesListComponent, ConsigneesDetailComponent, ConsigneesAddComponent, ConsigneesEditComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), ReactiveFormsModule, CustomFormModule],
})
export class ConsigneesModule {}
