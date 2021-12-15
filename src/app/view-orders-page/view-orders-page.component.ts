import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-view-orders-page',
  templateUrl: './view-orders-page.component.html',
  styleUrls: ['./view-orders-page.component.css']
})
export class ViewOrdersPageComponent implements OnInit {
  sub: any;
  id: any;
  order_ID: any;
  orderStatus: { status: string; }[];
  currentStatus: any;
  selectedOrder: any;
  customerName: string;
  loader: boolean = false;
  listOfOrders: any;
  finalStatus: any;
  responsedetails: any;
  finalArray: any;
  listOfProductsCheck: any;
  itsEmpty: boolean;
  customerBillingAddress: any;
  customerShippingingAddress: any;
  status_with_time: any;
  abc: any;
  statusTimeStampArray = [];
  permissionForOnlyThisScreen = [];
  showThisScreenWithPermissions: any;
  writePermissionForOnlyThisScreen: any;
  statusArray = [];
  hidethisStatus: boolean;
  showThisNow: boolean;
  withOutPaymentArray = [];
  shareCurrentStatus: any;
  cancelReasonIsRequired: boolean;
  shareitemlist: any;
  productsInfo: any;
  showMessage: string;
  isSearchSuggestion: boolean;
  searchLoader: boolean = false;
  searchedProducts: any;
  testingArray = [];
  shareThisPlantCode: any;
  payment_faild_status = [];
  shareThisStatus: any;
  result: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.order_ID = this.id.order_id;
      console.log(this.id);
    });
    this.getSelectedOrder(this.order_ID);
    // this.getStatus();
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Orders") {
        var forOrders = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreen.push(forOrders);
      }
    }

    for (var i = 0; i < this.showThisScreenWithPermissions.user_matrix[0].status.length; i++) {
      if (this.showThisScreenWithPermissions.user_matrix[0].status[i].is_status_write === true) {
        var status = {
          "status": this.showThisScreenWithPermissions.user_matrix[0].status[i].status_name
        }
        this.statusArray.push(status);
      }
    }
    console.log(this.statusArray);

    var hideArrayP = [];
    for (var i = 0; i < this.statusArray.length; i++) {
      if (this.statusArray[i].status === this.id.status) {
        var status = {
          "status": this.statusArray[i].status
        }
        hideArrayP.push(status);
      }
    }
    console.log(hideArrayP);
    if (hideArrayP.length === 0) {
      this.showThisNow = false;
    } else {
      if (this.id.status === hideArrayP[0].status) {
        this.showThisNow = true;
      } else {
        this.showThisNow = false;
      }
    }
    // var hideArrayC = [];
    // var hideArrayI = [];
    // var hideArrayR = [];
    // var hideArrayO = [];
    // var hideArrayD = [];
    // var hideArrayCAN = [];

    // if (this.statusArray.length === 0) {
    //   this.hidethisStatus = true;
    //   console.log("true");
    // } else {
    //   this.hidethisStatus = false;

    //   console.log("false");
    // }
    // console.log(hideArrayP);
    // console.log(hideArrayC);
    // console.log(hideArrayI);
    // console.log(hideArrayO);
    // console.log(hideArrayR);
    // console.log(hideArrayD);
    // console.log(hideArrayCAN);

    console.log(this.permissionForOnlyThisScreen[0]);
    this.writePermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    console.log(this.writePermissionForOnlyThisScreen);

  }

  ngOnInit(): void {

    this.payment_faild_status = [
      {
        "status": "Payment Failed",
        "value": "payment_failed"
      },
      {
        "status": "Move To Success",
        "value": "payment_failed"
      },
    ]

    this.orderStatus = [
      { "status": "Ordered" },
      { "status": "Order Confirm" },
      { "status": "In Progress" },
      { "status": "Read for Shipping" },
      { "status": "Out for Shipping" },
      { "status": "Delivered" },
    ]
  }

  // public getStatus() {
  //   this.loader = true;
  //   this.service.getAllOrderStatus().subscribe(res => {
  //     console.log(res);
  //     this.loader = false;
  //     this.listOfOrders = res;
  //     this.finalStatus = this.listOfOrders.statuses;
  //     console.log(this.finalStatus);
  //     var arrayone = [];
  //     var arraytwo = [];
  //     for (var i = 0; i < this.finalStatus.length; i++) {
  //       var check = this.finalStatus[i].status;
  //       if (check === this.selectedOrder.status) {
  //         var p = {
  //           "status": this.finalStatus[i].status
  //         }
  //         arrayone.push(p);
  //         break;
  //       } else {
  //         var q = {
  //           "status": this.finalStatus[i].status
  //         }
  //         arraytwo.push(q);
  //       }
  //     }
  //     console.log(arrayone);
  //     console.log(arraytwo);
  //     var currentStatusMarge = {
  //       "status": this.selectedOrder.status
  //     }
  //     var newArray = new Array();
  //     newArray.push(currentStatusMarge);
  //     this.finalArray = arraytwo.concat(newArray);
  //     console.log("new", this.finalArray);
  //     console.log("original", this.finalStatus);
  //     var useForStatus = [];
  //     for (var j = 0; j < this.finalArray.length; j++) {
  //       useForStatus.push(this.finalArray[j].status);
  //     }
  //     for (var i = 0; i < this.finalStatus.length; i++) {
  //       var n = useForStatus.includes(this.finalStatus[i].status);
  //       if (n) {
  //         this.finalStatus[i]["value"] = true
  //       } else {
  //         this.finalStatus[i]["value"] = false
  //       }
  //     }
  //     console.log("Final Modified Array ", this.finalStatus);
  //   }, err => {
  //     console.log(err);
  //     this.loader = false;
  //     $.notify({
  //       icon: "add_alert",
  //       message: err
  //     }, {
  //       type: 'info',
  //       timer: 1000,
  //       placement: {
  //         from: 'top',
  //         align: 'center'
  //       }
  //     });
  //   });
  // }
  public getSelectedOrder(orderID) {
    this.loader = true;
    this.service.getAselectedOrderDetails(orderID).subscribe(res => {
      console.log(JSON.stringify(res));
      this.selectedOrder = res[0];
      this.customerBillingAddress = this.selectedOrder.addresses[0].billing_address[0];
      this.customerShippingingAddress = this.selectedOrder.addresses[0].shipping_address[0];
      this.status_with_time = this.selectedOrder.status_history[0];
      console.log(this.status_with_time);
      this.productsInfo = this.selectedOrder.items;
      if (this.productsInfo.length === 1) {
        this.showMessage = "This is the Last Product in your order, if you delete this your order will be cancelled is it fine ?"
      } else {
        this.showMessage = "Are you Sure...?"
      }
      this.service.getAllOrderStatus().subscribe(res => {
        console.log(res);
        this.listOfOrders = res;
        this.finalStatus = this.listOfOrders.statuses;
        console.log(this.finalStatus);

        var arrayone = [];
        var arraytwo = [];
        for (var i = 0; i < this.finalStatus.length; i++) {
          var check = this.finalStatus[i].status;
          if (check === this.selectedOrder.status) {
            var p = {
              "status": this.finalStatus[i].status
            }
            arrayone.push(p);
            break;
          } else {
            var q = {
              "status": this.finalStatus[i].status
            }
            arraytwo.push(q);
          }
        }
        console.log(arrayone);
        this.statusTimeStampArray = [];
        // for (var i = 0; i < this.status_with_time.length; i++) {
        if (this.status_with_time.placed != null) {
          var status_time = {
            "status": "Placed",
            "time": this.status_with_time.placed
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.confirmed != null) {
          var status_time = {
            "status": "Confirmed",
            "time": this.status_with_time.confirmed
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.pickup_confirmed != null) {
          var status_time = {
            "status": "Pickup Confirmed",
            "time": this.status_with_time.pickup_confirmed
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.in_process != null) {
          var status_time = {
            "status": "In Process",
            "time": this.status_with_time.in_process
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.ready_for_shipping != null) {
          var status_time = {
            "status": "Ready For Shipping",
            "time": this.status_with_time.ready_for_shipping
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.out_for_delivery != null) {
          var status_time = {
            "status": "Out For Delivery",
            "time": this.status_with_time.out_for_delivery
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.delivered != null) {
          var status_time = {
            "status": "Delivered",
            "time": this.status_with_time.delivered
          }
          this.statusTimeStampArray.push(status_time);
        }
        if (this.status_with_time.cancelled != null) {
          var status_time = {
            "status": "Cancelled",
            "time": this.status_with_time.cancelled
          }
          this.statusTimeStampArray.push(status_time);
        }
        // }
        console.log(this.statusTimeStampArray);
        console.log(arraytwo);
        var currentStatusMarge = {
          "status": this.selectedOrder.status
        }
        var newArray = new Array();
        newArray.push(currentStatusMarge);
        this.finalArray = arraytwo.concat(newArray);
        console.log("new", this.finalArray);
        console.log("original", this.finalStatus);
        var useForStatus = [];
        for (var j = 0; j < this.finalArray.length; j++) {
          useForStatus.push(this.finalArray[j].status);
        }
        for (var i = 0; i < this.finalStatus.length; i++) {
          var n = useForStatus.includes(this.finalStatus[i].status);
          if (n) {
            this.finalStatus[i]["value"] = true
          } else {
            this.finalStatus[i]["value"] = false
          }
        }
        console.log("Final Modified Array ", this.finalStatus);


        for (var i = 0; i < this.finalStatus.length; i++) {
          if (this.finalStatus[i].status === this.selectedOrder.status) {
            this.finalStatus[i]["value2"] = true
            this.finalStatus[i + 1]["active"] = true
          } else {
            this.finalStatus[i]["value2"] = false
            // this.finalStatus[i]["active"] = false
          }
        }
        this.withOutPaymentArray = [];
        for (var i = 0; i < this.finalStatus.length; i++) {
          if (this.finalStatus[i].status != "payment_failed") {
            var modify = {
              "status": this.finalStatus[i].status,
              "status_id": this.finalStatus[i].status_id,
              "value": this.finalStatus[i].value,
              "value2": this.finalStatus[i].value2,
              "active": this.finalStatus[i].active
            }
            this.withOutPaymentArray.push(modify);
          }
        }
        console.log(this.withOutPaymentArray);


        if (this.selectedOrder.status === "out_for_delivery" || this.selectedOrder.status === "delivered") {
          this.withOutPaymentArray[this.withOutPaymentArray.length - 1]["active"] = false;
        } else {
          this.withOutPaymentArray[this.withOutPaymentArray.length - 1]["active"] = true;
        }
        console.log("Final Modified Array ", this.withOutPaymentArray);
        // this.testingArray = [];
        // this.testingArray[0] = this.withOutPaymentArray[0];
        // this.testingArray[1] = this.withOutPaymentArray[1];
        // this.testingArray[2] = this.withOutPaymentArray[2];
        // this.testingArray[3] = this.withOutPaymentArray[3];
        // this.testingArray[4] = this.withOutPaymentArray[4];
        // this.testingArray[5] = this.withOutPaymentArray[5];
        // this.testingArray[6] = this.withOutPaymentArray[6];
        // console.log(this.testingArray);
        console.log(this.showThisScreenWithPermissions.user_matrix[0].status);

        this.loader = false;
      }, err => {
        console.log(err);
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: err.error.error_desc
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      });

      this.customerName = this.selectedOrder.first_name + ' ' + this.selectedOrder.last_name;
      this.loader = false;
      this.listOfProductsCheck = this.selectedOrder.items;
      if (this.listOfProductsCheck.length === 0) {
        this.itsEmpty = true;
      } else {
        this.itsEmpty = false;
      }
    }, err => {
      console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: err.error.error_desc
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    });
  }

  currentOrderStatusPF(status) {
    console.log(status);
    this.shareThisStatus = status;
  }

  public currentOrderStatus(status) {
    this.loader = true;
    console.log(status);
    this.shareCurrentStatus = status;
    if (status === "cancelled") {
      $('#for_cancel_reson').modal();
      // $('#user_permission_id').attr("data-toggle", "modal");
      this.loader = false;
    } else {
      if (localStorage.getItem('forCRMTEAM') === 'true') {
        console.log("crmTeam");
        $.notify({
          icon: "add_alert",
          message: "You don't have access to Update the Status"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.loader = false;
        this.router.navigate(['/orders']);
      } else {
        for (var i = 0; i < this.finalStatus.length; i++) {
          if (status === this.finalStatus[i].status) {
            var id = this.finalStatus[i].status_id;
          } else {

          }
        }
        console.log(id);

        var Res = {
          "status_id": id,
          "reason": null
        }
        console.log("id" + this.selectedOrder.order_id);
        console.log(Res);

        this.service.updateTheOrderStatus(this.selectedOrder.order_id, Res).subscribe(res => {
          console.log(res);
          this.responsedetails = res;
          this.getSelectedOrder(this.order_ID);
          $.notify({
            icon: "add_alert",
            message: this.responsedetails.message
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.currentStatus = status;
          var date = new Date();
          var day = JSON.stringify(date.getDate())
          if (date.getDate() < 10) {
            day = "0" + day
          } else {
            day = day;
          }
          var month = JSON.stringify(date.getMonth() + 1)
          if ((date.getMonth() + 1) < 10) {
            month = "0" + month
          } else {
            month = month;
          }
          var currentBrowserDate = (day + '/' + month + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString('en-GB'));

          var faqs_row = 0;
          // var html = '<tr id="faqs-row' + faqs_row + '">';
          // html += '<td><input type="text"  readonly value=' + ' "' + this.currentStatus + '"' + 'class="form-control"></td>';

          // html += '<td><input type="text" readonly value=' + ' "' + currentBrowserDate + '"' + 'class="form-control"></td>';

          // html += '</tr>';
          // $('#faqs tbody').append(html);

          faqs_row++;
          this.loader = false;
          this.router.navigate(['/orders']);
          // this.getSelectedOrder(this.order_ID);

        }, err => {
          this.loader = false;
          console.log(err);
          $.notify({
            icon: "add_alert",
            message: err.error.error_desc
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });

        });
        // if (status === "In Progress") {
        //   console.log("Download Invoice");
        // }

      }
    }
  }

  dontCancel() {
    $('#cancelation_reason').val("");
    $("#profile_edit_verified").trigger("click");
    // this.router.navigate(['/orders']);
    this.getSelectedOrder(this.order_ID);
  }
  yesCancelThisNow() {
    this.loader = true;
    var cancelReason = $('#cancelation_reason').val();
    if (cancelReason === "" || cancelReason === undefined || cancelReason === null) {
      this.cancelReasonIsRequired = true;
      this.loader = false;
    } else {
      this.cancelReasonIsRequired = false;
      console.log(this.shareCurrentStatus);
      for (var i = 0; i < this.finalStatus.length; i++) {
        if (this.shareCurrentStatus === this.finalStatus[i].status) {
          var id = this.finalStatus[i].status_id;
        } else {

        }
      }
      console.log(id);

      var Res = {
        "status_id": id,
        "reason": cancelReason
      }
      console.log("id" + this.selectedOrder.order_id);
      console.log(Res);

      this.service.updateTheOrderStatus(this.selectedOrder.order_id, Res).subscribe(res => {
        console.log(res);
        this.responsedetails = res;
        this.getSelectedOrder(this.order_ID);
        $.notify({
          icon: "add_alert",
          message: this.responsedetails.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.currentStatus = status;
        var date = new Date();
        var day = JSON.stringify(date.getDate())
        if (date.getDate() < 10) {
          day = "0" + day
        } else {
          day = day;
        }
        var month = JSON.stringify(date.getMonth() + 1)
        if ((date.getMonth() + 1) < 10) {
          month = "0" + month
        } else {
          month = month;
        }
        var currentBrowserDate = (day + '/' + month + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString('en-GB'));

        var faqs_row = 0;
        // var html = '<tr id="faqs-row' + faqs_row + '">';
        // html += '<td><input type="text"  readonly value=' + ' "' + this.currentStatus + '"' + 'class="form-control"></td>';

        // html += '<td><input type="text" readonly value=' + ' "' + currentBrowserDate + '"' + 'class="form-control"></td>';

        // html += '</tr>';
        // $('#faqs tbody').append(html);

        faqs_row++;
        this.loader = false;
        this.router.navigate(['/orders']);
        // this.getSelectedOrder(this.order_ID);
        $('#cancelation_reason').val("");
        $("#profile_edit_verified").trigger("click");
        this.cancelReasonIsRequired = false;
      }, err => {
        console.log(err);
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: err.error.error_desc
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        $("#profile_edit_verified").trigger("click");
      });
    }

  }
  forReset() {
    this.cancelReasonIsRequired = false;
    $('#cancelation_reason').val("");
  }

  public cancel() {
    if (localStorage.getItem('itsForPF') === "PF") {
      this.router.navigate(['/payment-failed-orders']);
      localStorage.removeItem('itsForPF');
    } else {
      this.router.navigate(['/orders']);
    }
  }
  removeThisItem(i, itemlist) {
    console.log(itemlist);
    console.log(this.selectedOrder);
    this.shareitemlist = itemlist;
  }
  editThisItem(i, itemlist) {
    console.log(itemlist);
    $('#removeItemID' + i).css("display", "block");
    $('#editItemID' + i).css("display", "none");

    $('#qytres_edit' + i).css("display", "inline-block");
    $('#qytres' + i).css("display", "none");

    $('#closeTheEdit' + i).css("display", "inline-block");
    $('#saveTheEdit' + i).css("display", "inline-block");
  }

  public deleteThisNow() {
    this.loader = true;
    console.log(this.shareitemlist);
    console.log(this.selectedOrder);
    this.service.removeItems_from_order(this.selectedOrder.order_id, this.shareitemlist.item_id).subscribe(res => {
      console.log(res);
      this.getSelectedOrder(this.order_ID);
      this.router.navigate(['/orders']);
      $("#remove_selected_product").modal("hide");
      $('#cancelation_reason').val("");
      this.cancelReasonIsRequired = false;
      this.loader = false;
    }, err => {
      console.log(err);
      $("#remove_selected_product").modal("hide");
      $('#cancelation_reason').val("");
      this.cancelReasonIsRequired = false;
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: err
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    });
  }

  resetTheEdit(i) {
    $('#removeItemID' + i).css("display", "none");
    $('#editItemID' + i).css("display", "inline-block");

    $('#qytres_edit' + i).css("display", "none");
    $('#qytres' + i).css("display", "inline-block");

    $('#closeTheEdit' + i).css("display", "none");
    $('#saveTheEdit' + i).css("display", "none");
  }


  public closethisNow() {
    $("#remove_selected_product").modal("hide");
    $('#cancelation_reason').val("");
    this.cancelReasonIsRequired = false;
  }

  saveAndchangeTheQTY(i, itemlist) {
    console.log(itemlist);
    console.log(this.selectedOrder);
    // this.loader = true;
    var valCheck = $('#qytres_edit' + i).val();
    console.log(valCheck);
    // console.log(itemlist.quantity);
    if (valCheck === "0") {
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Please check the QTY, It should not '0'"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    } else {

      console.log(valCheck);
      console.log(itemlist.quantity);

      console.log(this.selectedOrder.payment_method);
      if (this.selectedOrder.payment_method === 'CASH_ON_DELIVERY') {
        console.log("We Can Increase");
        if (valCheck === undefined || valCheck === null || valCheck === "") {
          var qtyVal = $('#qytres' + i).val();
        } else {
          var qtyVal = $('#qytres_edit' + i).val();
        }
        console.log(qtyVal);
        console.log(parseInt(qtyVal));


        var reqsercheck = {
          "pincode": this.customerShippingingAddress.pincode,
          "lat_longs": null
        }
        console.log(reqsercheck);
        this.service.OmsServiceblityCheck(reqsercheck).subscribe(resboth => {
          console.log(resboth);
          this.shareThisPlantCode = resboth;
          var requestBody = {
            "items": [
              {
                "item_id": itemlist.item_id,
                "quantity": parseInt(qtyVal),
                "store_id": this.shareThisPlantCode.plant_code
              }
            ]
          }
          console.log(requestBody);
          this.service.updateTheOrderByOMS(this.selectedOrder.order_id, requestBody).subscribe(res => {
            console.log(res);
            this.router.navigate(['/orders']);
          }, err => {
            console.log(err);
            this.loader = false;
            $.notify({
              icon: "add_alert",
              message: err
            }, {
              type: 'info',
              timer: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
          });
        });
      } else {
        if (valCheck <= itemlist.quantity) {
          console.log("We Can't Increase");
          if (valCheck === undefined || valCheck === null || valCheck === "") {
            var qtyVal = $('#qytres' + i).val();
          } else {
            var qtyVal = $('#qytres_edit' + i).val();
          }
          console.log(qtyVal);
          console.log(parseInt(qtyVal));


          var reqsercheck = {
            "pincode": this.customerShippingingAddress.pincode,
            "lat_longs": null
          }
          console.log(reqsercheck);
          this.service.OmsServiceblityCheck(reqsercheck).subscribe(resboth => {
            console.log(resboth);
            this.shareThisPlantCode = resboth;
            var requestBody = {
              "items": [
                {
                  "item_id": itemlist.item_id,
                  "quantity": parseInt(qtyVal),
                  "store_id": this.shareThisPlantCode.plant_code
                }
              ]
            }
            console.log(requestBody);
            this.service.updateTheOrderByOMS(this.selectedOrder.order_id, requestBody).subscribe(res => {
              console.log(res);
              this.router.navigate(['/orders']);
            }, err => {
              console.log(err);
              this.loader = false;
              $.notify({
                icon: "add_alert",
                message: err
              }, {
                type: 'info',
                timer: 1000,
                placement: {
                  from: 'top',
                  align: 'center'
                }
              });
            });
          });
        } else {
          $.notify({
            icon: "add_alert",
            message: "Only Cash On Delivery Payment Method Order's have Access for Increasing Quantity"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        }
      }
    }

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  forNewProductAdd(orderID) {
    console.log(orderID);
    // localStorage.setItem('userThisID_for_add_E', orderID);
    this.router.navigate(['/add-new-product-for-this-order', orderID]);
  }

  moveToSuccess() {
    this.loader = true;
    console.log(this.shareThisStatus);
    console.log($('#transctionID').val());
    if (this.shareThisStatus === "" || this.shareThisStatus === undefined || this.shareThisStatus === null || $('#transctionID').val() === "" || $('#transctionID').val() === undefined || $('#transctionID').val() === null) {
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Please select the correct status/Please fill the required fields"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    } else {
      console.log("DONE");
      var reqBody = {
        "transaction_id": $('#transctionID').val()
      }
      console.log(reqBody);
      this.service.moveToSuccess(reqBody).subscribe(res => {
        console.log(res);
        this.result = res;
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: this.result.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.router.navigate(['/payment-failed-orders']);
      }, err => {
        console.log(err);
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: err.error.error_desc
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      });
    }

  }

}

