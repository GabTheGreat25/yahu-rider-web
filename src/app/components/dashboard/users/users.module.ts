import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "../../utilities/utilities.module";
import { UsersComponent } from "./users.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserListComponent } from "./user-list/user-list.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      { path: "", component: UserListComponent },
      { path: "add", component: UserAddComponent },
      { path: "edit/:id", component: UserEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  declarations: [UserEditComponent, UserAddComponent, UserListComponent],
  imports: [CommonModule, UtilitiesModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class UsersModule {}
