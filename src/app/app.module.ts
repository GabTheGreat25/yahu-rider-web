import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UtilitiesModule } from "./components/utilities/utilities.module";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AkitaNgRouterStoreModule } from "@datorama/akita-ng-router-store";
import { environment } from "../environments/environment";
import { akitaConfig } from "@datorama/akita";
import { AuthInterceptorProvider } from "./interceptors";
import { HttpClientModule } from "@angular/common/http";
import { AkitaStateEffects } from "./states";
import { AuthGuard } from "./guards";
import { ReactiveFormsModule } from "@angular/forms";

akitaConfig({ resettable: true });

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilitiesModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    AkitaStateEffects,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthInterceptorProvider, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
