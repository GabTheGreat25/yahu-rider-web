import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilitiesModule } from "../utilities/utilities.module";
import { RegisterRiderComponent } from "./register-rider/register-rider.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { RegisterSelectComponent } from "./register-select/register-select.component";

const routes: Routes = [
  {
    path: "",
    component: RegisterComponent,
    children: [
      {
        path: "",
        component: RegisterSelectComponent,
      },
      {
        path: "rider",
        component: RegisterRiderComponent,
      },
      {
        path: "user",
        component: RegisterUserComponent,
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
  declarations: [RegisterComponent, RegisterRiderComponent, RegisterUserComponent, RegisterSelectComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, UtilitiesModule],
})
export class RegisterModule {}
