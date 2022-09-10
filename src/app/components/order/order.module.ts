import { OrderComponent } from "./order.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesModule } from "../utilities/utilities.module";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { OrderTypeComponent } from "./order-type/order-type.component";
import { OrderAddressComponent } from "./order-address/order-address.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";

const routes: Routes = [
  {
    path: "",
    component: OrderComponent,
    children: [
      {
        path: "type",
        component: OrderTypeComponent,
      },
      {
        path: "",
        component: OrderAddressComponent,
      },
      {
        path: "history",
        component: OrderHistoryComponent,
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
  declarations: [OrderComponent, OrderTypeComponent, OrderAddressComponent, OrderHistoryComponent],
  imports: [GooglePlaceModule, CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, UtilitiesModule],
})
export class OrderModule {}
