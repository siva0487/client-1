import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { OrdersComponent } from 'app/orders/orders.component';
import { CustomersComponent } from 'app/customers/customers.component';
import { LoginComponent } from 'app/login/login.component';
import { StoresComponent } from 'app/stores/stores.component';
import { OrderRatingAndReviewComponent } from 'app/order-rating-and-review/order-rating-and-review.component';
import { ReturnsAndRefundsComponent } from 'app/returns-and-refunds/returns-and-refunds.component';
import { SubscribersComponent } from 'app/subscribers/subscribers.component';
import { ViewOrdersPageComponent } from 'app/view-orders-page/view-orders-page.component';
import { ViewCustomerDetailsComponent } from 'app/view-customer-details/view-customer-details.component';
import { StoreViewDetailsComponent } from 'app/store-view-details/store-view-details.component';
import { RatingReviewViewDetailsComponent } from 'app/rating-review-view-details/rating-review-view-details.component';
import { RaturnsRefundsViewDetailsComponent } from 'app/raturns-refunds-view-details/raturns-refunds-view-details.component';
import { AddNewStoreComponent } from 'app/add-new-store/add-new-store.component';
import { UsersListComponent } from 'app/users-list/users-list.component';
import { UsersListDetailsComponent } from 'app/users-list-details/users-list-details.component';
import { AddNewUserComponent } from 'app/add-new-user/add-new-user.component';
import { ServiceabilityComponent } from 'app/serviceability/serviceability.component';
import { ConfigurationsComponent } from 'app/configurations/configurations.component';
import { SubscriptionDetailsComponent } from 'app/subscription-details/subscription-details.component';
import { CartInfoComponent } from 'app/cart-info/cart-info.component';
import { CartViewComponent } from 'app/cart-view/cart-view.component';
import { SubscriptionServiceComponent } from 'app/subscription-service/subscription-service.component';
import { DeliveryOptionServiceComponent } from 'app/delivery-option-service/delivery-option-service.component';
import { FrequencyServiceComponent } from 'app/frequency-service/frequency-service.component';
import { AddNewFrequencyServiceComponent } from 'app/add-new-frequency-service/add-new-frequency-service.component';
import { ViewFrequencyServiceComponent } from 'app/view-frequency-service/view-frequency-service.component';
import { AddNewDeliveryServiceComponent } from 'app/add-new-delivery-service/add-new-delivery-service.component';
import { ViewDeliveryServiceComponent } from 'app/view-delivery-service/view-delivery-service.component';
import { AddNewSubscriptionServiceComponent } from 'app/add-new-subscription-service/add-new-subscription-service.component';
import { RolesListComponent } from 'app/roles-list/roles-list.component';
import { ViewRolesListComponent } from 'app/view-roles-list/view-roles-list.component';
import { AddNewRoleComponent } from 'app/add-new-role/add-new-role.component';
import { ViewSubscriptionServiceComponent } from 'app/view-subscription-service/view-subscription-service.component';
import { ListOfSlotsComponent } from 'app/list-of-slots/list-of-slots.component';
import { ViewSlotsComponent } from 'app/view-slots/view-slots.component';
import { CreateNewSlotsComponent } from 'app/create-new-slots/create-new-slots.component';
import { UserPermissionComponent } from 'app/user-permission/user-permission.component';
import { ReportsComponent } from 'app/reports/reports.component';
import { AddingOrdersFromOMSComponent } from 'app/adding-orders-from-oms/adding-orders-from-oms.component';
import { AddNewProductForThisOrderComponent } from 'app/add-new-product-for-this-order/add-new-product-for-this-order.component';
import { CouponManagementComponent } from 'app/coupon-management/coupon-management.component';
import { CreateNewCouponComponent } from 'app/create-new-coupon/create-new-coupon.component';
import { VeiwCouponDetailsComponent } from 'app/veiw-coupon-details/veiw-coupon-details.component';
import { PaymentFailedOrdersComponent } from 'app/payment-failed-orders/payment-failed-orders.component';

// import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent, },

    { path: 'customers', component: CustomersComponent },
    { path: 'stores', component: StoresComponent },
    { path: 'order-rating-and-review', component: OrderRatingAndReviewComponent },
    { path: 'returns-and-refunds', component: ReturnsAndRefundsComponent },
    { path: 'subscribers', component: SubscribersComponent },
    { path: 'view-orders-page', component: ViewOrdersPageComponent },
    { path: 'add-new-product-for-this-order', component: AddNewProductForThisOrderComponent },
    { path: 'view-customer-details', component: ViewCustomerDetailsComponent },
    { path: 'store-view-details', component: StoreViewDetailsComponent },
    { path: 'rating-review-view-details', component: RatingReviewViewDetailsComponent },
    { path: 'raturns-refunds-view-details', component: RaturnsRefundsViewDetailsComponent },
    { path: 'add-new-store', component: AddNewStoreComponent },
    { path: 'users-list', component: UsersListComponent },
    { path: 'users-list-details', component: UsersListDetailsComponent },
    { path: 'add-new-user', component: AddNewUserComponent },
    { path: 'serviceability', component: ServiceabilityComponent },
    { path: 'configurations', component: ConfigurationsComponent },
    { path: 'subscription-details', component: SubscriptionDetailsComponent },
    { path: 'cart-info', component: CartInfoComponent },
    { path: 'cart-view', component: CartViewComponent },
    { path: 'frequency-service', component: FrequencyServiceComponent },
    { path: 'delivery-option-service', component: DeliveryOptionServiceComponent },
    { path: 'subscription-service', component: SubscriptionServiceComponent },
    { path: 'add-new-frequency-service', component: AddNewFrequencyServiceComponent },
    { path: 'view-frequency-service', component: ViewFrequencyServiceComponent },
    { path: 'add-new-delivery-service', component: AddNewDeliveryServiceComponent },
    { path: 'view-delivery-service', component: ViewDeliveryServiceComponent },
    { path: 'view-subscription-service', component: ViewSubscriptionServiceComponent },
    { path: 'add-new-subscription-service', component: AddNewSubscriptionServiceComponent },
    { path: 'roles-list', component: RolesListComponent },
    { path: 'view-roles-list', component: ViewRolesListComponent },
    { path: 'add-new-role', component: AddNewRoleComponent },
    { path: 'list-of-slots', component: ListOfSlotsComponent },
    { path: 'view-slots', component: ViewSlotsComponent },
    { path: 'create-new-slots', component: CreateNewSlotsComponent },
    { path: 'user-permission', component: UserPermissionComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'adding-orders-from-oms', component: AddingOrdersFromOMSComponent },
    { path: 'coupon-management', component: CouponManagementComponent },
    { path: 'create-new-coupon', component: CreateNewCouponComponent },
    { path: 'veiw-coupon-details', component: VeiwCouponDetailsComponent },
    { path: 'payment-failed-orders', component: PaymentFailedOrdersComponent }

];
