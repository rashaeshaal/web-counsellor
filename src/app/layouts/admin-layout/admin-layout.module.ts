import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { UserListComponent } from '../../user-list/user-list.component';
import { CounsellorListComponent } from '../../counsellor-list/counsellor-list.component';
import { CounsellorDetailComponent } from '../../counsellor-detail/counsellor-detail.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from '../../components/components.module';
import { BaseChartDirective } from 'ng2-charts';

import { BookingPaymentDetailsComponent } from '../../booking-payment-details/booking-payment-details.component';
import { CallDetailsComponent } from '../../call-details/call-details.component';
import { CounsellorUserManagementComponent } from '../../counsellor-user-management/counsellor-user-management.component';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component'
import { PaymentSettingsComponent } from '../../payment-settings/payment-settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    RouterModule,
    BaseChartDirective,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,

 
    NotificationsComponent,
    UserListComponent,
    CounsellorListComponent,
    CounsellorDetailComponent,
    CounsellorUserManagementComponent,
    AdminLayoutComponent,
    BookingPaymentDetailsComponent,
    CallDetailsComponent,
    AdminPayoutComponent,
    PaymentSettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule {}