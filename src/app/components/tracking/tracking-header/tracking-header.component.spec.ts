import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingHeaderComponent } from './tracking-header.component';

describe('TrackingHeaderComponent', () => {
  let component: TrackingHeaderComponent;
  let fixture: ComponentFixture<TrackingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
