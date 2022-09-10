import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./components/login/login.module").then((m) => m.LoginModule),
    canActivate: [AuthGuard],
  },
  {
    path: "404",
    loadChildren: () => import("./components/coming-soon/coming-soon.module").then((m) => m.ComingSoonModule),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    loadChildren: () => import("./components/dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: "tracking",
    loadChildren: () => import("./components/tracking/tracking.module").then((m) => m.TrackingModule),
  },
  {
    path: "register",
    loadChildren: () => import("./components/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "order",
    loadChildren: () => import("./components/order/order.module").then((m) => m.OrderModule),
    canActivate: [AuthGuard],
  },
  {
    path: "thank-you",
    loadChildren: () => import("./components/thank-you/thank-you.module").then((m) => m.ThankYouModule),
  },
  {
    path: "",
    loadChildren: () => import("./components/homepage/homepage.module").then((m) => m.HomepageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "404",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
