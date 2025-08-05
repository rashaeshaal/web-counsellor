
import { Routes } from '@angular/router';
import { LoginPageComponent } from '../../register/login-page/login-page.component';
import { RegisterPageComponent } from '../../register/register-page/register-page.component';
export const AuthLayoutRoutes: Routes = [
    { path: 'admin-login', component: LoginPageComponent },
    { path: 'admin-create', component: RegisterPageComponent },
];
