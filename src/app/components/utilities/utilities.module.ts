import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ListComponent } from "./list/list.component";
import { RouterModule } from "@angular/router";
import { ClickOutsideDirective } from "src/app/directives/click-outside/click-outside.directive";
import { ListItemComponent } from "./list-item/list-item.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { LazyBgImgDirective } from "src/app/directives/lazy-img/lazy-img.directive";
import { ValidationMsgComponent } from "./validation-msg/validation-msg.component";
import { CardComponent } from "./card/card.component";
import { CardWrapperComponent } from "./card-wrapper/card-wrapper.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { DetailComponent } from "./detail/detail.component";
import { TimeLineComponent } from "./time-line/time-line.component";
import { ValidatedInputComponent } from "./validated-input/validated-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapComponent } from "./map/map.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { RiderDetailComponent } from "./rider-detail/rider-detail.component";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { AddressComponent } from "./address/address.component";
import { AddressInfoComponent } from "./address-info/address-info.component";
import { IconComponent } from "./icon/icon.component";
import { FloatingPopupComponent } from "./floating-popup/floating-popup.component";
import { RegisterCardComponent } from "./register-card/register-card.component";
import { OrderTableComponent } from "./order-table/order-table.component";
import { QRCodeModule } from "angularx-qrcode";
import { QrCodeComponent } from "./qr-code/qr-code.component";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ListComponent,
    ClickOutsideDirective,
    ListItemComponent,
    BreadcrumbComponent,
    LazyBgImgDirective,
    ValidationMsgComponent,
    CardComponent,
    CardWrapperComponent,
    PaginationComponent,
    DetailComponent,
    TimeLineComponent,
    ValidatedInputComponent,
    RiderDetailComponent,
    MapComponent,
    PopUpComponent,
    AddressComponent,
    AddressInfoComponent,
    IconComponent,
    FloatingPopupComponent,
    RegisterCardComponent,
    OrderTableComponent,
    QrCodeComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ListComponent,
    ListItemComponent,
    BreadcrumbComponent,
    LazyBgImgDirective,
    ValidationMsgComponent,
    CardComponent,
    CardWrapperComponent,
    PaginationComponent,
    DetailComponent,
    TimeLineComponent,
    ValidatedInputComponent,
    RiderDetailComponent,
    MapComponent,
    PopUpComponent,
    AddressComponent,
    AddressInfoComponent,
    IconComponent,
    FloatingPopupComponent,
    RegisterCardComponent,
    OrderTableComponent,
    QrCodeComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, GoogleMapsModule, QRCodeModule],
})
export class UtilitiesModule {}
