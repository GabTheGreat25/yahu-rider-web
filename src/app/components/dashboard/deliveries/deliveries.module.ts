import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { DeliveriesComponent } from "./deliveries.component";
import { DeliveryAddComponent } from "./delivery-add/delivery-add.component";
import { DeliveryEditComponent } from "./delivery-edit/delivery-edit.component";
import { DeliveryListComponent } from "./delivery-list/delivery-list.component";
import { DeliveryDetailComponent } from "./delivery-detail/delivery-detail.component";
import { ParcelDetailComponent } from "./parcel-detail/parcel-detail.component";

const routes: Routes = [
  {
    path: "",
    component: DeliveriesComponent,
    children: [
      { path: "", component: DeliveryListComponent },
      { path: "add", component: DeliveryAddComponent },
      { path: ":id", component: DeliveryDetailComponent },
      { path: "edit/:id", component: DeliveryEditComponent },
      { path: ":id/:parcelid", component: ParcelDetailComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [DeliveryEditComponent, DeliveryAddComponent, DeliveryListComponent, DeliveryDetailComponent, ParcelDetailComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes)],
})
export class DeliveriesModule {}
