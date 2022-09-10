import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../utilities/utilities.module";
import { ThankYouComponent } from "./thank-you.component";

const routes: Routes = [
  {
    path: "",
    component: ThankYouComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UtilitiesModule],
})
export class ThankYouModule {}
