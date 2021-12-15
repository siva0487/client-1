import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { OrdersComponent } from '../../orders/orders.component';
import { CustomersComponent } from '../../customers/customers.component';
import { StoresComponent } from '../../stores/stores.component';
import { OrderRatingAndReviewComponent } from '../../order-rating-and-review/order-rating-and-review.component';
import { ReturnsAndRefundsComponent } from '../../returns-and-refunds/returns-and-refunds.component';
import { SubscribersComponent } from '../../subscribers/subscribers.component';
import { ViewOrdersPageComponent } from '../../view-orders-page/view-orders-page.component';
import { ViewCustomerDetailsComponent } from '../../view-customer-details/view-customer-details.component';
import { StoreViewDetailsComponent } from '../../store-view-details/store-view-details.component';
import { RatingReviewViewDetailsComponent } from '../../rating-review-view-details/rating-review-view-details.component';
import { RaturnsRefundsViewDetailsComponent } from '../../raturns-refunds-view-details/raturns-refunds-view-details.component';
import { AddNewStoreComponent } from '../../add-new-store/add-new-store.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { UsersListDetailsComponent } from '../../users-list-details/users-list-details.component';
import { AddNewUserComponent } from '../../add-new-user/add-new-user.component';
import { ServiceabilityComponent } from '../../serviceability/serviceability.component';
import { ConfigurationsComponent } from '../../configurations/configurations.component';
import { SubscriptionDetailsComponent } from '../../subscription-details/subscription-details.component';
import { FrequencyServiceComponent } from 'app/frequency-service/frequency-service.component';
import { SubscriptionServiceComponent } from 'app/subscription-service/subscription-service.component';
import { DeliveryOptionServiceComponent } from 'app/delivery-option-service/delivery-option-service.component';
import { AddNewFrequencyServiceComponent } from 'app/add-new-frequency-service/add-new-frequency-service.component';
import { ViewFrequencyServiceComponent } from 'app/view-frequency-service/view-frequency-service.component';

import { AddNewDeliveryServiceComponent } from 'app/add-new-delivery-service/add-new-delivery-service.component';
import { ViewDeliveryServiceComponent } from 'app/view-delivery-service/view-delivery-service.component';
import { ViewSubscriptionServiceComponent } from 'app/view-subscription-service/view-subscription-service.component';
import { AddNewSubscriptionServiceComponent } from 'app/add-new-subscription-service/add-new-subscription-service.component';

import { RolesListComponent } from 'app/roles-list/roles-list.component';
import { ViewRolesListComponent } from 'app/view-roles-list/view-roles-list.component';
import { AddNewRoleComponent } from 'app/add-new-role/add-new-role.component';
import { ListOfSlotsComponent } from 'app/list-of-slots/list-of-slots.component';
import { ViewSlotsComponent } from 'app/view-slots/view-slots.component';
import { CreateNewSlotsComponent } from 'app/create-new-slots/create-new-slots.component';
import { UserPermissionComponent } from 'app/user-permission/user-permission.component';
import { ReportsComponent } from 'app/reports/reports.component';
import { AddingOrdersFromOMSComponent } from 'app/adding-orders-from-oms/adding-orders-from-oms.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { CartInfoComponent } from 'app/cart-info/cart-info.component';
import { CartViewComponent } from 'app/cart-view/cart-view.component';
import { AddNewProductForThisOrderComponent } from 'app/add-new-product-for-this-order/add-new-product-for-this-order.component';
import { CouponManagementComponent } from 'app/coupon-management/coupon-management.component';
import { CreateNewCouponComponent } from 'app/create-new-coupon/create-new-coupon.component';
import { VeiwCouponDetailsComponent } from 'app/veiw-coupon-details/veiw-coupon-details.component';

// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSelectModule } from '@angular/material/select';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { from } from 'rxjs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentFailedOrdersComponent } from 'app/payment-failed-orders/payment-failed-orders.component';

@NgModule({
  imports: [
    // NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    // NgxPaginationModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
  ],
  declarations: [

    DashboardComponent,
    OrdersComponent,
    CustomersComponent,
    StoresComponent,
    OrderRatingAndReviewComponent,
    ReturnsAndRefundsComponent,
    SubscribersComponent,
    ViewOrdersPageComponent,
    ViewCustomerDetailsComponent,
    StoreViewDetailsComponent,
    RatingReviewViewDetailsComponent,
    RaturnsRefundsViewDetailsComponent,
    AddNewStoreComponent,
    UsersListComponent,
    UsersListDetailsComponent,
    AddNewUserComponent,
    ServiceabilityComponent,
    ConfigurationsComponent,
    SubscriptionDetailsComponent,
    FrequencyServiceComponent,
    SubscriptionServiceComponent,
    DeliveryOptionServiceComponent,
    AddNewFrequencyServiceComponent,
    ViewFrequencyServiceComponent,
    AddNewDeliveryServiceComponent,
    ViewDeliveryServiceComponent,
    ViewSubscriptionServiceComponent,
    AddNewSubscriptionServiceComponent,
    RolesListComponent,
    ViewRolesListComponent,
    AddNewRoleComponent,
    ListOfSlotsComponent,
    ViewSlotsComponent,
    CreateNewSlotsComponent,
    UserPermissionComponent,
    ReportsComponent,
    AddingOrdersFromOMSComponent,
    CartInfoComponent,
    CartViewComponent,
    AddNewProductForThisOrderComponent,
    CouponManagementComponent,
    CreateNewCouponComponent,
    VeiwCouponDetailsComponent,
    PaymentFailedOrdersComponent
  ],
  entryComponents: [AddNewStoreComponent],
  bootstrap: [AddNewStoreComponent],

})

export class AdminLayoutModule { }
