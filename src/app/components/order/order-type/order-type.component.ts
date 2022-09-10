import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IAddress, IItem, OrdersService } from "@app/states/orders";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { environment as env } from "src/environments/environment";

@UntilDestroy()
@Component({
  selector: "app-order-type",
  templateUrl: "./order-type.component.html",
  styleUrls: ["./order-type.component.scss"],
})
export class OrderTypeComponent implements OnInit {
  delivery = `${env.CDN}/images/svg/delivery/icon-delivery.svg`;
  order: any = {};
  schedule: String;
  logo = `${env.CDN}icons/png/logo.png`;
  projectName = env.PROJECT_NAME;

  selected = 0;
  types = ["Fast", "Same Day", "Scheduled"];

  dateTime: FormGroup;
  date = new FormControl("", [Validators.required]);
  time = new FormControl("", [Validators.required]);

  item: FormGroup;
  description = new FormControl(null, [Validators.required]);
  weight = new FormControl(1, [Validators.required]);

  info: any = {};
  dropOff$ = this.orders.dropOff$.pipe(untilDestroyed(this));
  pickUp$ = this.orders.pickUp$.pipe(untilDestroyed(this));
  order$ = this.orders.order$.pipe(untilDestroyed(this));
  items$ = this.orders.items$.pipe(untilDestroyed(this));

  pickUp: IAddress;
  dropOff: IAddress;
  errors: any = {};
  payment: string = "";
  paymentBy: string = "";
  fee: number;

  itemList: IItem[] = [];

  constructor(private fb: FormBuilder, private orders: OrdersService, private router: Router) {
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
      region: "",
      province: "",
      city: "",
      lng: 0,
      lat: 0,
      show: false,
    };

    this.dateTime = this.fb.group({ date: this.date, time: this.time });
    this.item = this.fb.group({ description: this.description, weight: this.weight });
    this.fee = 0;
    this.schedule = `${this.types[this.selected]}`;
  }

  ngOnInit(): void {
    this.order$.subscribe((e) => {
      const { pickUp, dropOff, items } = e;
      this.pickUp = pickUp;
      this.dropOff = dropOff;
      this.itemList = items;
      this.fee = this.getFee();
    });

    this.orders.errors$.subscribe((e) => {
      this.errors = e;
    });
  }

  saveSchedule() {
    const { date, time } = this.dateTime.value;
    if (date && time) this.schedule = `${this.types[this.selected]}: ${date}: ${time}`;
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  }

  getFee(): number {
    let fee = 30;
    const distance = this.distance(this.dropOff.lat, this.dropOff.lng, this.pickUp.lat, this.pickUp.lng);
    for (let i = 0; i < distance; i++) {
      if (i <= 5) fee += 6;
      if (i > 5) fee += 5;
    }
    return fee;
  }

  addItem() {
    const { value = 0, weight = 0, ...res } = this.item.value;

    if (res.description !== "" && res.description !== null) {
      this.orders.addItem({ ...res, value, weight: Number(weight) });
      this.orders.loading$.subscribe((loading) => {
        if (!loading) {
          this.description.reset();
          this.weight.setValue(1);
        }
      });
    } else {
      this.description.setErrors({ required: true });
      this.description.markAsDirty();
      this.description.markAsTouched();
    }
  }

  removeItem(itemIndex: number) {
    this.orders.removeItem(itemIndex);
  }

  onPaymentChange(event: any) {
    this.orders.changePayment(event.target.value);
  }

  onPaymentByChange(event: any) {
    this.orders.changePaymentBy(event.target.value);
  }

  deliver() {
    this.orders.createParcel(this.fee);
    this.orders.loading$.subscribe((loading) => {
      if (!loading) {
        this.router.navigate(["thank-you"]);
      }
    });
  }
}
