import { Component, OnInit, Input, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportService } from '../_services/export.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-payment-failed-orders',
  templateUrl: './payment-failed-orders.component.html',
  styleUrls: ['./payment-failed-orders.component.css']
})
export class PaymentFailedOrdersComponent implements OnInit {
  filterOrders = "";
  isButtonEnable: boolean;
  pos: string;
  post: string;
  dynamicorderDetailsByCheckBox: any[];
  dict = {};
  selectedInfoForView: any;
  selectedInfoForEdit: any;
  finalData: { order_id: string; order_date: string; customer_name: string; payment_status: string; order_type: string; status: string; }[];
  selectedAlldata = [];
  selectedAlldataArray = [];
  allOrdersList: any;
  loader: boolean = false;
  message_display: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  statustotalList: any;
  custome_download: FormGroup;
  custome_search: FormGroup;
  submitted: boolean;
  from_date: any;
  to_date: any;
  customeData: any;
  pageOfItems: any;
  first_id: any;
  last_id: any;
  totalElements: any;
  forFilterUse: any;
  fullfillData: any;
  config: any;
  pager: any = {};
  pagedItems = [];
  finalStatus: any;
  status_with_time: any;
  statusTimeStampArray = [];
  finalArray: any;
  modifiedStatusArray: any;
  statusArray = [];
  updateMesg: any;
  NewStatusArray = [];
  hidethisStatus: boolean;
  NewStatusArray_final = [];
  statusArray_main_one_userMatrix = [];
  currectArray = [];
  statusArray_main_one_userMatrix_include_key = [];
  thisIsMatched: boolean;
  arraychecking = [];
  sendThis_item_s: any;
  sendThis_selected_previous_status: any;
  showThisSelectMSG: boolean;
  showOnlyForCancel: boolean;
  showThisMsgReasonRequired: boolean;
  pageCount = [];
  shareThisCount: any = 10;
  howmanySelectedArray = [];
  ShareThisSelectedList: number = 0;
  onlyForDashboard: any;
  sortDir = 1; //1= 'ASE' -1= DSC
  testingNow: string;
  constructor(private router: Router, private formBuilder: FormBuilder, private exportService: ExportService, private service: SharedServiceService) {
    // this.downloadInvoice();
    // this.sortArr("status");
    // this.sortArr1("created_at");
    // this.sortArrOID("order_no");
    // this.sortArrCN("first_name");
    // this.sortArrCN("last_name");
    this.onlyForDashboard = localStorage.getItem('dashboard');
    console.log(this.onlyForDashboard);
    this.getAllOrdersList();
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Payment Failed") {
        var forOrders = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreen.push(forOrders);
      }
    }
    // console.log(this.permissionForOnlyThisScreen[0]);
    this.allPermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    console.log(this.allPermissionForOnlyThisScreen);

    this.custome_download = this.formBuilder.group({
      from_date: [''],
      to_date: [''],
      status_id: ['']
    });

    this.custome_search = this.formBuilder.group({
      order_id: [''],
      order_date: [''],
      customer_name: [''],
      payment_type: [''],
      order_status: ['']
    });
  }


  get a() { return this.custome_download.controls; }
  get b() { return this.custome_search.controls; }

  public selectedStatusInfor(v) {
    // console.log(v);
    $('#order_id_filter').val("");
    $('#order_date').val("");
    $('#customer_name').val("");
    $('#payment_type').val("");

    $("#order_id_filter").attr("readonly", "true");
    $("#order_date").attr("readonly", "true");
    $("#customer_name").attr("readonly", "true");
    $("#payment_type").attr("readonly", "true");

  }
  public customeExport() {
    this.loader = true;
    this.submitted = true;
    if (this.custome_download.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.custome_download.value);

    this.from_date = new Date(this.a.from_date.value);
    this.to_date = new Date(this.a.to_date.value);
    // console.log(this.from_date, this.to_date);
    // console.log(this.to_date - this.from_date);
    if ((this.to_date - this.from_date) >= 0) {
      console.log(this.custome_download.value);
      this.service.downloadCustomeorders(this.custome_download.value).subscribe(res => {
        console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Available!"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.customeData = res;
          this.exportService.exportExcel(this.customeData[0].orderfilter, 'Order Export');
          this.loader = false;
          $('#from_date').val("");
          $('#to_date').val("");
          $('#selectedStatus').val("");
          this.submitted = false;
          this.custome_download.reset();
        }
      }, err => {
        // console.log(err);
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
    } else {
      $('#to_date').val("");
      // console.log("to_date");
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "To Date Should be Gater then From Date! Please currect the Date and try again"
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
  customeDownloads() {
    $('#from_date').val("");
    $('#to_date').val("");
    $('#selectedStatus').val("");
    this.submitted = false;
    this.custome_download.reset();
  }
  public customeSearch() {
    // this.loader = true;
    // this.submitted = true;
    // if (this.custome_search.invalid) { 
    // this.loader = false;
    //   return;
    // }
    // // console.log(this.custome_search.value);
    // // console.log(this.custome_search.value.order_id, this.custome_search.value.order_id != "", this.custome_search.value.order_id != null);
    // // console.log(this.custome_search.value.order_date);
    // // console.log(this.custome_search.value.customer_name);
    // // console.log(this.custome_search.value.payment_type);
    // // console.log(this.custome_search.value.order_status);
    if ($('#order_id_filter').val() != "") {
      var request = {
        "screen": "orders",
        "column_name": "order ID",
        "search": $('#order_id_filter').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.allOrdersList = res[0].orders;
          this.setPage(1);
          console.log(this.allOrdersList);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });
    } else if ($('#order_date').val() != "") {
      var request = {
        "screen": "orders",
        "column_name": "order date",
        "search": $('#order_date').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.allOrdersList = res[0].orders;
          console.log(this.allOrdersList);
          this.setPage(1);

        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#customer_name').val() != "") {
      var request = {
        "screen": "orders",
        "column_name": "customer Name",
        "search": $('#customer_name').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.allOrdersList = res[0].orders;
          this.setPage(1);
          console.log(this.allOrdersList);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#payment_type').val() != "") {
      var request = {
        "screen": "orders",
        "column_name": "payment type",
        "search": $('#payment_type').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.allOrdersList = res[0].orders;
          this.setPage(1);
          console.log(this.allOrdersList);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#status_filter').val() != "") {
      var request = {
        "screen": "orders",
        "column_name": "order status",
        "search": $('#status_filter').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.allOrdersList = res[0].orders;
          this.setPage(1);
          console.log(this.allOrdersList);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else {

    }


  }
  public reSet() {
    $('#order_id_filter').val("");
    $('#order_date').val("");
    $('#customer_name').val("");
    $('#payment_type').val("");
    $('#status_filter').val("");

    $("#order_id_filter").attr("readonly", "true");
    $("#order_date").attr("readonly", "true");
    $("#customer_name").attr("readonly", "true");
    $("#payment_type").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

    this.getAllOrdersList();

    // $('.collapsed').trigger('click');
    // $('#heading1').click();
  }
  enableThis1() {
    document.getElementById('order_id_filter').removeAttribute('readonly');
    $('#order_date').val("");
    $('#customer_name').val("");
    $('#payment_type').val("");
    $('#status_filter').val("");

    $("#order_date").attr("readonly", "true");
    $("#customer_name").attr("readonly", "true");
    $("#payment_type").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis2() {
    document.getElementById('order_date').removeAttribute('readonly');
    $('#order_id_filter').val("");
    $('#customer_name').val("");
    $('#payment_type').val("");
    $('#status_filter').val("");

    $("#order_id_filter").attr("readonly", "true");
    $("#customer_name").attr("readonly", "true");
    $("#payment_type").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis3() {
    document.getElementById('customer_name').removeAttribute('readonly');
    $('#order_id_filter').val("");
    $('#order_date').val("");
    $('#payment_type').val("");
    $('#status_filter').val("");

    $("#order_id_filter").attr("readonly", "true");
    $("#order_date").attr("readonly", "true");
    $("#payment_type").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis4() {
    document.getElementById('payment_type').removeAttribute('readonly');
    $('#order_id_filter').val("");
    $('#order_date').val("");
    $('#customer_name').val("");
    $('#status_filter').val("");

    $("#order_id_filter").attr("readonly", "true");
    $("#order_date").attr("readonly", "true");
    $("#customer_name").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  // enableThis5() {
  //   // console.log("ghjk");
  //   $('#order_id_filter').val("");
  //   $('#order_date').val("");
  //   $('#customer_name').val("");
  //   $('#payment_type').val("");

  //   $("#order_id_filter").attr("readonly", "true");
  //   $("#order_date").attr("readonly", "true");
  //   $("#customer_name").attr("readonly", "true");
  //   $("#payment_type").attr("readonly", "true");
  // }

  eraiseAll() {
    $('#order_id_filter').val("");
    $('#order_date').val("");
    $('#customer_name').val("");
    $('#payment_type').val("");
    $('#status_filter').val("");
  }

  all(data) {

    console.log(data);
    this.selectedAlldata = data;
    console.log(this.selectedAlldata);
    if ($('#selectall').prop("checked") == true) {
      $('body').on('click', '#selectall', function () {
        $('.singlechkbox').prop('checked', this.checked);
      });
      console.log("Checkbox is checked.");
      this.ShareThisSelectedList = this.pagedItems.length;
    }
    else if ($('#selectall').prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      this.selectedAlldata = [];
      this.ShareThisSelectedList = 0;
      // console.log(this.selectedAlldata);
    }
  }
  generate() {
    console.log(this.ShareThisSelectedList);
    if (this.ShareThisSelectedList > 0) {
      console.log(this.selectedAlldata);
      // var finalData = _.map(this.selectedAlldata, function (item) {
      //   return _.pick(item, "order_no", "created_at", "first_name", "last_name", "payment_method", "status")
      // })
      // finalData = finalData.filter((item) => {
      //   return item != null;
      // });
      // console.log(finalData);  
      var finalDataModified = [];
      for (var i = 0; i < this.pagedItems.length; i++) {
        if ($('#dynamicID' + i).prop("checked") === true) {
          var use = {
            "Order No": this.pagedItems[i].order_no,
            "Created At": this.pagedItems[i].created_at,
            "First Name": this.pagedItems[i].first_name,
            "Last Name": this.pagedItems[i].last_name,
            "Payment Method": this.pagedItems[i].payment_method,
            "Status": this.pagedItems[i].status
          }
          finalDataModified.push(use);
        }
      }
      this.exportService.exportExcel(finalDataModified, 'Order Export');
      $('#selectall').prop("checked", false);
      this.getAllOrdersList();
    } else {
      $.notify({
        icon: "add_alert",
        message: "Please select the List"
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
  single(event, data) {
    console.log(data);
    if (this.dict.hasOwnProperty(event)) {
      delete this.dict[event];
    } else {
      this.dict[event] = data;
    }
    this.selectedAlldata = [];
    for (var key in this.dict) {
      this.selectedAlldata.push(this.dict[key]);
    }
    console.log(this.selectedAlldata);

    $('body').on('click', '.singlechkbox', function () {
      if ($('.singlechkbox').length == $('.singlechkbox:checked').length) {
        $('#selectall').prop('checked', true);
        // // console.log("Checkbox is checked.");
      } else {
        $("#selectall").prop('checked', false);
        // // console.log("Checkbox is unchecked.");
      }
    });

    this.howmanySelectedArray = [];
    for (var i = 0; i < this.pagedItems.length; i++) {
      if ($('#dynamicID' + i).prop("checked") === true) {
        this.howmanySelectedArray.push(i);
      }
    }
    console.log(this.howmanySelectedArray.length);
    this.ShareThisSelectedList = this.howmanySelectedArray.length;

  }

  // formatsDateTest: string[] = [
  //   'dd/MM/yyyy hh:mm:ss',
  // ];

  // dateNow: Date = new Date();
  // dateNowISO = this.dateNow.toISOString();
  // dateNowMilliseconds = this.dateNow.getTime();
  ngOnInit(): void {

    this.pageCount = [
      { "count": 10 },
      { "count": 20 },
      { "count": 50 },
      { "count": 100 },
      { "count": 500 },
      { "count": 1000 },
    ]

    this.service.getAllOrderStatus().subscribe(res => {
      console.log(res);
      this.statustotalList = res;
      console.log(this.statustotalList.statuses);
      this.finalStatus = this.statustotalList.statuses;

      var data = JSON.parse(localStorage.getItem('screensList'));
      console.log(data);
      console.log(data.user_matrix[0].status);
      this.modifiedStatusArray = data.user_matrix[0].status;
      console.log(this.modifiedStatusArray);
      // var this.currectArray = [];
      for (var i = 0; i < data.user_matrix[0].status.length; i++) {
        if (data.user_matrix[0].status[i].status_name === "placed") {
          var re0 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[0] = re0;
        }
        if (data.user_matrix[0].status[i].status_name === "confirmed") {
          var re1 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[1] = re1;
        }
        if (data.user_matrix[0].status[i].status_name === "in_process") {
          var re2 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[2] = re2;
        }
        if (data.user_matrix[0].status[i].status_name === "ready_for_shipping") {
          var re3 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[3] = re3;
        }
        if (data.user_matrix[0].status[i].status_name === "out_for_delivery") {
          var re4 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[4] = re4;
        }
        if (data.user_matrix[0].status[i].status_name === "delivered") {
          var re5 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[5] = re5;
        }
        if (data.user_matrix[0].status[i].status_name === "cancelled") {
          var re6 = {
            "is_status_read": data.user_matrix[0].status[i].is_status_read,
            "is_status_write": data.user_matrix[0].status[i].is_status_write,
            "status_id": data.user_matrix[0].status[i].status_id,
            "status_name": data.user_matrix[0].status[i].status_name
          }
          this.currectArray[6] = re6;
        }
      }
      console.log(this.currectArray);
      // var statusArray = [];
      for (var i = 0; i < data.user_matrix[0].status.length; i++) {
        if (data.user_matrix[0].status[i].is_status_write === true) {
          var status = {
            "status": data.user_matrix[0].status[i].status_name
          }
          this.statusArray_main_one_userMatrix.push(data.user_matrix[0].status[i].status_name);
          this.statusArray_main_one_userMatrix_include_key.push(status);
        }
        // if (data.user_matrix[0].status[i].status_name != "placed") {
        //   var modifiedData = {
        //     "status_name": data.user_matrix[0].status[i].status_name,
        //     "status_id": data.user_matrix[0].status[i].status_id,
        //     "is_status_write": data.user_matrix[0].status[i].is_status_write,
        //     "is_status_read": data.user_matrix[0].status[i].is_status_read
        //   }
        //   this.NewStatusArray.push(modifiedData);
        // }
      }
      for (var i = 0; i < (data.user_matrix[0].status.length - 1); i++) {
        if (data.user_matrix[0].status[i].is_status_write === true) {
          // var status = {
          //   "status": data.user_matrix[0].status[i + 1].status_name
          // }
          this.statusArray.push(data.user_matrix[0].status[i + 1].status_name);
        }

      }
      console.log(this.statusArray_main_one_userMatrix);
      // console.log(this.statusArray);

      // for (var i = 0; i < this.finalStatus.length; i++) {
      //   var modifiedData = {
      //     "status_name": this.finalStatus[i].status,
      //     "status_id": this.finalStatus[i].status_id,
      //     "is_status_write": data.user_matrix[0].status[i].is_status_write,
      //     "is_status_read": data.user_matrix[0].status[i].is_status_read
      //   }
      //   this.NewStatusArray_final.push(modifiedData);
      // }
      // console.log(this.NewStatusArray_final);
      // console.log(this.statusArray);
      // for (var i = 0; i < this.NewStatusArray_final.length; i++) {
      //   var n = this.statusArray.includes(this.NewStatusArray_final[i].status_name);
      //   if (n) {
      //     this.NewStatusArray_final[i]["value"] = true
      //   } else {
      //     this.NewStatusArray_final[i]["value"] = false
      //   }
      // }
      // console.log(this.NewStatusArray_final);

      console.log(this.NewStatusArray);
      console.log(this.statusArray);
      if (this.statusArray.length === 0) {
        this.hidethisStatus = true;
        console.log("true");
      } else {
        this.hidethisStatus = false;
        console.log("false");
      }


      // for (var i = 0; i < this.finalStatus.length; i++) {
      //   if (this.finalStatus[i].status === this.selectedOrder.status) {
      //     this.finalStatus[i]["value2"] = true
      //     this.finalStatus[i + 1]["active"] = true
      //   } else { 
      //     this.finalStatus[i]["value2"] = false
      //   }
      // }
      // if (this.selectedOrder.status === "out_for_delivery" || this.selectedOrder.status === "delivered") {
      //   this.finalStatus[this.finalStatus.length - 1]["active"] = false;
      // } else {
      //   this.finalStatus[this.finalStatus.length - 1]["active"] = true;
      // }
      // console.log("Final Modified Array ", this.finalStatus);


      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }

  // getAccess(index, accessValue) {
  //   if(index == 0) {
  //     return 'none';
  //   } else {
  //     return 'all';
  //   }
  // }

  public getAllOrdersList() {
    this.loader = true;
    console.log(localStorage.getItem('forCRMTEAM'));
    // if (localStorage.getItem('forCRMTEAM') === 'true') {
    // var crmBody = {
    //   "channel_id": "7135d22e-557a-11eb-9b48-47de3ed79aee", // DEV
    //   // "channel_id": "0b2c77dc-5564-11eb-954b-73d89e99fb84", // PROD
    //   "role_id": localStorage.getItem('role_id')
    // }
    // this.service.getOrdersForCRM(crmBody).subscribe(crmOrderdetails => {
    //   console.log(crmOrderdetails);
    //   if (crmOrderdetails === null) {
    //     this.loader = false;
    //     this.message_display = true;
    //   } else {
    //     this.allOrdersList = crmOrderdetails[0].orders;
    //     console.log(this.allOrdersList);
    //     this.setPage(1);
    //   }
    // }, err => {
    //   this.loader = false;
    //   $.notify({
    //     icon: "add_alert",
    //     message: err.error.error_desc
    //   }, {
    //     type: 'info',
    //     timer: 1000,
    //     placement: {
    //       from: 'top',
    //       align: 'center'
    //     }
    //   });
    // });
    // } else {
    localStorage.getItem('role_id');
    // this.service.getListOfOrders().subscribe(res => {
    this.service.getOrdersByID(localStorage.getItem('role_id')).subscribe(res => {
      console.log(res);
      if (res === null) {
        this.loader = false;
        this.message_display = true;
        // var data = JSON.parse(localStorage.getItem('screensList'));
        // console.log(data.user_matrix[0].status);
        // var statusArray = [];
        // for (var i = 0; i < data.user_matrix[0].status.length; i++) {
        //   if (data.user_matrix[0].status[i].is_status_write === true) {
        //     var status = {
        //       "status": data.user_matrix[0].status[i].status_name
        //     }
        //     statusArray.push(status);
        //   }
        // }
        // console.log(statusArray);
      } else {
        // this.loader = false;
        var checkNowAll = res[0].orders;
        console.log(checkNowAll);
        this.allOrdersList = checkNowAll.filter(obj => obj.status == "payment_failed");
        console.log(this.allOrdersList);
        // var finalData = _.map(this.allOrdersList, function (item) {
        //   if (status === "placed") {
        //     return _.pick(item)
        //   }
        // })
        // finalData = finalData.filter((item) => {
        //   return item != null;
        // });
        // console.log(finalData);
        this.setPage(1);
      }
    }, err => {
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
    // }
  }
  countPerPage(count) {
    console.log(count);
    this.getAllOrdersList();
    this.shareThisCount = count;
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = this.shareThisCount) {
    this.loader = true;
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    this.loader = false;
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  setPage(page: number) {
    this.ShareThisSelectedList = 0;
    $('#selectall').prop("checked", false);
    this.loader = true;
    if (page < 1 || page > this.pager.totalPages) {
      this.loader = false;
      return;
    }

    // get pager object from service
    this.pager = this.getPager(this.allOrdersList.length, page);

    // get current page of items
    if (this.allOrdersList.length === 0) {
      this.message_display = true;
      this.loader = false;
    } else {
      this.message_display = false;
      this.pagedItems = this.allOrdersList.slice(this.pager.startIndex, this.pager.endIndex + 1);
      console.log(this.pagedItems);
      this.loader = false;
    }

  }

  // ----------------------------------------------//
  onSortClick(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("fa-chevron-up")) {
      classList.remove("fa-chevron-up");
      classList.add("fa-chevron-down");
      this.sortDir = -1;
    } else {
      classList.add("fa-chevron-up");
      classList.remove("fa-chevron-down");
      this.sortDir = 1;
    }
    this.sortArr("status");
  }

  onSortClick1(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("fa-chevron-up")) {
      classList.remove("fa-chevron-up");
      classList.add("fa-chevron-down");
      this.sortDir = -1;
    } else {
      classList.add("fa-chevron-up");
      classList.remove("fa-chevron-down");
      this.sortDir = 1;
    }
    this.sortArr1("created_at");
  }
  onSortClickOID(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("fa-chevron-up")) {
      classList.remove("fa-chevron-up");
      classList.add("fa-chevron-down");
      this.sortDir = -1;
    } else {
      classList.add("fa-chevron-up");
      classList.remove("fa-chevron-down");
      this.sortDir = 1;
    }
    this.sortArrOID("order_no");
  }
  // onSortClickCN(event) {
  //   let target = event.currentTarget,
  //     classList = target.classList;

  //   if (classList.contains("fa-chevron-up")) {
  //     classList.remove("fa-chevron-up");
  //     classList.add("fa-chevron-down");
  //     this.sortDir = -1;
  //   } else {
  //     classList.add("fa-chevron-up");
  //     classList.remove("fa-chevron-down");
  //     this.sortDir = 1;
  //   }
  //   this.sortArrCN("first_name");

  //   this.sortArrCN("last_name");

  // }

  sortArr(colName: any) {
    this.pagedItems.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  sortArr1(colName1: any) {
    this.pagedItems.sort((a, b) => {
      a = a[colName1].toLowerCase();
      b = b[colName1].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  sortArrOID(colName2: any) {
    this.pagedItems.sort((a, b) => {
      a = a[colName2].toLowerCase();
      b = b[colName2].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  // sortArrCN(colName3: any) {
  //   this.pagedItems.sort((a, b) => {
  //     a = a[colName3].toLowerCase();
  //     b = b[colName3].toLowerCase();
  //     return a.localeCompare(b) * this.sortDir;
  //   });
  // }
  // --------------------------------------------//



  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }

  // onChangePage(pageOfItems: Array<any>) {
  //   this.loader = true;
  //   this.pageOfItems = pageOfItems;
  //   if (this.pageOfItems.length == 0) {
  //     this.first_id = 0;
  //     this.last_id = 0;
  //     this.loader = false;
  //   } else {
  //     this.first_id = this.pageOfItems[0].id
  //     this.last_id = this.pageOfItems[this.pageOfItems.length - 1].id;
  //     this.loader = false;
  //   }
  // }

  check_info_ID(e) {
    // console.log(e);
    var request = {
      "screen": "order ID",
      "column_name": "payment type",
      "search": e
    }
    this.loader = true;
    this.service.searchAPI(request).subscribe(res => {
      // console.log(res);
      this.loader = false;
      this.allOrdersList = res[0].orders;
    }, err => {
      // console.log(err);
      this.loader = false;
    });
  }
  check_info_date(d) {
    // console.log(d);

  }
  check_info_name(n) {
    // console.log(n);
    var request = {
      "screen": "order ID",
      "column_name": "customer Name",
      "search": n
    }
    this.loader = true;
    this.service.searchAPI(request).subscribe(res => {
      // console.log(res);
      this.loader = false;
      this.allOrdersList = res[0].orders;
    }, err => {
      // console.log(err);
      this.loader = false;
    });

  }
  check_info_payment_type(p) {
    // console.log(p);

  }
  check_info_status(s) {
    // console.log(s);

  }


  public viewValue(Id) {
    // console.log("Selected", Id);
    this.selectedInfoForView = Id;
    this.router.navigate(['/view-orders-page', Id]);
    localStorage.setItem('itsForPF', "PF");
  }

  bulkStatus(Index_id, item_s, selected_previous_status) {
    console.log(item_s);
    console.log(this.allOrdersList);
    console.log(this.statusArray);
    console.log(this.statusArray_main_one_userMatrix);
    this.sendThis_item_s = item_s;
    this.sendThis_selected_previous_status = selected_previous_status;

    if (item_s.status_name === "cancelled") {
      this.showOnlyForCancel = true;
    } else {
      this.showOnlyForCancel = false;
    }
    // if (this.selectedAlldata.length === 0) {
    //   $.notify({
    //     icon: "add_alert",
    //     message: "Please Select the Order"
    //   }, {
    //     type: 'info',
    //     timer: 1000,
    //     placement: {
    //       from: 'top',
    //       align: 'center'
    //     }
    //   });
    //   this.loader = false;
    //   this.selectedAlldata = [];
    //   console.log(this.selectedAlldata);
    //   this.getAllOrdersList();
    // } else {
    //   $('#bulk_status_update_id').modal();
    // }
  }
  reasonClose() {
    this.showThisMsgReasonRequired = false;
    $('#cancelation_reason').val("");
  }
  bulkStatusUpdate() {
    console.log(this.ShareThisSelectedList);
    if (this.sendThis_item_s.status_name === "placed") {
      var status = "Placed";
    }
    if (this.sendThis_item_s.status_name === "confirmed") {
      var status = "Confirmed";
    }

    if (this.sendThis_item_s.status_name === "in_process") {
      var status = "In Process";
    }
    if (this.sendThis_item_s.status_name === "ready_for_shipping") {
      var status = "Ready For Shipping";
    }
    if (this.sendThis_item_s.status_name === "out_for_delivery") {
      var status = "Out For Delivery";
    }
    if (this.sendThis_item_s.status_name === "delivered") {
      var status = "Delivered";
    }
    if (this.sendThis_item_s.status_name === "cancelled") {
      var status = "Cancelled";
    }
    console.log(this.sendThis_selected_previous_status);
    // console.log(this.selectedAlldata);
    console.log(this.pagedItems);
    var orderISsArray = [];
    for (var i = 0; i < this.pagedItems.length; i++) {
      if ($('#dynamicID' + i).prop("checked") === true) {
        if (this.pagedItems[i].status === this.sendThis_selected_previous_status) {
          orderISsArray.push(this.pagedItems[i].order_id);
        }
      }
    }
    console.log(orderISsArray);


    // console.log("seletec_data", this.selectedAlldata);
    console.log("access", this.statusArray_main_one_userMatrix);
    // console.log(this.statusArray_main_one_userMatrix_include_key);
    // for (var i = 0; i < this.pagedItems.length; i++) {
    //   if ($('#dynamicID' + i).prop("checked") === true) {
    //     var n = this.statusArray_main_one_userMatrix.includes(this.pagedItems[i].status);
    //     if (n) {
    //       this.arraychecking.push(this.pagedItems[i])
    //     } else {
    //       this.arraychecking = [];
    //     }
    //   }
    // }
    // console.log(this.arraychecking);
    console.log(this.sendThis_item_s.status_id);


    if (this.sendThis_item_s.status_name === "cancelled") {
      var cancelationReason = $('#cancelation_reason').val();
      if (cancelationReason === "" || cancelationReason === undefined || cancelationReason === null) {
        this.showThisMsgReasonRequired = true;
      } else {
        this.showThisMsgReasonRequired = false;
        console.log("You can");
        var NeworderISsArray = [];
        var NeworderISsArrayNew = [];
        var camparingArray = new Array();
        camparingArray[0] = "cancelled",
          camparingArray[1] = "out_for_delivery",
          camparingArray[2] = "delivered",
          camparingArray[3] = "payment_failed"
        console.log(camparingArray);
        for (var i = 0; i < this.pagedItems.length; i++) {
          if ($('#dynamicID' + i).prop("checked") === true) {
            var n = camparingArray.includes(this.pagedItems[i].status);
            if (n) {
              NeworderISsArrayNew.push(this.pagedItems[i].order_id);
            } else {
              // var NeworderISsArray = [];
              NeworderISsArray.push(this.pagedItems[i].order_id);
            }
          }
        }
        console.log(NeworderISsArray);
        if (NeworderISsArray.length === 0) {
          $.notify({
            icon: "add_alert",
            message: "You Can't change Into" + " " + status + " " + "Status"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
          this.selectedAlldata = [];

          NeworderISsArray = [];
          this.arraychecking = [];
          console.log(this.selectedAlldata);
          $("#bulk_status_confirmation_open").modal("hide");
        } else {
          var cancelationReason = $('#cancelation_reason').val();
          console.log(cancelationReason);
          // if (cancelationReason === "" || cancelationReason === undefined || cancelationReason === null) {
          //   this.showThisMsgReasonRequired = true;
          // } else {
          // this.showThisMsgReasonRequired = false;
          console.log(cancelationReason);
          console.log(NeworderISsArray);
          var reqCancel = {
            "status_id": this.sendThis_item_s.status_id,
            "order_id": NeworderISsArray,
            "reason": cancelationReason
          }
          console.log(reqCancel);
          this.service.updateBulk(reqCancel).subscribe(res => {
            console.log(res);
            this.loader = false;
            this.updateMesg = res;
            $.notify({
              icon: "add_alert",
              message: this.updateMesg.message
            }, {
              type: 'info',
              timer: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
            this.selectedAlldata = [];

            NeworderISsArray = [];
            this.arraychecking = [];
            console.log(this.selectedAlldata);
            this.showThisMsgReasonRequired = false;
            $('#cancelation_reason').val("");
            $("#bulk_status_confirmation_open").modal("hide");
            this.getAllOrdersList();
          }, err => {
            console.log(err);
            this.selectedAlldata = [];

            NeworderISsArray = [];
            console.log(this.selectedAlldata);
            this.loader = false;
            $("#bulk_status_confirmation_open").modal("hide");
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
            this.selectedAlldata = [];

            this.arraychecking = [];
          });
        }
      }
    } else {
      if (orderISsArray.length === 0) {
        $.notify({
          icon: "add_alert",
          message: "You Can't change Into" + " " + status + " " + "Status"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.loader = false;
        this.selectedAlldata = [];

        NeworderISsArray = [];
        this.arraychecking = [];
        console.log(this.selectedAlldata);
        $("#bulk_status_confirmation_open").modal("hide");
      } else {

        var req = {
          "status_id": this.sendThis_item_s.status_id,
          "order_id": orderISsArray,
          "reason": null
        }
        console.log(req);
        this.service.updateBulk(req).subscribe(res => {
          console.log(res);
          this.loader = false;
          this.updateMesg = res;
          $.notify({
            icon: "add_alert",
            message: this.updateMesg.message
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          NeworderISsArray = [];
          this.selectedAlldata = [];

          this.arraychecking = [];
          console.log(this.selectedAlldata);
          $("#bulk_status_confirmation_open").modal("hide");
          this.getAllOrdersList();
        }, err => {
          console.log(err);
          NeworderISsArray = [];
          this.selectedAlldata = [];

          this.arraychecking = [];
          console.log(this.selectedAlldata);
          $("#bulk_status_confirmation_open").modal("hide");
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

  closethisNow() {
    // $("#remove_selecte_store").modal("hide");
    $("#bulk_status_confirmation_close").trigger("click");
  }
  // ngAfterViewInit() {

  //   this.onPrintInvoice("item");
  // }
  onPrintInvoice(item) {
    console.log(item);
    var win = window.open('', 'printwindow');
    // var win = window.open('', 'PRINT', 'height=400,width=600');
    // win.document.write('./print.html');
    win.document.write(document.getElementById('elem').innerHTML);
    this.testingNow = "abc";
    win.print();

  }


}
