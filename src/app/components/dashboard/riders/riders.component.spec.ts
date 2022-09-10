import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersComponent } from './riders.component';

describe('RidersComponent', () => {
  let component: RidersComponent;
  let fixture: ComponentFixture<RidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
