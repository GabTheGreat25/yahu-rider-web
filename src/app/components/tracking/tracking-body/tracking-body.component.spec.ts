import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingBodyComponent } from './tracking-body.component';

describe('TrackingBodyComponent', () => {
  let component: TrackingBodyComponent;
  let fixture: ComponentFixture<TrackingBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
