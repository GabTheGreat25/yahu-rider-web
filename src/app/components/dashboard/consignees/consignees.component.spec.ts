import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsigneesComponent } from "./consignees.component";

describe("ConsigneesComponent", () => {
  let component: ConsigneesComponent;
  let fixture: ComponentFixture<ConsigneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsigneesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
