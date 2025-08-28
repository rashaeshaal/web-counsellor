import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentDetailsComponent } from './booking-payment-details.component';

describe('BookingPaymentDetailsComponent', () => {
  let component: BookingPaymentDetailsComponent;
  let fixture: ComponentFixture<BookingPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPaymentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
