import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsigneesEditComponent } from "./consignees-edit.component";

describe("ConsigneesEditComponent", () => {
  let component: ConsigneesEditComponent;
  let fixture: ComponentFixture<ConsigneesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsigneesEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
