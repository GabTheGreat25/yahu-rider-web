import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesDetailComponent } from './addresses-detail.component';

describe('AddressesDetailComponent', () => {
  let component: AddressesDetailComponent;
  let fixture: ComponentFixture<AddressesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
