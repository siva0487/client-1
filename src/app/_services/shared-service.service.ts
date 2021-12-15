import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(public http: HttpClient) { }

  login(request) {
    return this.http.post(environment.apiUrl + "oms_api/v1/login", request);
  }

  getAllStores() {
    return this.http.get(environment.apiUrl + "oms_api/v1/stores");
  }

  getSelectedStoreInfo(storeID) {
    return this.http.get(environment.apiUrl + "oms_api/v1/stores/" + storeID);
  }

  createNewStoreAPI(Request) {
    // console.log(Request);
    return this.http.post(environment.apiUrl + "oms_api/v1/stores", Request);
  }

  updateSelecteStore(res, body) {
    // console.log(res);
    // console.log(body);
    return this.http.put(environment.apiUrl + "oms_api/v1/stores/" + res, body);
  }

  updateTheAddressOfSelectedStore(res, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/addresses/" + res, body);
  }
  deleteTheSelectedStore(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/stores/" + id);
  }

  getListOfOrders() {
    return this.http.get(environment.apiUrl + "oms_api/v1/orders");
  }

  getOrdersByID(ID) {
    return this.http.get(environment.apiUrl + "oms_api/v1/roles/" + ID + "/orders");
  }

  getOrdersForCRM(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/crm_orders", body);
  }
  getAselectedOrderDetails(orderID) {
    return this.http.get(environment.apiUrl + "oms_api/v1/orders/" + orderID);
  }

  getAllOrderStatus() {
    return this.http.get(environment.apiUrl + "oms_api/v1/statuses");
  }
  updateTheOrderStatus(id, status_id) {
    return this.http.put(environment.apiUrl + "oms_api/v1/orders/" + id, status_id);
  }

  getAllCustomerInfo() {
    return this.http.get(environment.apiUrl + "oms_api/v1/customers");
  }

  getSpesificCustomerInfo(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/customers/" + id);
  }

  getAllCartInfo() {
    return this.http.get(environment.apiUrl + "oms_api/v1/user_carts");
  }
  getSelectedCartInfo(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/carts/" + id);
  }

  createSlotsForStore(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/slots", body);
  }

  getSelectedStoreSlots(res) {
    return this.http.get(environment.apiUrl + "oms_api/v1/stores/" + res + "/slots");
  }

  createFrequency(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/frequency", body);
  }

  getAllFrequency() {
    return this.http.get(environment.apiUrl + "oms_api/v1/frequency");
  }

  selectedFrequencyDetails(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/frequency/" + id);
  }

  updateTheFrequency(id, body) {
    // console.log(id);
    return this.http.put(environment.apiUrl + "oms_api/v1/frequency/" + id, body);
  }
  deleteTheselectedFrequency(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/frequency/" + id);
  }

  createDeliveryOptions(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/delivery_option", body);
  }

  getAllDeliveryOptions() {
    return this.http.get(environment.apiUrl + "oms_api/v1/delivery_option");
  }

  selectedDeliveryOptionDetails(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/delivery_option/" + id);
  }

  updateTheDeliveryOptions(id, body) {
    // console.log(id);
    return this.http.put(environment.apiUrl + "oms_api/v1/delivery_option/" + id, body);
  }

  createNewSubscription_typeAPI(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/delivery_option", body);
  }

  getAllRoles() {
    return this.http.get(environment.apiUrl + "oms_api/v1/roles");
  }

  adminCreateNewUser(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/oms_users", body);
  }

  getALLuserInformation() {
    return this.http.get(environment.apiUrl + "oms_api/v1/oms_users");
  }
  getSlectedUserDetails(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/oms_users/" + id);
  }

  updateTheStoreSlots(body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/slots", body);
  }

  updateTheSelectedUser(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/oms_users/" + id, body);
  }

  deleteTheSelectedUser(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/oms_users/" + id);
  }

  adminCreateNewRole(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/roles", body);
  }
  getListOfRoles() {
    return this.http.get(environment.apiUrl + "oms_api/v1/roles");
  }

  deleteTheSelectedRole(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/roles/" + id);
  }
  getTheSelectedRoleInformation(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/roles/" + id);
  }

  updatetheSelectedRole(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/roles/" + id, body);
  }

  deleteTheselectedDeliveryOption(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/delivery_option/" + id);
  }

  getAllSubscriptionDetails() {
    return this.http.get(environment.apiUrl + "oms_api/v1/subscriptions");
  }

  deleteTheselectedSubscriptionSerivece(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/subscriptions/" + id);
  }

  createNewSubscription_service(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/subscriptions", body);
  }

  getSelectedSubscriptionAPI(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/subscriptions/" + id);
  }

  updateTheselectedSubscription(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/subscriptions/" + id, body);
  }

  getAllRatingsAndReviews() {
    return this.http.get(environment.apiUrl + "oms_api/v1/orders/rating_and_reviews");
  }

  getAllScreensAPI() {
    return this.http.get(environment.apiUrl + "oms_api/v1/screens");
  }

  createNewPermission(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/permissions", body);
  }

  selectedUserPermissions(role_id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/roles/" + role_id + "/permissions");
  }
  updateTheSelectedUserPerMissions(body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/permissions", body);
  }

  downloadCustomeorders(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/orders/filter", body);
  }

  downloadCustomCustomers(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/customers/filter", body);
  }
  downloadCustomeStores(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/stores/filter", body);
  }
  downloadCustomeCart(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/user_carts/filter", body);
  }
  downloadCustomeRatingAndReview(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/orders/rating_and_reviews/filter", body);
  }
  downloadCustomeOMSroles(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/roles/filter", body);
  }
  downloadCustomOMSUsers(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/oms_users/filter", body);
  }

  searchAPI(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/search", body);
  }

  walte(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/wallets/transactions", body);
  }

  dashboardAPI(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/dashboard", body);
  }
  getDashboardAPI() {
    return this.http.get(environment.apiUrl + "oms_api/v1/dashboard");
  }
  createDeliveryCharges(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/delivery_charges", body);
  }
  getDeliveryCharges() {
    return this.http.get(environment.apiUrl + "oms_api/v1/delivery_charges");
  }
  deleteTheDeliveryCharge(Id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/delivery_charges/" + Id);
  }
  updateBulk(body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/orders/update", body);
  }
  financeReportDownload(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/finance_filter", body);
  }
  transactionReportDownload(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/transaction_filter", body);
  }
  walletReportDownload(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/wallet_filter", body);
  }

  GetCustomerDetails(body) {
    return this.http.post(environment.magentoAPIURL + "rest/V1/customapi/getcustomer", body);
  }

  productSearch(body) {
    return this.http.post(environment.magentoAPIURL + "rest/V1/customapi/search", body);
  }


  // addNewAddress(body) {
  //   console.log(localStorage.getItem('token'));
  //   const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
  //   return this.http.post(environment.apiUrl + "oms_api/v1/addresses", body, { headers: header });
  // }

  addNewAddress(body) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.post(environment.apiUrl + "oms_api/v1/addresses", body, { headers: header });
  }

  deleteAddress(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.delete(environment.apiUrl + "oms_api/v1/addresses/" + id, { headers: header });
  }

  getCustomerAddress() {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.get(environment.apiUrl + "oms_api/v1/addresses", { headers: header });
  }
  updateCustAddress(id, body) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.put(environment.apiUrl + "oms_api/v1/addresses/" + id, body, { headers: header });
  }

  addtoCart(body) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.put(environment.apiUrl + "oms_api/v1/carts", body, { headers: header });
  }

  getCartDetails() {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.get(environment.apiUrl + "oms_api/v1/carts", { headers: header });
  }

  deleteCartProduct(data) {
    const header = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.delete(environment.apiUrl + "oms_api/v1/carts/items/" + data, { headers: header });
  }

  deleteCart() {
    const header = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.delete(environment.apiUrl + "oms_api/v1/carts/items", { headers: header });

  }

  getPackagingTypes() {
    return this.http.get(environment.apiUrl + "oms_api/v1/packaging_types");
  }

  updatePackagingType(data) {
    const header = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.put<any>(environment.apiUrl + "oms_api/v1/carts/packaging_types", data, { headers: header });
  }


  createminOrderVal(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/min_orders_value", body);
  }

  getMinimumOrderValueInfo() {

    return this.http.get(environment.apiUrl + "oms_api/v1/min_orders_value");

  }
  updateMiniOrderval(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/min_orders_value/" + id, body);
  }
  createPackagingType(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/packaging_types", body);
  }

  getPackagingType() {
    return this.http.get(environment.apiUrl + "oms_api/v1/packaging_types");
  }

  editPackagingType(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/packaging_types/" + id, body);
  }

  deletePackagingType(id) {
    console.log(id);
    return this.http.delete(environment.apiUrl + "oms_api/v1/packaging_types/" + id);
  }

  placeAnOrder(body) {
    const header = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.post(environment.apiUrl + "oms_api/v1/payments", body, { headers: header });
  }

  getPaymentStatus(data) {
    const header = new HttpHeaders().set('Authorization', localStorage.getItem("token"));
    return this.http.get(environment.apiUrl + 'oms_api/v1/payments/' + data, { headers: header });
  }

  downloadNewReports(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/reports", body);
  }

  userCreationGetOTP(body) {
    return this.http.post(environment.magentoAPIURL + "rest/V1/customapi/getotp", body);
  }
  userCreationVerifyOTP(body) {
    return this.http.post(environment.magentoAPIURL + "rest/V1/customapi/registration", body);
  }

  removeItems_from_order(orderID, itemID) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/orders/" + orderID + "/items/remove/" + itemID);
  }
  updateTheOrderByOMS(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/orders/" + id + "/items", body);
  }

  OmsServiceblityCheck(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/serviceability", body);
  }

  public getSlots() {
    return this.http.get(environment.apiUrl + 'oms_api/v1/stores/' + localStorage.getItem("storeId") + '/slots');
  }

  getAllCoupons() {
    return this.http.get(environment.apiUrl + "oms_api/v1/coupons");
  }

  getCouponByID(id) {
    return this.http.get(environment.apiUrl + "oms_api/v1/coupons/" + id);
  }
  createNewCoupan(body) {
    return this.http.post(environment.apiUrl + "oms_api/v1/coupons", body);
  }

  updateTheCoupons(id, body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/coupons/" + id, body);
  }

  deleteTheSelectedCoupon(id) {
    return this.http.delete(environment.apiUrl + "oms_api/v1/coupons/" + id);
  }

  moveToSuccess(body) {
    return this.http.put(environment.apiUrl + "oms_api/v1/orders/payment_failed/update", body);
  }

  getInvoiceData(ID) {
    return this.http.get(environment.apiUrl + "oms_api/v1/orders/" + ID + "/bill_printing");
  }
}
