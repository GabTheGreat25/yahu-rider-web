import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsigneesDetailComponent } from "./consignees-detail.component";

describe("ConsigneesDetailComponent", () => {
  let component: ConsigneesDetailComponent;
  let fixture: ComponentFixture<ConsigneesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsigneesDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
