import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { HubsComponent } from "./hubs.component";
import { HubEditComponent } from "./hub-edit/hub-edit.component";
import { HubAddComponent } from "./hub-add/hub-add.component";
import { HubListComponent } from "./hub-list/hub-list.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: HubsComponent,
    children: [
      { path: "", component: HubListComponent },
      { path: "add", component: HubAddComponent },
      { path: "edit/:id", component: HubEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [HubEditComponent, HubAddComponent, HubListComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class HubsModule {}
