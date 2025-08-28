import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProblemManagementComponent } from './problem-management/problem-management.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'admin-login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  },
  {
    path: 'problem-management',
    component: ProblemManagementComponent
  }]},
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(x=>x.AuthLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'admin-login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
