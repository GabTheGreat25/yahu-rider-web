import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HubsComponent } from "./hubs.component";

describe("HubsComponent", () => {
  let component: HubsComponent;
  let fixture: ComponentFixture<HubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
