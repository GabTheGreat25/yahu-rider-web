import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HubAddComponent } from "./hub-add.component";

describe("HubAddComponent", () => {
  let component: HubAddComponent;
  let fixture: ComponentFixture<HubAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
