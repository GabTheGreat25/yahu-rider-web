import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ParcelEditComponent } from "./parcel-edit.component";

describe("ParcelEditComponent", () => {
  let component: ParcelEditComponent;
  let fixture: ComponentFixture<ParcelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
