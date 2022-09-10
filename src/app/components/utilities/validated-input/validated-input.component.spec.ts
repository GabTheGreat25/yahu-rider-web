import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedInputComponent } from './validated-input.component';

describe('ValidatedInputComponent', () => {
  let component: ValidatedInputComponent;
  let fixture: ComponentFixture<ValidatedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
