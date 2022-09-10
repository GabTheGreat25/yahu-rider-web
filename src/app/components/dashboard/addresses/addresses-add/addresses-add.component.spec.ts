import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesAddComponent } from './addresses-add.component';

describe('AddressesAddComponent', () => {
  let component: AddressesAddComponent;
  let fixture: ComponentFixture<AddressesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
