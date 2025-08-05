import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorUserManagementComponent } from './counsellor-user-management.component';

describe('CounsellorUserManagementComponent', () => {
  let component: CounsellorUserManagementComponent;
  let fixture: ComponentFixture<CounsellorUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounsellorUserManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounsellorUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
