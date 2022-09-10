import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { ParcelsComponent } from "./parcels.component";
import { ParcelListComponent } from "./parcel-list/parcel-list.component";
import { ParcelAddComponent } from "./parcel-add/parcel-add.component";
import { ParcelEditComponent } from "./parcel-edit/parcel-edit.component";
import { CustomFormModule } from "../../custom-form/custom-form.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TimeLineComponent } from "../../utilities/time-line/time-line.component";

const routes: Routes = [
  {
    path: "",
    component: ParcelsComponent,
    children: [
      { path: "", component: ParcelListComponent },
      { path: "add", component: ParcelAddComponent },
      { path: "edit/:id", component: ParcelEditComponent },
      { path: "timeline", component: TimeLineComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [ParcelEditComponent, ParcelAddComponent, ParcelListComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), CustomFormModule, ReactiveFormsModule],
})
export class ParcelsModule {}
