import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayoutComponent } from './admin-payout.component';

describe('AdminPayoutComponent', () => {
  let component: AdminPayoutComponent;
  let fixture: ComponentFixture<AdminPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
