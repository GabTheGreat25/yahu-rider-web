import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResourcesComponent } from "./resources.component";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { ResourceEditComponent } from "./resource-edit/resource-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { CustomFormModule } from "../../custom-form/custom-form.module";
import { ResourceAddComponent } from "./resource-add/resource-add.component";

const routes: Routes = [
  {
    path: "",
    component: ResourcesComponent,
    children: [
      { path: "", component: ResourceListComponent },
      { path: "add", component: ResourceAddComponent },
      { path: "edit/:id", component: ResourceEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [ResourceListComponent, ResourceEditComponent, ResourceAddComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), CustomFormModule, ReactiveFormsModule],
})
export class ResourcesModule {}
