import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { DeliveriesComponent } from "./deliveries/deliveries.component";
import { HubsComponent } from "./hubs/hubs.component";
import { ParcelsComponent } from "./parcels/parcels.component";
import { UtilitiesModule } from "../utilities/utilities.module";
import { BillingsComponent } from "./billings/billings.component";
import { ConsigneesComponent } from "./consignees/consignees.component";
import { ShippersComponent } from "./shippers/shippers.component";
import { ItemsComponent } from "./items/items.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { RidersComponent } from "./riders/riders.component";
import { ResourcesComponent } from "./resources/resources.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "users",
        loadChildren: () => import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "hubs",
        loadChildren: () => import("./hubs/hubs.module").then((m) => m.HubsModule),
      },
      {
        path: "deliveries",
        loadChildren: () => import("./deliveries/deliveries.module").then((m) => m.DeliveriesModule),
      },
      {
        path: "parcels",
        loadChildren: () => import("./parcels/parcels.module").then((m) => m.ParcelsModule),
      },
      {
        path: "billings",
        loadChildren: () => import("./billings/billings.module").then((m) => m.BillingsModule),
      },
      {
        path: "consignees",
        loadChildren: () => import("./consignees/consignees.module").then((m) => m.ConsigneesModule),
      },
      {
        path: "shippers",
        loadChildren: () => import("./shippers/shippers.module").then((m) => m.ShippersModule),
      },
      {
        path: "items",
        loadChildren: () => import("./items/items.module").then((m) => m.ItemsModule),
      },
      {
        path: "adresses",
        loadChildren: () => import("./addresses/addresses.module").then((m) => m.AddressesModule),
      },
      {
        path: "riders",
        loadChildren: () => import("./riders/riders.module").then((m) => m.RidersModule),
      },
      {
        path: "resources",
        loadChildren: () => import("./resources/resources.module").then((m) => m.ResourcesModule),
      },
      { path: "**", redirectTo: "deliveries", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    DeliveriesComponent,
    HubsComponent,
    ParcelsComponent,
    BillingsComponent,
    ConsigneesComponent,
    ShippersComponent,
    ItemsComponent,
    AddressesComponent,
    RidersComponent,
    ResourcesComponent,
  ],

  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
