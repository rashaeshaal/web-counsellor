import { CounsellorListComponent } from '../../counsellor-list/counsellor-list.component';
import { CounsellorDetailComponent } from '../../counsellor-detail/counsellor-detail.component';
import { CounsellorUserManagementComponent } from '../../counsellor-user-management/counsellor-user-management.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from '../../components/components.module';
import { BaseChartDirective } from 'ng2-charts';
import { Routes } from '@angular/router'; 
import { UserListComponent } from '../../user-list/user-list.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
 
import { BookingPaymentDetailsComponent } from '../../booking-payment-details/booking-payment-details.component';
import { CallDetailsComponent } from '../../call-details/call-details.component';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { PaymentSettingsComponent } from '../../payment-settings/payment-settings.component';
import { ProblemManagementComponent } from '../../problem-management/problem-management.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'notifications',  component: NotificationsComponent },
  
    { path: 'user-list',      component: UserListComponent },
    { path: 'counsellor-list', component: CounsellorListComponent },
    { path: 'counsellor-detail/:id', component: CounsellorDetailComponent },
    { path: 'counsellor-user-management', component: CounsellorUserManagementComponent },
    { path: 'booking-payment-details', component: BookingPaymentDetailsComponent },
    { path: 'call-details', component: CallDetailsComponent },
    { path: 'payout-admin', component: AdminPayoutComponent},
    { path: 'payment-settings', component: PaymentSettingsComponent},
    { path: 'problem-selection', component: ProblemManagementComponent}
    
    
];
