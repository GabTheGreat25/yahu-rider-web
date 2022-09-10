import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IAddress, OrdersService } from "@app/states/orders";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Options } from "ngx-google-places-autocomplete/objects/options/options";
import { environment as env } from "../../../../environments/environment";

type FieldType = "pickUp" | "dropOff";

interface IAddressField {
  type: FieldType;
  placeholder: string;
  title: string;
}

@UntilDestroy()
@Component({
  selector: "app-order-address",
  templateUrl: "./order-address.component.html",
  styleUrls: ["./order-address.component.scss"],
})
export class OrderAddressComponent implements OnInit {
  selected = 0;
  projectName = env.PROJECT_NAME;
  logo = `${env.CDN}icons/png/logo.png`;
  rider = `${env.CDN}images/png/order-rider.png`;
  types = ["Fast", "Same Day", "Scheduled"];

  center: google.maps.LatLngLiteral = { lat: 14.570267, lng: 121.044966 };
  dropOff$ = this.orders.dropOff$.pipe(untilDestroyed(this));
  pickUp$ = this.orders.pickUp$.pipe(untilDestroyed(this));
  order$ = this.orders.order$.pipe(untilDestroyed(this));
  showSummary: boolean;

  form: FormGroup;

  pickUp: IAddress;
  dropOff: IAddress;
  showDropOff: boolean;
  showPickUp: boolean;
  showPickUpForm: boolean;
  showDropOffForm: boolean;

  pickUpField = new FormControl("", [Validators.required]);
  dropOffField = new FormControl("", [Validators.required]);
  fields: IAddressField[];
  autoCompleteOptions = new Options({ componentRestrictions: { country: "ph" } });

  constructor(private router: Router, private orders: OrdersService, private fb: FormBuilder) {
    this.pickUp = {
      name: "",
      number: "",
      description: "",
      region: "",
      province: "",
      city: "",
      lng: 0,
      lat: 0,
      show: false,
    };

    this.dropOff = {
      name: "",
      number: "",
      description: "",
      province: "",
      region: "",
      city: "",
      lng: 0,
      lat: 0,
      show: false,
    };

    this.fields = [
      {
        type: "pickUp",
        placeholder: "Pick Up Location",
        title: "Pick Up Delivery Info",
      },
      {
        type: "dropOff",
        placeholder: "Drop Off Location",
        title: "Drop Off Delivery Info",
      },
    ];

    this.showSummary = false;
    this.showDropOff = false;
    this.showPickUp = false;
    this.showPickUpForm = false;
    this.showDropOffForm = false;

    this.form = this.fb.group({
      pickUpField: this.pickUpField,
      dropOffField: this.dropOffField,
    });
  }

  ngOnInit(): void {
    this.pickUp$.subscribe((e: any) => {
      if (e.name !== "" && e.number !== "") {
        this.pickUp = e;
        this.showPickUp = true;
      }

      if (e.description !== "") {
        this.pickUpField.setValue(e.description);
      }
    });

    this.dropOff$.subscribe((e: any) => {
      if (e.name !== "" && e.number !== "") {
        this.dropOff = e;
        this.showDropOff = true;
      }

      if (e.description !== "") {
        this.dropOffField.setValue(e.description);
      }
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  clear() {
    this.orders.clear();
    this.orders.loading$.subscribe((loading) => {
      if (!loading) {
        this.showPickUpForm = false;
        this.showDropOffForm = false;
        this.showPickUp = false;
        this.showDropOff = false;
        this.form.reset();
      }
    });
  }

  closeForm(type: FieldType) {
    if (type === "pickUp") this.showPickUpForm = !this.showPickUpForm;
    if (type === "dropOff") this.showDropOffForm = !this.showDropOffForm;
  }

  showForm(type: FieldType) {
    if (type === "pickUp" && !this.pickUpField.invalid) {
      this.showPickUpForm = true;
      this.showDropOffForm = false;
    }
    if (type === "dropOff" && !this.dropOffField.invalid) {
      this.showDropOffForm = true;
      this.showPickUpForm = false;
    }
  }

  isShowForm(type: FieldType): boolean {
    if (type === "pickUp") return this.showPickUpForm;
    return this.showDropOffForm;
  }

  changeAddress(event: any, type: FieldType) {
    const {
      formatted_address: description,
      geometry: { location },
      address_components: components,
    } = event;

    this.showForm(type);

    this.orders.updateAddress(type, { description, lat: location.lat(), lng: location.lng(), components });
    this.showPickUpForm = type === "pickUp";
    this.showDropOffForm = type === "dropOff";
  }

  saveInfo(event: any, type: FieldType) {
    const { name, number } = event;
    this.orders.updateAddressInfo(type, { name, number });

    if (type === "pickUp") {
      this.showPickUpForm = false;
      this.showPickUp = true;
    }
    if (type === "dropOff") {
      this.showDropOffForm = false;
      this.showDropOff = true;
    }
  }

  next() {
    this.router.navigate([this.router.url + "/type"]);
  }

  reset(type: FieldType) {
    type === "pickUp" ? this.pickUpField.reset() : this.dropOffField.reset();
  }
}
