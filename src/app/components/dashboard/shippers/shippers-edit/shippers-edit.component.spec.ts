import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShippersEditComponent } from "./shippers-edit.component";

describe("ShippersEditComponent", () => {
  let component: ShippersEditComponent;
  let fixture: ComponentFixture<ShippersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippersEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
