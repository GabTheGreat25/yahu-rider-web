import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingItemsComponent } from './tracking-items.component';

describe('TrackingItemsComponent', () => {
  let component: TrackingItemsComponent;
  let fixture: ComponentFixture<TrackingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
