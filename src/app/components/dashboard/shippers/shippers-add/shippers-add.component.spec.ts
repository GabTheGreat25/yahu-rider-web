import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShippersAddComponent } from "./shippers-add.component";

describe("ShippersAddComponent", () => {
  let component: ShippersAddComponent;
  let fixture: ComponentFixture<ShippersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippersAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
