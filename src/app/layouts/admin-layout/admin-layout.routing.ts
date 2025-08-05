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
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';  


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'user-list',      component: UserListComponent },
    { path: 'counsellor-list', component: CounsellorListComponent },
    { path: 'counsellor-detail/:id', component: CounsellorDetailComponent },
    { path: 'counsellor-user-management', component: CounsellorUserManagementComponent }
];
