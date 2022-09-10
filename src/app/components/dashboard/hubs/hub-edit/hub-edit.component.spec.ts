import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HubEditComponent } from "./hub-edit.component";

describe("HubEditComponent", () => {
  let component: HubEditComponent;
  let fixture: ComponentFixture<HubEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
