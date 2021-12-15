import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/orders', title: 'Orders', icon: 'list', class: '' },
  { path: '/customers', title: 'Customers', icon: 'supervised_user_circle', class: '' },
  { path: '/stores', title: 'Stores', icon: 'store', class: '' },
  { path: '/cart-info', title: 'Cart', icon: 'shopping_cart', class: '' },
  { path: '/order-rating-and-review', title: 'Order Rating & Review', icon: 'star_rate', class: '' },
  { path: '/returns-and-refunds', title: 'Returns & Refunds', icon: 'remove_shopping_cart', class: '' },
  { path: '/subscribers', title: 'Subscription', icon: 'mark_email_read', class: '' },
  // { path: '/serviceability', title: 'Serviceability', icon: 'storefront', class: '' },
  { path: '/configurations', title: 'Configurations', icon: 'storefront', class: '' },
  { path: '/users-list', title: 'UsersList', icon: 'supervised_user_circle', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  selectedScrennsList: any;
  showThisScreenWithPermissions: any;

  permissionForOnlyThisScreenDashboard = [];
  permissionForOnlyThisScreenOrders = [];
  permissionForOnlyThisScreenStores_Management = [];
  permissionForOnlyThisScreenOrder_Rating_and_Review = [];
  permissionForOnlyThisScreenReturns_and_Refunds = [];
  permissionForOnlyThisScreenSubscription = [];
  permissionForOnlyThisScreenConfigurations = [];
  permissionForOnlyThisScreenUser_Management = [];
  permissionForOnlyThisScreenCustomers = [];
  permissionForOnlyThisScreencarts = [];
  permissionForOnlyThisScreenReports = [];
  permissionForOnlyThisScreenCoupons = [];
  ThisScreenDashboard: any;
  ThisScreencarts: any;
  ThisScreenCustomers: any;
  ThisScreenUser_Management: any;
  ThisScreenConfigurations: any;
  ThisScreenSubscription: any;
  ThisScreenReturns_and_Refunds: any;
  ThisScreenOrder_Rating_and_Review: any;
  ThisScreenStores_Management: any;
  ThisScreenOrders: any;
  ThisScreenReports: any;
  onlyForDashboard: any;
  ThisScreenCoupons: any;
  permissionForOnlyThisScreenPaymentFaild = [];
  ThisPaymentFaild: any;

  constructor() {


    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Dashboard") {
        var forOrders1 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenDashboard.push(forOrders1);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Orders") {
        var forOrders2 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenOrders.push(forOrders2);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Stores Management") {
        var forOrders3 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenStores_Management.push(forOrders3);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Order Rating and Review") {
        var forOrders4 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenOrder_Rating_and_Review.push(forOrders4);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Returns and Refunds") {
        var forOrders5 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenReturns_and_Refunds.push(forOrders5);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Subscription") {
        var forOrders6 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenSubscription.push(forOrders6);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Configurations") {
        var forOrders7 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenConfigurations.push(forOrders7);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "User Management") {
        var forOrders8 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenUser_Management.push(forOrders8);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Customers") {
        var forOrders9 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenCustomers.push(forOrders9);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "carts") {
        var forOrders10 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreencarts.push(forOrders10);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Reports") {
        var forOrders11 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenReports.push(forOrders11);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Coupons") {
        var forOrders12 = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenCoupons.push(forOrders12);
      }
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Payment Failed") {
        var forOrdersNew = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreenPaymentFaild.push(forOrdersNew);
      }
    }
    console.log(this.permissionForOnlyThisScreenDashboard[0]);
    this.ThisScreenDashboard = this.permissionForOnlyThisScreenDashboard[0];
    this.ThisScreenOrders = this.permissionForOnlyThisScreenOrders[0];
    this.ThisScreenStores_Management = this.permissionForOnlyThisScreenStores_Management[0];
    this.ThisScreenOrder_Rating_and_Review = this.permissionForOnlyThisScreenOrder_Rating_and_Review[0];
    this.ThisScreenReturns_and_Refunds = this.permissionForOnlyThisScreenReturns_and_Refunds[0];
    this.ThisScreenSubscription = this.permissionForOnlyThisScreenSubscription[0];
    this.ThisScreenConfigurations = this.permissionForOnlyThisScreenConfigurations[0];
    this.ThisScreenUser_Management = this.permissionForOnlyThisScreenUser_Management[0];
    this.ThisScreenCustomers = this.permissionForOnlyThisScreenCustomers[0];
    this.ThisScreencarts = this.permissionForOnlyThisScreencarts[0];
    this.ThisScreenReports = this.permissionForOnlyThisScreenReports[0];
    this.ThisScreenCoupons = this.permissionForOnlyThisScreenCoupons[0];
    this.ThisPaymentFaild = this.permissionForOnlyThisScreenPaymentFaild[0];
    // console.log(this.ThisScreenDashboard);
    this.onlyForDashboard = localStorage.getItem('dashboard');
    console.log(this.onlyForDashboard);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
