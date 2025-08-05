
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AuthLayoutComponent } from './auth-layout.component';
import { ComponentsModule } from '../../components/components.module';
import { LoginPageComponent } from '../../register/login-page/login-page.component';
import { RegisterPageComponent } from '../../register/register-page/register-page.component';

import { AuthService } from '../../register/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    RouterModule,
  ],
  providers: [AuthService],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent
  ]
})

export class AuthLayoutModule { }
