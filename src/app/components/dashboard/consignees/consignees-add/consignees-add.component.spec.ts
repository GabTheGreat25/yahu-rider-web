import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsigneesAddComponent } from "./consignees-add.component";

describe("ConsigneesAddComponent", () => {
  let component: ConsigneesAddComponent;
  let fixture: ComponentFixture<ConsigneesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsigneesAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
