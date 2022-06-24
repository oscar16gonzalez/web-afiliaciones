import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

  }
  export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Centro de Trabajo',  icon: 'dashboard', class: '' },
    { path: '/create-membership', title: 'Crear Afiliacion Aspirante',  icon:'reorder', class: '' },
    { path: '/table-list', title: 'Lista de Afiliados',  icon:'content_paste', class: '' },
    { path: '/list-user-system', title: 'Usuarios Del Sistema',  icon:'supervisor_account', class: '' },
    { path: '/user-profile', title: 'Perfil de Usuario',  icon:'person', class: '' },
    { path: '/', title: 'Salir del Sistema',  icon:'arrow_back_ios', class: 'active-pro' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notificaciones',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
  ];
  
  
  @Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
  })
  export class SidebarComponent implements OnInit {
    menuItems: any[];
    routLogout: any[];

  constructor() { }

  ngOnInit() {
    this.routLogout = [{ path: '/', title: 'Salir del Sistema',  icon:'arrow_back_ios', class: 'active-pro' },]
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    console.log("SALIR");
    
  }
}
