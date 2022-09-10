import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComingSoonComponent } from "./coming-soon.component";
import { RouterModule } from "@angular/router";
import { UtilitiesModule } from "../utilities/utilities.module";

@NgModule({
  declarations: [ComingSoonComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: "", component: ComingSoonComponent }]), UtilitiesModule],
})
export class ComingSoonModule {}
