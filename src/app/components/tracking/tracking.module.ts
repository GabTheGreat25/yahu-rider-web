import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TrackingComponent } from "./tracking.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesModule } from "../utilities/utilities.module";
import { TrackingItemsComponent } from "./tracking-items/tracking-items.component";
import { TrackingHeaderComponent } from "./tracking-header/tracking-header.component";
import { TrackingBodyComponent } from "./tracking-body/tracking-body.component";

const routes: Routes = [
  {
    path: "",
    component: TrackingComponent,
    children: [
      {
        path: ":id",
        component: TrackingItemsComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [TrackingComponent, TrackingItemsComponent, TrackingHeaderComponent, TrackingBodyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, UtilitiesModule],
})
export class TrackingModule {}
