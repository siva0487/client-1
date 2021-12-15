import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'underscore';
import { ExportService } from 'app/_services/export.service';
import { SharedServiceService } from 'app/_services/shared-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  public loader: boolean = false;

  selectedInfoForView: any;
  isButtonEnable: boolean;
  pos: string;
  post: string;
  dynamicorderDetailsByCheckBox: any[];
  dict = {};
  selectedInfoForEdit: any;
  selectedAlldata = [];
  selectedAlldataArray = [];
  list: any;
  shareThisID: any;
  deletedRes: any;
  downloadAndCancelArray = [];
  finalData: any;
  modifiedStatus: string;
  message_display: boolean;
  showThisScreenWithPermissions: any;
  allPermissionForOnlyThisScreen: any;
  permissionForOnlyThisScreen = [];
  custome_download: FormGroup;
  submitted: boolean;
  from_date: any;
  to_date: any;
  customeData: any;
  statustotalList: any;
  Store_status_List: any;
  pager: any = {};
  pagedItems: any;
  howmanySelectedArray = [];
  ShareThisSelectedList: number = 0; 
  sortDir = 1; //1= 'ASE' -1= DSC
  constructor(private formBuilder: FormBuilder, private router: Router, private exportService: ExportService, private service: SharedServiceService) {
    this.getStoresList();
    this.statusList();
    // this.sortArrSN("store_name");
    // this.sortArrCITY("city");
    this.Store_status_List = [
      {
        "status": "Active",
        "value": "true"
      },
      {
        "status": "Inactive",
        "value": "false"
      }
    ]

    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Stores Management") {
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
    // console.log(this.allPermissionForOnlyThisScreen);

    this.custome_download = this.formBuilder.group({
      from_date: [''],
      to_date: ['']
      // status_id: ['', Validators.required]
    });

    // this.custome_search = this.formBuilder.group({
    //   order_id: [''],
    //   store_mobile_number: [''],
    //   store_city: [''],
    //   store_state: [''],
    //   order_status: ['']
    // });
  }
  get a() { return this.custome_download.controls; }

  public customeExport() {
    this.loader = true;
    this.submitted = true;
    if (this.custome_download.invalid) {
      this.loader = false;
      return;
    }
    console.log(this.custome_download.value);

    this.from_date = new Date(this.a.from_date.value);
    this.to_date = new Date(this.a.to_date.value);
    // console.log(this.from_date, this.to_date);
    // console.log(this.to_date - this.from_date);
    if ((this.to_date - this.from_date) >= 0) {
      this.service.downloadCustomeStores(this.custome_download.value).subscribe(res => {
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
          // for (var i = 0; i < this.customeData[0].orders; i++) {
          //   var change = {
          //     "city": this.customeData[0].orders,
          //     "country": this.customeData[0].orders,
          //     "created_at": this.customeData[0].orders,
          //     "email": this.customeData[0].orders,
          //     "end_slot_time": this.customeData[0].orders,
          //     "first_name": this.customeData[0].orders,
          //     "last_name": this.customeData[0].orders,
          //     "line_1": this.customeData[0].orders,
          //     "line_2": this.customeData[0].orders,
          //     "mobile": this.customeData[0].orders,
          //     "order_id": this.customeData[0].orders,
          //     "order_no": this.customeData[0].orders,
          //     "payment_method": this.customeData[0].orders,
          //     "pincode": this.customeData[0].orders,
          //     "start_slot_time": this.customeData[0].orders,
          //     "state": this.customeData[0].orders,
          //     "status": this.customeData[0].status,
          //     "street": this.customeData[0].street,
          //     "total_amount": this.customeData[0].total_amount,
          //     "updated_at": this.customeData[0].updated_at
          //   }
          // }
          this.exportService.exportExcel(this.customeData[0].stores, 'Store Export');
          this.loader = false;
          $('#from_date').val("");
          $('#to_date').val("");
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
    this.submitted = false;
    this.custome_download.reset();
  }

  public customeSearch() {
    if ($('#store_name_filter').val() != "") {
      var request = {
        "screen": "stores",
        "column_name": "name",
        "search": $('#store_name_filter').val()
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
          this.finalData = res[0].stores;
          this.setPage(1);
          // console.log(this.finalData);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });
    } else if ($('#store_mobile_number').val() != "") {
      var request = {
        "screen": "stores",
        "column_name": "Mobile number",
        "search": $('#store_mobile_number').val()
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
          this.finalData = res[0].stores;
          this.setPage(1);
          // console.log(this.finalData);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#store_city').val() != "") {
      var request = {
        "screen": "stores",
        "column_name": "city",
        "search": $('#store_city').val()
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
          this.finalData = res[0].stores;
          this.setPage(1);
          // console.log(this.finalData);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#store_state').val() != "") {
      var request = {
        "screen": "stores",
        "column_name": "state",
        "search": $('#store_state').val()
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
          this.finalData = res[0].stores;
          this.setPage(1);
          // console.log(this.finalData);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#status_filter').val() != "") {
      var request = {
        "screen": "stores",
        "column_name": "status",
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
          this.finalData = res[0].stores;
          this.setPage(1);
          // console.log(this.finalData);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else {

    }


  }
  public reSet() {
    $('#store_name_filter').val("");
    $('#store_mobile_number').val("");
    $('#store_city').val("");
    $('#store_state').val("");
    $('#status_filter').val("");

    $("#store_name_filter").attr("readonly", "true");
    $("#store_mobile_number").attr("readonly", "true");
    $("#store_city").attr("readonly", "true");
    $("#store_state").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

    this.getStoresList();

    // $('.collapsed').trigger('click');
    // $('#heading1').click();
  }
  enableThis1() {
    document.getElementById('store_name_filter').removeAttribute('readonly');
    $('#store_mobile_number').val("");
    $('#store_city').val("");
    $('#store_state').val("");
    $('#status_filter').val("");

    $("#store_mobile_number").attr("readonly", "true");
    $("#store_city").attr("readonly", "true");
    $("#store_state").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis2() {
    document.getElementById('store_mobile_number').removeAttribute('readonly');
    $('#store_name_filter').val("");
    $('#store_city').val("");
    $('#store_state').val("");
    $('#status_filter').val("");

    $("#store_name_filter").attr("readonly", "true");
    $("#store_city").attr("readonly", "true");
    $("#store_state").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis3() {
    document.getElementById('store_city').removeAttribute('readonly');
    $('#store_name_filter').val("");
    $('#store_mobile_number').val("");
    $('#store_state').val("");
    $('#status_filter').val("");

    $("#store_name_filter").attr("readonly", "true");
    $("#store_mobile_number").attr("readonly", "true");
    $("#store_state").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis4() {
    document.getElementById('store_state').removeAttribute('readonly');
    $('#store_name_filter').val("");
    $('#store_mobile_number').val("");
    $('#store_city').val("");
    $('#status_filter').val("");

    $("#store_name_filter").attr("readonly", "true");
    $("#store_mobile_number").attr("readonly", "true");
    $("#store_city").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);
  }
  eraiseAll() {
    $('#store_name_filter').val("");
    $('#store_mobile_number').val("");
    $('#store_city').val("");
    $('#store_state').val("");
    $('#status_filter').val("");
  }
  public selectedStatusInfor(v) {
    // console.log(v);
    $('#store_name_filter').val("");
    $('#store_mobile_number').val("");
    $('#store_city').val("");
    $('#store_state').val("");

    $("#store_name_filter").attr("readonly", "true");
    $("#store_mobile_number").attr("readonly", "true");
    $("#store_city").attr("readonly", "true");
    $("#store_state").attr("readonly", "true");

  }
  public statusList() {
    this.loader = true;
    this.service.getAllOrderStatus().subscribe(res => {
      // console.log(res);
      this.statustotalList = res;
      // console.log(this.statustotalList.statuses);
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
    });
  }
  all(data) {
    this.selectedAlldata = data;
    // console.log(this.selectedAlldata);
    if ($('#selectall').prop("checked") == true) {
      $('body').on('click', '#selectall', function () {
        $('.singlechkbox').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata);
      this.ShareThisSelectedList = this.pagedItems.length;
    }
    else if ($('#selectall').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata = [];
      this.ShareThisSelectedList = 0;
      // console.log(this.selectedAlldata);
    }

  }
  // ----------------------------------------------//
  onSortClickSN(event) {
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
    this.sortArrSN("store_name");
  }
  sortArrSN(colName: any) {
    this.pagedItems.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  onSortClickCITY(event) {
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
    this.sortArrCITY("city");
  }
  sortArrCITY(colNameC: any) {
    this.pagedItems.sort((a, b) => {
      a = a[colNameC].toLowerCase();
      b = b[colNameC].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  //-------------------------------------------------------// 
  generate() {
    console.log(this.ShareThisSelectedList);
    if (this.ShareThisSelectedList > 0) {
      // var finalData = _.map(this.selectedAlldata, function (item) {
      //   return _.pick(item, "store_name", "ds_code", "plant_code", "phone_no", "city", "state", "country", "is_active", "line_1", "line_2", "street", "pincode", "lat_longs", "serviceable_pincodes")
      // })
      // finalData = finalData.filter((item) => {
      //   return item != null;
      // });
      // console.log(finalData);

      var finalDataModified = [];
      for (var i = 0; i < this.pagedItems.length; i++) {
        if ($('#dynamicID' + i).prop("checked") === true) {
          var use = {
            "Store Name": this.pagedItems[i].store_name,
            "DS Code": this.pagedItems[i].ds_code,
            "Plant Code": this.pagedItems[i].plant_code,
            "Phone Number": this.pagedItems[i].phone_no,
            "City": this.pagedItems[i].city,
            "State": this.pagedItems[i].state,
            "Country": this.pagedItems[i].country,
            "Is Active": this.pagedItems[i].is_active,
            "Line 1": this.pagedItems[i].line_1,
            "Line 2": this.pagedItems[i].line_2,
            "Street": this.pagedItems[i].street,
            "Pincode": this.pagedItems[i].pincode,
            "Lat Longs": this.pagedItems[i].lat_longs,
            "Serviceable Pincodes": this.pagedItems[i].serviceable_pincodes
          }
          finalDataModified.push(use);
        }
      }

      this.exportService.exportExcel(finalDataModified, 'Store Export');
      $('#selectall').prop("checked", false);
      this.getStoresList();
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
    // console.log(data);

    if (this.dict.hasOwnProperty(event)) {
      delete this.dict[event];
    } else {
      this.dict[event] = data;
    }
    this.selectedAlldata = [];
    for (var key in this.dict) {
      this.selectedAlldata.push(this.dict[key]);
    }
    // console.log(this.selectedAlldata);


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
  ngOnInit(): void {
  }

  public getStoresList() {
    this.loader = true;
    this.service.getAllStores().subscribe(getStoresListRes => {
      // console.log(getStoresListRes);
      this.list = getStoresListRes;
      if (getStoresListRes === null) {
        this.loader = false;
        this.message_display = true;
      } else {
        this.finalData = this.list[0].stores;
        // console.log(this.finalData);
        this.setPage(1);
        this.loader = false;
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
    })
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
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
    this.loader = true;
    if (page < 1 || page > this.pager.totalPages) {
      this.loader = false;
      return;
    }

    // get pager object from service
    this.pager = this.getPager(this.finalData.length, page);

    // get current page of items
    this.pagedItems = this.finalData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
    this.loader = false;
  }
  public viewValue(Id) {
    this.selectedInfoForView = Id;
    this.router.navigate(['/store-view-details', Id]);
  }
  public addNewStore() {
    this.router.navigate(['/add-new-store']);
  }

  public forDelete(id) {
    this.shareThisID = id;
    // console.log(this.shareThisID);
  }
  public deleteThisNow() {
    // console.log(this.shareThisID);
    this.loader = true;
    this.service.deleteTheSelectedStore(this.shareThisID).subscribe(res => {
      // console.log(res);
      this.deletedRes = res;
      $("#remove_selecte_store").modal("hide");
      this.getStoresList();
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.deletedRes.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }, err => {
      // console.log(err);
      this.loader = false;
    });
  }

  public closethisNow() {
    // $("#remove_selecte_store").modal("hide");
    $("#profile_edit_verified").trigger("click")
  }
}
