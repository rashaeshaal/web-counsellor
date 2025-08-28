import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/user-list', title: 'User List',  icon:'users_circle-08', class: '' },
    { path: '/counsellor-user-management', title: 'counsellor-management',  icon:'users_circle-08', class: '' },
    { path: 'booking-payment-details', title: 'booking-payment-details',  icon:'files_paper', class: '' },
    { path: 'call-details', title: 'call-details',  icon:'ui-2_chat-round', class: '' },
    { path: 'payout-admin', title: 'payout-admin', icon: 'design_app', class: ''},
    { path: 'payment-settings', title: 'payment-settings', icon: 'ui-1_settings-gear-63', class: ''},
    { path: 'problem-selection', title: 'problem-selection', icon: 'ui-1_settings-gear-63', class: ''}


  

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
