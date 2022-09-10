import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IResource } from "src/app/interfaces";
import { ValidatorService } from "src/app/services";
import { AuthUserQuery, BillingQuery, BillingService } from "src/app/states";
@UntilDestroy()
@Component({
  selector: "app-billing-add",
  templateUrl: "./billing-add.component.html",
  styleUrls: ["./billing-add.component.scss"],
})
export class BillingAddComponent implements OnInit {
  form = this.fb.group({
    date: ["", [Validators.required]],
    shipperaccNum: ["", [Validators.required]],
    shipperTitle: ["", [Validators.required]],
    shipperFirstName: ["", [Validators.required]],
    shipperSurname: ["", [Validators.required]],
    shipperCompany: ["", [Validators.required]],
    shipperPhoneNumber: ["", [Validators.required, this.validator.phoneNumber]],
    shipperMobileNumber: ["", [Validators.required, this.validator.mobile]],
    shipperEmail: ["", [Validators.required]],
    shipperHouse: ["", [Validators.required]],
    shipperBuilding: ["", [Validators.required]],
    shipperNumber: ["", [Validators.required]],
    shipperStreet: ["", [Validators.required]],
    shipperCity: ["", [Validators.required]],
    shipperBarangay: ["", [Validators.required]],
    shipperMunicipality: ["", [Validators.required]],
    shipperProvince: ["", [Validators.required]],
    shipperPostalCode: ["", [Validators.required, this.validator.number, Validators.min(400), Validators.max(10000)]],
    shipperPickup: ["", [Validators.required]],
    consigneeaccNum: ["", [Validators.required]],
    consigneeTitle: ["", [Validators.required]],
    consigneeFirstName: ["", [Validators.required]],
    consigneeSurname: ["", [Validators.required]],
    consigneeCompany: ["", [Validators.required]],
    consigneePhoneNumber: ["", [Validators.required, this.validator.phoneNumber]],
    consigneeMobileNumber: ["", [Validators.required, this.validator.mobile]],
    consigneeEmail: ["", [Validators.required]],
    consigneeHouse: ["", [Validators.required]],
    consigneeBuilding: ["", [Validators.required]],
    consigneeNumber: ["", [Validators.required]],
    consigneeStreet: ["", [Validators.required]],
    consigneeCity: ["", [Validators.required]],
    consigneeBarangay: ["", [Validators.required]],
    consigneeMunicipality: ["", [Validators.required]],
    consigneeProvince: ["", [Validators.required]],
    consigneePostalCode: ["", [Validators.required, this.validator.number, Validators.min(400), Validators.max(10000)]],
    consigneeDeliver: ["", [Validators.required]],
    description: ["", [Validators.required]],
    value: ["", [Validators.required, this.validator.number]],
    origin: ["", [Validators.required]],
    destination: ["", [Validators.required]],
    packageType: ["", [Validators.required]],
    weight: ["", [Validators.required, this.validator.number]],
    quantity: ["", [Validators.required, this.validator.number]],
    length: ["", [Validators.required, this.validator.number]],
    width: ["", [Validators.required, this.validator.number]],
    height: ["", [Validators.required, this.validator.number]],
    service: ["", [Validators.required]],
    commodity: ["", [Validators.required]],
    instruction: ["", [Validators.required]],
    clientRef: ["", [Validators.required]],
    acceptanceType: ["", [Validators.required]],
    acceptanceAccNum: ["", [Validators.required]],
    paymentType: ["", [Validators.required]],
    paymentAccNum: ["", [Validators.required]],
    sender: ["", [Validators.required]],
    recipient: ["", [Validators.required]],
    document: [false],
  });
  errors: any;
  permission!: IResource[];
  canAdd = this.authUserQuery.hasPermissions("Billing", "add");

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService,
    private billingQuery: BillingQuery,
    private router: Router,
    private authUserQuery: AuthUserQuery,
    private validator: ValidatorService
  ) {
    this.billingQuery.errors$.pipe(untilDestroyed(this)).subscribe((error) => (this.errors = error));
  }
  ngOnInit(): void {
    this.canAdd ? null : this.router.navigate(["/dashboard"]);
  }

  get date(): AbstractControl {
    return this.form.controls["date"];
  }

  get shipperaccNum(): AbstractControl {
    return this.form.controls["shipperaccNum"];
  }

  get shipperTitle(): AbstractControl {
    return this.form.controls["shipperTitle"];
  }

  get shipperFirstName(): AbstractControl {
    return this.form.controls["shipperFirstName"];
  }

  get shipperSurname(): AbstractControl {
    return this.form.controls["shipperSurname"];
  }

  get shipperCompany(): AbstractControl {
    return this.form.controls["shipperCompany"];
  }

  get shipperPhoneNumber(): AbstractControl {
    return this.form.controls["shipperPhoneNumber"];
  }

  get shipperMobileNumber(): AbstractControl {
    return this.form.controls["shipperMobileNumber"];
  }

  get shipperEmail(): AbstractControl {
    return this.form.controls["shipperEmail"];
  }

  get shipperHouse(): AbstractControl {
    return this.form.controls["shipperHouse"];
  }

  get shipperBuilding(): AbstractControl {
    return this.form.controls["shipperBuilding"];
  }

  get shipperNumber(): AbstractControl {
    return this.form.controls["shipperNumber"];
  }

  get shipperStreet(): AbstractControl {
    return this.form.controls["shipperStreet"];
  }

  get shipperCity(): AbstractControl {
    return this.form.controls["shipperCity"];
  }

  get shipperBarangay(): AbstractControl {
    return this.form.controls["shipperBarangay"];
  }

  get shipperMunicipality(): AbstractControl {
    return this.form.controls["shipperMunicipality"];
  }

  get shipperProvince(): AbstractControl {
    return this.form.controls["shipperProvince"];
  }

  get shipperPostalCode(): AbstractControl {
    return this.form.controls["shipperPostalCode"];
  }

  get shipperPickup(): AbstractControl {
    return this.form.controls["shipperPickup"];
  }

  get consigneeaccNum(): AbstractControl {
    return this.form.controls["consigneeaccNum"];
  }

  get consigneeTitle(): AbstractControl {
    return this.form.controls["consigneeTitle"];
  }

  get consigneeFirstName(): AbstractControl {
    return this.form.controls["consigneeFirstName"];
  }

  get consigneeSurname(): AbstractControl {
    return this.form.controls["consigneeSurname"];
  }

  get consigneeCompany(): AbstractControl {
    return this.form.controls["consigneeCompany"];
  }

  get consigneePhoneNumber(): AbstractControl {
    return this.form.controls["consigneePhoneNumber"];
  }

  get consigneeMobileNumber(): AbstractControl {
    return this.form.controls["consigneeMobileNumber"];
  }

  get consigneeEmail(): AbstractControl {
    return this.form.controls["consigneeEmail"];
  }

  get consigneeHouse(): AbstractControl {
    return this.form.controls["consigneeHouse"];
  }

  get consigneeBuilding(): AbstractControl {
    return this.form.controls["consigneeBuilding"];
  }

  get consigneeNumber(): AbstractControl {
    return this.form.controls["consigneeNumber"];
  }

  get consigneeStreet(): AbstractControl {
    return this.form.controls["consigneeStreet"];
  }

  get consigneeCity(): AbstractControl {
    return this.form.controls["consigneeCity"];
  }

  get consigneeBarangay(): AbstractControl {
    return this.form.controls["consigneeBarangay"];
  }

  get consigneeMunicipality(): AbstractControl {
    return this.form.controls["consigneeMunicipality"];
  }

  get consigneeProvince(): AbstractControl {
    return this.form.controls["consigneeProvince"];
  }

  get consigneePostalCode(): AbstractControl {
    return this.form.controls["consigneePostalCode"];
  }

  get consigneeDeliver(): AbstractControl {
    return this.form.controls["consigneeDeliver"];
  }

  get destination(): AbstractControl {
    return this.form.controls["destination"];
  }

  get value(): AbstractControl {
    return this.form.controls["value"];
  }

  get origin(): AbstractControl {
    return this.form.controls["origin"];
  }

  get description(): AbstractControl {
    return this.form.controls["description"];
  }

  get packageType(): AbstractControl {
    return this.form.controls["packageType"];
  }

  get weight(): AbstractControl {
    return this.form.controls["weight"];
  }

  get quantity(): AbstractControl {
    return this.form.controls["quantity"];
  }

  get length(): AbstractControl {
    return this.form.controls["length"];
  }

  get width(): AbstractControl {
    return this.form.controls["width"];
  }

  get height(): AbstractControl {
    return this.form.controls["height"];
  }

  get service(): AbstractControl {
    return this.form.controls["service"];
  }

  get commodity(): AbstractControl {
    return this.form.controls["commodity"];
  }

  get instruction(): AbstractControl {
    return this.form.controls["instruction"];
  }

  get clientRef(): AbstractControl {
    return this.form.controls["clientRef"];
  }

  get acceptanceType(): AbstractControl {
    return this.form.controls["acceptanceType"];
  }

  get acceptanceAccNum(): AbstractControl {
    return this.form.controls["acceptanceAccNum"];
  }

  get paymentType(): AbstractControl {
    return this.form.controls["paymentType"];
  }

  get paymentAccNum(): AbstractControl {
    return this.form.controls["paymentAccNum"];
  }

  get sender(): AbstractControl {
    return this.form.controls["sender"];
  }

  get recipient(): AbstractControl {
    return this.form.controls["recipient"];
  }

  get dateInvalid(): boolean {
    return this.date.touched && this.date.invalid;
  }

  get shipperaccNumInvalid(): boolean {
    return this.shipperaccNum.touched && this.shipperaccNum.invalid;
  }

  get shipperTitleInvalid(): boolean {
    return this.shipperTitle.touched && this.shipperTitle.invalid;
  }

  get shipperFirstNameInvalid(): boolean {
    return this.shipperFirstName.touched && this.shipperFirstName.invalid;
  }

  get shipperSurnameInvalid(): boolean {
    return this.shipperSurname.touched && this.shipperSurname.invalid;
  }

  get shipperCompanyInvalid(): boolean {
    return this.shipperCompany.touched && this.shipperCompany.invalid;
  }

  get shipperPhoneNumberInvalid(): boolean {
    return this.shipperPhoneNumber.touched && this.shipperPhoneNumber.invalid;
  }

  get shipperMobileNumberInvalid(): boolean {
    return this.shipperMobileNumber.touched && this.shipperMobileNumber.invalid;
  }

  get shipperEmailInvalid(): boolean {
    return this.shipperEmail.touched && this.shipperEmail.invalid;
  }

  get shipperHouseInvalid(): boolean {
    return this.shipperHouse.touched && this.shipperHouse.invalid;
  }

  get shipperBuildingInvalid(): boolean {
    return this.shipperBuilding.touched && this.shipperBuilding.invalid;
  }

  get shipperNumberInvalid(): boolean {
    return this.shipperNumber.touched && this.shipperNumber.invalid;
  }

  get shipperStreetInvalid(): boolean {
    return this.shipperStreet.touched && this.shipperStreet.invalid;
  }

  get shipperCityInvalid(): boolean {
    return this.shipperCity.touched && this.shipperCity.invalid;
  }

  get shipperBarangayInvalid(): boolean {
    return this.shipperBarangay.touched && this.shipperBarangay.invalid;
  }

  get shipperMunicipalityInvalid(): boolean {
    return this.shipperMunicipality.touched && this.shipperMunicipality.invalid;
  }

  get shipperProvinceInvalid(): boolean {
    return this.shipperProvince.touched && this.shipperProvince.invalid;
  }

  get shipperPostalCodeInvalid(): boolean {
    return this.shipperPostalCode.touched && this.shipperPostalCode.invalid;
  }

  get shipperPickupInvalid(): boolean {
    return this.shipperPickup.touched && this.shipperPickup.invalid;
  }

  get consigneeaccNumInvalid(): boolean {
    return this.consigneeaccNum.touched && this.consigneeaccNum.invalid;
  }

  get consigneeTitleInvalid(): boolean {
    return this.consigneeTitle.touched && this.consigneeTitle.invalid;
  }

  get consigneeFirstNameInvalid(): boolean {
    return this.consigneeFirstName.touched && this.consigneeFirstName.invalid;
  }

  get consigneeSurnameInvalid(): boolean {
    return this.consigneeSurname.touched && this.consigneeSurname.invalid;
  }

  get consigneeCompanyInvalid(): boolean {
    return this.consigneeCompany.touched && this.consigneeCompany.invalid;
  }

  get consigneePhoneNumberInvalid(): boolean {
    return this.consigneePhoneNumber.touched && this.consigneePhoneNumber.invalid;
  }

  get consigneeMobileNumberInvalid(): boolean {
    return this.consigneeMobileNumber.touched && this.consigneeMobileNumber.invalid;
  }

  get consigneeEmailInvalid(): boolean {
    return this.consigneeEmail.touched && this.consigneeEmail.invalid;
  }

  get consigneeHouseInvalid(): boolean {
    return this.consigneeHouse.touched && this.consigneeHouse.invalid;
  }

  get consigneeBuildingInvalid(): boolean {
    return this.consigneeBuilding.touched && this.consigneeBuilding.invalid;
  }

  get consigneeNumberInvalid(): boolean {
    return this.consigneeNumber.touched && this.consigneeNumber.invalid;
  }

  get consigneeStreetInvalid(): boolean {
    return this.consigneeStreet.touched && this.consigneeStreet.invalid;
  }

  get consigneeCityInvalid(): boolean {
    return this.consigneeCity.touched && this.consigneeCity.invalid;
  }

  get consigneeBarangayInvalid(): boolean {
    return this.consigneeBarangay.touched && this.consigneeBarangay.invalid;
  }

  get consigneeMunicipalityInvalid(): boolean {
    return this.consigneeMunicipality.touched && this.consigneeMunicipality.invalid;
  }

  get consigneeProvinceInvalid(): boolean {
    return this.consigneeProvince.touched && this.consigneeProvince.invalid;
  }

  get consigneePostalCodeInvalid(): boolean {
    return this.consigneePostalCode.touched && this.consigneePostalCode.invalid;
  }

  get consigneeDeliverInvalid(): boolean {
    return this.consigneeDeliver.touched && this.consigneeDeliver.invalid;
  }

  get originInvalid(): boolean {
    return this.origin.touched && this.origin.invalid;
  }

  get descriptionInvalid(): boolean {
    return this.description.touched && this.description.invalid;
  }

  get valueInvalid(): boolean {
    return this.value.touched && this.value.invalid;
  }

  get destinationInvalid(): boolean {
    return this.destination.touched && this.destination.invalid;
  }

  get packageTypeInvalid(): boolean {
    return this.packageType.touched && this.packageType.invalid;
  }

  get weightInvalid(): boolean {
    return this.weight.touched && this.weight.invalid;
  }

  get quantityInvalid(): boolean {
    return this.quantity.touched && this.quantity.invalid;
  }

  get lengthInvalid(): boolean {
    return this.length.touched && this.length.invalid;
  }

  get widthInvalid(): boolean {
    return this.width.touched && this.width.invalid;
  }

  get heightInvalid(): boolean {
    return this.height.touched && this.height.invalid;
  }

  get serviceInvalid(): boolean {
    return this.service.touched && this.service.invalid;
  }

  get commodityInvalid(): boolean {
    return this.commodity.touched && this.commodity.invalid;
  }

  get instructionInvalid(): boolean {
    return this.instruction.touched && this.instruction.invalid;
  }

  get clientRefInvalid(): boolean {
    return this.clientRef.touched && this.clientRef.invalid;
  }

  get acceptanceTypeInvalid(): boolean {
    return this.acceptanceType.touched && this.acceptanceType.invalid;
  }

  get acceptanceAccNumInvalid(): boolean {
    return this.acceptanceAccNum.touched && this.acceptanceAccNum.invalid;
  }

  get paymentTypeInvalid(): boolean {
    return this.paymentType.touched && this.paymentType.invalid;
  }

  get paymentAccNumInvalid(): boolean {
    return this.paymentAccNum.touched && this.paymentAccNum.invalid;
  }

  get senderInvalid(): boolean {
    return this.sender.touched && this.sender.invalid;
  }

  get recipientInvalid(): boolean {
    return this.recipient.touched && this.recipient.invalid;
  }
  async addBilling(form: FormGroup) {
    const { date, weight, quantity, length, width, height, ...rest } = form.value;
    let newDate = new Date(date);
    let requestData = {
      month: newDate.getMonth(),
      day: newDate.getDay(),
      year: newDate.getFullYear(),
      shipper: {
        accNum: rest.shipperaccNum,
        title: rest.shipperTitle,
        firstName: rest.shipperFirstName,
        surname: rest.shipperSurname,
        company: rest.shipperCompany,
        phoneNumber: rest.shipperPhoneNumber,
        mobileNumber: rest.shipperMobileNumber,
        email: rest.shipperEmail,
        house: rest.shipperHouse,
        building: rest.shipperBuilding,
        number: rest.shipperNumber,
        street: rest.shipperStreet,
        city: rest.shipperCity,
        barangay: rest.shipperBarangay,
        municipality: rest.shipperMunicipality,
        province: rest.shipperProvince,
        postalCode: Number(rest.shipperPostalCode),
        pickup: rest.shipperPickup,
      },
      consignee: {
        accNum: rest.consigneeaccNum,
        title: rest.consigneeTitle,
        firstName: rest.consigneeFirstName,
        surname: rest.consigneeSurname,
        company: rest.consigneeCompany,
        phoneNumber: rest.consigneePhoneNumber,
        mobileNumber: rest.consigneeMobileNumber,
        email: rest.consigneeEmail,
        house: rest.consigneeHouse,
        building: rest.consigneeBuilding,
        number: rest.consigneeNumber,
        street: rest.consigneeStreet,
        city: rest.consigneeCity,
        barangay: rest.consigneeBarangay,
        municipality: rest.consigneeMunicipality,
        province: rest.consigneeProvince,
        postalCode: Number(rest.consigneePostalCode),
        delivery: rest.consigneeDeliver,
      },
      location: {
        origin: rest.origin,
        destination: rest.destination,
      },
      content: {
        document: rest.document,
        items: [
          {
            description: rest.description,
            value: Number(rest.value),
          },
        ],
      },
      packaging: {
        type: rest.packageType,
        weight: Number(weight),
        quantity: Number(quantity),
        length: Number(length),
        width: Number(width),
        height: Number(height),
      },
      service: rest.service,
      commodity: rest.commodity,
      instruction: rest.instruction,
      clientRef: rest.clientRef,
      acceptance: {
        type: rest.acceptanceType,
        accNum: rest.acceptanceAccNum,
      },
      payment: {
        type: rest.paymentType,
        accNum: rest.paymentAccNum,
      },
      signature: {
        sender: rest.sender,
        recipient: rest.recipient,
      },
    };

    await this.billingService.create(requestData);
    if (!this.errors) this.router.navigate(["dashboard/billings"]);
    this.form.setErrors(this.errors);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }
}
