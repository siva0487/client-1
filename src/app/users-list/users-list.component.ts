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
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  selectedInfoForView: any;
  isButtonEnable: boolean;
  pos: string;
  post: string;
  dynamicorderDetailsByCheckBox: any[];
  dict = {};
  selectedInfoForEdit: any;
  finalData: { name: string; contact: string; user_id: string; email: string; role: string; status: string; }[];
  selectedAlldata = []; loader: boolean;
  getResResult: any;
  bindthisUserInfo: any;
  selectedAlldataArray = [];
  shareThisID: any;
  deletedRes: any;
  message_display: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  custome_download: FormGroup;
  custome_search: FormGroup;
  submitted: boolean;
  to_date: any;
  from_date: any;
  customeData: any;
  pager: any = {};
  pagedItems: any;

  statustotalList: { status: string; value: string; }[];
  howmanySelectedArray = [];
  ShareThisSelectedList: number = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private exportService: ExportService, private service: SharedServiceService) {
    this.getTheListOfUsers();

    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "User Management") {
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
    this.writePermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    console.log(this.writePermissionForOnlyThisScreen);

    this.custome_download = this.formBuilder.group({
      from_date: [''],
      to_date: ['']
      // status_id: ['', Validators.required]
    });

    // this.custome_search = this.formBuilder.group({
    //   order_id: [''],
    //   mobile_number_filter: [''],
    //   user_email_filter: [''],
    //   user_role_filter: [''],
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
      this.service.downloadCustomOMSUsers(this.custome_download.value).subscribe(res => {
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
          this.exportService.exportExcel(this.customeData[0].oms_users, 'Users List Export');
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
    if ($('#name_filter').val() != "") {
      var request = {
        "screen": "users",
        "column_name": "name",
        "search": $('#name_filter').val()
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
          this.bindthisUserInfo = res[0].oms_users;
          this.setPage(1);
          // console.log(this.bindthisUserInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });
    } else if ($('#mobile_number_filter').val() != "") {
      var request = {
        "screen": "users",
        "column_name": "Mobile number",
        "search": $('#mobile_number_filter').val()
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
          this.bindthisUserInfo = res[0].oms_users;
          this.setPage(1);
          // console.log(this.bindthisUserInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#user_email_filter').val() != "") {
      var request = {
        "screen": "users",
        "column_name": "email",
        "search": $('#user_email_filter').val()
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
          this.bindthisUserInfo = res[0].oms_users;
          this.setPage(1);
          // console.log(this.bindthisUserInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#user_role_filter').val() != "") {
      var request = {
        "screen": "users",
        "column_name": "role",
        "search": $('#user_role_filter').val()
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
          this.bindthisUserInfo = res[0].oms_users;
          this.setPage(1);
          // console.log(this.bindthisUserInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else if ($('#status_filter').val() != "") {
      var request = {
        "screen": "users",
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
          this.bindthisUserInfo = res[0].oms_users;
          this.setPage(1);
          // console.log(this.bindthisUserInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else {

    }


  }
  public reSet() {
    $('#name_filter').val("");
    $('#mobile_number_filter').val("");
    $('#user_email_filter').val("");
    $('#user_role_filter').val("");
    $('#status_filter').val("");

    $("#name_filter").attr("readonly", "true");
    $("#mobile_number_filter").attr("readonly", "true");
    $("#user_email_filter").attr("readonly", "true");
    $("#user_role_filter").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

    this.getTheListOfUsers();

    // $('.collapsed').trigger('click');
    // $('#heading1').click();
  }
  enableThis1() {
    document.getElementById('name_filter').removeAttribute('readonly');
    $('#mobile_number_filter').val("");
    $('#user_email_filter').val("");
    $('#user_role_filter').val("");
    $('#status_filter').val("");

    $("#mobile_number_filter").attr("readonly", "true");
    $("#user_email_filter").attr("readonly", "true");
    $("#user_role_filter").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis2() {
    document.getElementById('mobile_number_filter').removeAttribute('readonly');
    $('#name_filter').val("");
    $('#user_email_filter').val("");
    $('#user_role_filter').val("");
    $('#status_filter').val("");

    $("#name_filter").attr("readonly", "true");
    $("#user_email_filter").attr("readonly", "true");
    $("#user_role_filter").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis3() {
    document.getElementById('user_email_filter').removeAttribute('readonly');
    $('#name_filter').val("");
    $('#mobile_number_filter').val("");
    $('#user_role_filter').val("");
    $('#status_filter').val("");

    $("#name_filter").attr("readonly", "true");
    $("#mobile_number_filter").attr("readonly", "true");
    $("#user_role_filter").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);

  }
  enableThis4() {
    document.getElementById('user_role_filter').removeAttribute('readonly');
    $('#name_filter').val("");
    $('#mobile_number_filter').val("");
    $('#user_email_filter').val("");
    $('#status_filter').val("");

    $("#name_filter").attr("readonly", "true");
    $("#mobile_number_filter").attr("readonly", "true");
    $("#user_email_filter").attr("readonly", "true");
    // $('#status_filter').attr('disabled', true);
  }
  eraiseAll() {
    $('#name_filter').val("");
    $('#mobile_number_filter').val("");
    $('#user_email_filter').val("");
    $('#user_role_filter').val("");
    $('#status_filter').val("");
  }
  public selectedStatusInfor(v) {
    // console.log(v);
    $('#name_filter').val("");
    $('#mobile_number_filter').val("");
    $('#user_email_filter').val("");
    $('#user_role_filter').val("");
    $("#name_filter").attr("readonly", "true");
    $("#mobile_number_filter").attr("readonly", "true");
    $("#user_email_filter").attr("readonly", "true");
    $("#user_role_filter").attr("readonly", "true");

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
  generate() {
    console.log(this.ShareThisSelectedList);
    if (this.ShareThisSelectedList > 0) {
      // var finalData = _.map(this.selectedAlldata, function (item) {
      //   return _.pick(item, "first_name", "last_name", "mobile", "email", "role_name", "store_name", "is_active")
      // })
      // finalData = finalData.filter((item) => {
      //   return item != null;
      // });
      // console.log(finalData);

      var finalDataModified = [];
      for (var i = 0; i < this.pagedItems.length; i++) {
        if ($('#dynamicID' + i).prop("checked") === true) {
          var use = {
            "First Name": this.pagedItems[i].first_name,
            "Last Name": this.pagedItems[i].last_name,
            "Mobile": this.pagedItems[i].mobile,
            "Email": this.pagedItems[i].email,
            "Role Name": this.pagedItems[i].role_name,
            "Store Name": this.pagedItems[i].store_name,
            "Is Active": this.pagedItems[i].is_active
          }
          finalDataModified.push(use);
        }
      }
      this.exportService.exportExcel(finalDataModified, 'Users List Export');
      $('#selectall').prop("checked", false);
      this.getTheListOfUsers();

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
    this.statustotalList = [
      {
        "status": "Active",
        "value": "true"
      },
      {
        "status": "Inactive",
        "value": "false"
      }
    ]
  }
  public viewValue(Id) {
    this.selectedInfoForView = Id;
    this.router.navigate(['/users-list-details', Id]);
  }
  public addNewUser() {
    this.router.navigate(['/add-new-user']);
  }


  public getTheListOfUsers() {
    this.loader = true;
    this.service.getALLuserInformation().subscribe(getRes => {
      // console.log(getRes);
      if (getRes === null) {
        this.message_display = true;
        this.loader = false;
      } else {
        this.loader = false;
        this.getResResult = getRes;
        this.bindthisUserInfo = this.getResResult[0].oms_users;
        this.setPage(1);
      }
    }, err => {
      // console.log(err);
      this.loader = false;
    });
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
    this.pager = this.getPager(this.bindthisUserInfo.length, page);

    // get current page of items
    this.pagedItems = this.bindthisUserInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.loader = false;
  }


  public forDelete(id) {
    this.shareThisID = id;
    // console.log(this.shareThisID);
  }
  public deleteThisNow() {
    // console.log(this.shareThisID);
    this.loader = true;
    this.service.deleteTheSelectedUser(this.shareThisID).subscribe(res => {
      // console.log(res);
      this.deletedRes = res;
      $("#remove_new_user").modal("hide");
      this.getTheListOfUsers();
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
    // $("#remove_new_user").modal("hide");
    $("#profile_edit_verified_user").trigger("click")
  }
}
