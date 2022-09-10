import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShippersDetailComponent } from "./shippers-detail.component";

describe("ShippersDetailComponent", () => {
  let component: ShippersDetailComponent;
  let fixture: ComponentFixture<ShippersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippersDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
