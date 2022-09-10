import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsigneesListComponent } from "./consignees-list.component";

describe("ConsigneesListComponent", () => {
  let component: ConsigneesListComponent;
  let fixture: ComponentFixture<ConsigneesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsigneesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
