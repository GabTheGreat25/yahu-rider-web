import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemsComponent } from "./items.component";
import { ItemsAddComponent } from "./items-add/items-add.component";
import { ItemsEditComponent } from "./items-edit/items-edit.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemsDetailComponent } from "./items-detail/items-detail.component";
import { CustomFormModule } from "../../custom-form/custom-form.module";

const routes: Routes = [
  {
    path: "",
    component: ItemsComponent,
    children: [
      { path: "", component: ItemsListComponent },
      { path: "add", component: ItemsAddComponent },
      { path: ":id", component: ItemsDetailComponent },
      { path: "edit/:id", component: ItemsEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [ItemsListComponent, ItemsAddComponent, ItemsDetailComponent, ItemsEditComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), CustomFormModule, ReactiveFormsModule],
})
export class ItemsModule {}
