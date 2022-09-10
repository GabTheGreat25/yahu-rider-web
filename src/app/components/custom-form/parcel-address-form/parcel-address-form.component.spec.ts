import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ParcelAddressFormComponent } from "./parcel-address-form.component";

describe("ParcelAddressFormComponent", () => {
  let component: ParcelAddressFormComponent;
  let fixture: ComponentFixture<ParcelAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelAddressFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
