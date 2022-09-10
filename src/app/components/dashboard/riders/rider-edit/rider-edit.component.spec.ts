import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderEditComponent } from './rider-edit.component';

describe('RiderEditComponent', () => {
  let component: RiderEditComponent;
  let fixture: ComponentFixture<RiderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
