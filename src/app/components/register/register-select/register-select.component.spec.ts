import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterSelectComponent } from "./register-select.component";

describe("RegisterSelectComponent", () => {
  let component: RegisterSelectComponent;
  let fixture: ComponentFixture<RegisterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
