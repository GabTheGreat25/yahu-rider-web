import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilitiesModule } from "../utilities/utilities.module";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage.component";
import { AuthGuard } from "@app/guards/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UtilitiesModule],
})
export class HomepageModule {}
