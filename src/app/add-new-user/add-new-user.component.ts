import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
import * as _ from 'underscore';
declare var $: any;

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
  createNewUserForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  AllstoresInfo: any;
  AllrolesInfo: any;
  finalStoresListArray: any;
  finalRolesListArray: any;
  finalModifiedArray = [];
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  afterResultstatus: any;
  screensList: any;
  finalScreensList: any;
  is_read: any;
  dict = {};
  dict1 = {};
  readCheckBoxArray = [];
  WriteCheckBoxArray = [];
  permissionRes: any;
  userStatusSet: { status: string; is_active: string; }[];
  allScreens: { screens: { screen_id: string; screen_name: string; is_active: boolean; }[]; }[];
  permissionsMessage: boolean = false;
  userpermissionsMessage: boolean = false;
  pleaseAssigneRoleFirst: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  finalRolesArray = [];
  getstatusArray: any;
  finalModifiedStatusArray = [];
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.createNewUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      role_id: ['', Validators.required],
      store_id: ['', Validators.required],
      is_active: ['', Validators.required]
    });
    this.getStore_and_RoleDetails();
    this.getAllscreensList();
    this.getStatusList();
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
    // console.log(this.writePermissionForOnlyThisScreen);
  }
  get a() { return this.createNewUserForm.controls; }

  ngOnInit(): void {
    this.userStatusSet =
      [{
        "status": "Active",
        "is_active": "true"
      },
      {
        "status": "Inactive",
        "is_active": "false"
      }
      ]


    this.allScreens = [
      {
        "screens": [
          {
            "screen_id": "f44b7f4c-1538-11eb-bbea-5f81c1b416d2",
            "screen_name": "Dashboard",
            "is_active": true
          },
          {
            "screen_id": "f44b7f4d-1538-11eb-bbea-97c148e2290b",
            "screen_name": "Orders",
            "is_active": true
          },
          {
            "screen_id": "f44b7f4f-1538-11eb-bbea-fbaeba45ca68",
            "screen_name": "Stores Management",
            "is_active": true
          },
          {
            "screen_id": "f44b7f50-1538-11eb-bbea-1b6a91ebb497",
            "screen_name": "Order Rating and Review",
            "is_active": true
          },
          {
            "screen_id": "f44b7f51-1538-11eb-bbea-47631b7cd91e",
            "screen_name": "Returns and Refunds",
            "is_active": true
          },
          {
            "screen_id": "f44b7f52-1538-11eb-bbea-abf7847b5c97",
            "screen_name": "Subscription",
            "is_active": true
          },
          {
            "screen_id": "f44b7f53-1538-11eb-bbea-f355dc24995a",
            "screen_name": "Configurations",
            "is_active": true
          },
          {
            "screen_id": "f44b7f54-1538-11eb-bbea-9bd490cb4cf6",
            "screen_name": "User Management",
            "is_active": true
          },
          {
            "screen_id": "f44b7f4e-1538-11eb-bbea-dfdd175efc68",
            "screen_name": "Customers",
            "is_active": true
          },
          {
            "screen_id": "b54a9840-1539-11eb-bbea-17bb3419d2cd",
            "screen_name": "carts",
            "is_active": true
          }
        ]
      }
    ]
    // console.log(this.allScreens[0].screens);


  }

  public getAllscreensList() {
    this.loader = true;
    this.service.getAllScreensAPI().subscribe(allscreensListres => {
      this.screensList = allscreensListres;
      this.finalScreensList = this.screensList[0].screens;
      // console.log(this.finalScreensList);

      for (var i = 0; i < this.finalScreensList.length; i++) {
        var final = {
          "screen_id": this.finalScreensList[i].screen_id,
          "screen_name": this.finalScreensList[i].screen_name,
          "is_read": false,
          "is_write": false,
          "is_active": this.finalScreensList[i].is_active
        }
        this.finalModifiedArray.push(final);
      }
      console.log(this.finalModifiedArray);

      this.loader = false;
    }, err => {
      this.loader = false;
      // console.log(err);
    });
  }

  getStatusList() {
    this.loader = true;
    this.service.getAllOrderStatus().subscribe(res => {
      console.log(res);
      this.getstatusArray = res
      console.log(this.getstatusArray.statuses);

      for (var i = 0; i < this.getstatusArray.statuses.length; i++) {
        if (this.getstatusArray.statuses[i].status === "placed") {
          var re0 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[0] = re0;
        }
        if (this.getstatusArray.statuses[i].status === "confirmed") {
          var re1 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[1] = re1;
        }
        if (this.getstatusArray.statuses[i].status === "pickup_confirmed") {
          var reNew = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[2] = reNew;
        }


        if (this.getstatusArray.statuses[i].status === "in_process") {
          var re2 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[3] = re2;
        }
        if (this.getstatusArray.statuses[i].status === "ready_for_shipping") {
          var re3 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[4] = re3;
        }
        if (this.getstatusArray.statuses[i].status === "out_for_delivery") {
          var re4 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[5] = re4;
        }
        if (this.getstatusArray.statuses[i].status === "delivered") {
          var re5 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[6] = re5;
        }
        if (this.getstatusArray.statuses[i].status === "cancelled") {
          var re6 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[7] = re6;
        }
        if (this.getstatusArray.statuses[i].status === "payment_failed") {
          var re7 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
            "is_read": false,
            "is_write": false,
          }
          this.finalModifiedStatusArray[8] = re7;
        }
      }
      console.log(this.finalModifiedStatusArray);

      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }

  public forUserPermission() {
    // console.log(this.a.role_id.value);
    if (this.a.role_id.value === "") {
      this.pleaseAssigneRoleFirst = false;
      // console.log("please selecte the role");
      $.notify({
        icon: "add_alert",
        message: "Please Assign the Role First",
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    } else {
      this.pleaseAssigneRoleFirst = true;
      $('#user_permission_id').attr("data-toggle", "modal");
    }
  }

  public checkingRead(index, item) {
    // console.log(index);
    // console.log(item);

    if ($("#checked_new" + index).prop('checked') == true) {
      // console.log("checked");
      this.is_read = {
        "is_read": true,
        "screen_id": item.screen_id
      };
      if (this.dict.hasOwnProperty(index)) {
        delete this.dict[index];
      } else {
        this.dict[index] = this.is_read;
      }
      this.readCheckBoxArray = [];
      for (var key in this.dict) {
        this.readCheckBoxArray.push(this.dict[key]);
      }
      // console.log(this.readCheckBoxArray);
    } else {
      // console.log("Un_checked");
      this.is_read = {
        "is_read": false,
        "screen_id": item.screen_id
      };
      if (this.dict.hasOwnProperty(index)) {
        delete this.dict[index];
      } else {
        this.dict[index] = this.is_read;
      }
      this.readCheckBoxArray = [];
      for (var key in this.dict) {
        this.readCheckBoxArray.push(this.dict[key]);
      }
      // console.log(this.readCheckBoxArray);
    }
  }

  public checkingWrite(index, item) {
    // console.log(index);
    // console.log(item);

    if ($("#checked_newNew").prop('checked') == true) {

      // console.log("checked_write");
      this.is_read = {
        "is_write": true,
        "screen_id": item.screen_id
      };
      if (this.dict1.hasOwnProperty(index)) {
        delete this.dict1[index];
      } else {
        this.dict1[index] = this.is_read;
      }
      this.WriteCheckBoxArray = [];
      for (var key in this.dict1) {
        this.WriteCheckBoxArray.push(this.dict1[key]);
      }
      // console.log(this.WriteCheckBoxArray);
    } else {
      // console.log("Un_checked_write");
      this.is_read = {
        "is_write": false,
        "screen_id": item.screen_id
      };
      if (this.dict1.hasOwnProperty(index)) {
        delete this.dict1[index];
      } else {
        this.dict1[index] = this.is_read;
      }
      this.WriteCheckBoxArray = [];
      for (var key in this.dict1) {
        this.WriteCheckBoxArray.push(this.dict1[key]);
      }
      // console.log(this.WriteCheckBoxArray);
    }
  }

  all_selecte() {
    if ($('#select_all_for_permissions').prop("checked") == true) {
      $('body').on('click', '#select_all_for_permissions', function () {
        $('.singlechkbox_read').prop('checked', this.checked);
        $('.singlechkbox_write').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
    }
    else if ($('#select_all_for_permissions').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
    }
  }

  all_selecte_status() {
    if ($('#select_all_for_permissions_status').prop("checked") == true) {
      $('body').on('click', '#select_all_for_permissions_status', function () {
        $('.singlechkbox_read_status').prop('checked', this.checked);
        $('.singlechkbox_write_status').prop('checked', this.checked);
      });
    }
    else if ($('#select_all_for_permissions_status').prop("checked") == false) {
    }
  }

  all_selecte_read_default(i) {
    if ($('#checked_newNew' + i).prop("checked") == true) {
      $('body').on('click', '#checked_newNew' + i, function () {
        $('#checked_new' + i).prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
    }
    else if ($('#checked_newNew' + i).prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
    }
  }

  all_selecte_read_default_status(i) {
    if ($('#checked_new1_status' + i).prop("checked") == true) {
      $('body').on('click', '#checked_new1_status' + i, function () {
        $('#checked_new_status' + i).prop('checked', this.checked);
      });
    }
    else if ($('#checked_new1_status' + i).prop("checked") == false) {
    }
  }


  public createNewUserPermission() {


    // console.log(this.readCheckBoxArray);
    // console.log(this.WriteCheckBoxArray);
    var MargedArray = this.readCheckBoxArray.concat(this.WriteCheckBoxArray);
    // console.log(this.finalModifiedArray);
    // console.log(MargedArray);

    this.loader = true;
    var FinalArrayForRequRead = [];
    for (var i = 0; i < this.finalModifiedArray.length; i++) {
      if ($('#checked_new' + i).prop("checked") === true) {
        var finalRequest = {
          "screen_id": this.finalModifiedArray[i].screen_id,
          "is_read": true
        }
      } else {
        var finalRequest = {
          "screen_id": this.finalModifiedArray[i].screen_id,
          "is_read": false
        }
      }
      FinalArrayForRequRead.push(finalRequest);
    }
    var FinalArrayForRequWrite = [];
    for (var i = 0; i < this.finalModifiedArray.length; i++) {
      if ($('#checked_newNew' + i).prop("checked") === true) {
        var finalRequest_write = {
          "screen_id": this.finalModifiedArray[i].screen_id,
          "is_write": true
        }
      } else {
        var finalRequest_write = {
          "screen_id": this.finalModifiedArray[i].screen_id,
          "is_write": false
        }
      }
      FinalArrayForRequWrite.push(finalRequest_write);
    }
    console.log(FinalArrayForRequRead);
    console.log(FinalArrayForRequWrite);

    var finalscreesArray = []
    for (var i = 0; i < FinalArrayForRequRead.length; i++) {
      var req = {
        "screen_id": FinalArrayForRequRead[i].screen_id,
        "is_read": FinalArrayForRequRead[i].is_read,
        "is_write": FinalArrayForRequWrite[i].is_write
      }
      finalscreesArray.push(req);
    }
    console.log(finalscreesArray);


    console.log(this.finalModifiedStatusArray);

    var FinalArrayForRequRead_status = [];
    for (var i = 0; i < this.finalModifiedStatusArray.length; i++) {
      if ($('#checked_new_status' + i).prop("checked") === true) {
        var finalRequest_status = {
          "status_id": this.finalModifiedStatusArray[i].status_id,
          "is_status_read": true
        }
      } else {
        var finalRequest_status = {
          "status_id": this.finalModifiedStatusArray[i].status_id,
          "is_status_read": false
        }
      }
      FinalArrayForRequRead_status.push(finalRequest_status);
    }
    var FinalArrayForRequWrite_status = [];
    for (var i = 0; i < this.finalModifiedStatusArray.length; i++) {
      if ($('#checked_new1_status' + i).prop("checked") === true) {
        var finalRequest_write_status = {
          "status_id": this.finalModifiedStatusArray[i].status_id,
          "is_status_write": true
        }
        FinalArrayForRequWrite_status.push(finalRequest_write_status);  
      } else {
        var finalRequest_write_status_new = {
          "status_id": this.finalModifiedStatusArray[i].status_id,
          "is_status_write": false
        }
        FinalArrayForRequWrite_status.push(finalRequest_write_status_new);
      }
    }

    console.log(FinalArrayForRequRead_status);
    console.log(FinalArrayForRequWrite_status);

    var finalscreesArray_for_status = []
    for (var i = 0; i < FinalArrayForRequRead_status.length; i++) {
      var req_status = {
        "status_id": FinalArrayForRequRead_status[i].status_id,
        "is_status_read": FinalArrayForRequRead_status[i].is_status_read,
        "is_status_write": FinalArrayForRequWrite_status[i].is_status_write
      }
      finalscreesArray_for_status.push(req_status);
    }
    console.log(finalscreesArray_for_status);

    console.log(this.screensList[0].screens);
    console.log(this.finalScreensList);
    var screenID = [];
    for (var i = 0; i < this.screensList[0].screens.length; i++) {
      if (this.screensList[0].screens[i].screen_name === "Orders") {
        var screen_id = {
          "screen_id": this.screensList[0].screens[i].screen_id
        }
        screenID.push(screen_id);
      }
    }
    var uesrMatrix = [{
      "screen_id": screenID[0].screen_id,
      "statuses": finalscreesArray_for_status
    }]
    var apiRequest = {
      "permissions": [
        {
          "role_id": this.a.role_id.value,
          "screens": finalscreesArray,
          "user_matrix": uesrMatrix
        }
      ]
    }
    console.log(apiRequest);
    this.loader = false;

    this.service.createNewPermission(apiRequest).subscribe(res => {
      console.log(res);
      this.permissionRes = res;
      $("#add_new_user_permissions").modal("hide");
      this.loader = false;
      this.permissionsMessage = true;
      this.userpermissionsMessage = false;
      $.notify({
        icon: "add_alert",
        message: "Permission has been created successfully",
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }, err => {
      console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: err.error.error_desc,
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

  public closethisNow() {
    // $("#remove_selecte_store").modal("hide");
    $("#profile_edit_verified").trigger("click")
  }

  public getStore_and_RoleDetails() {
    this.loader = true;
    this.service.getAllStores().subscribe(res => {
      // console.log(res);
      this.AllstoresInfo = res;
      // console.log(this.AllstoresInfo[0].stores);
      this.finalStoresListArray = this.AllstoresInfo[0].stores;
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Getting Some Network Issue while Getting the Store/Role List. Please Try Again",
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    });
    this.service.getAllRoles().subscribe(rolesRes => {
      // console.log(rolesRes);
      this.AllrolesInfo = rolesRes;
      // console.log(this.AllrolesInfo[0].roles);
      this.finalRolesListArray = this.AllrolesInfo[0].roles;
      for (var i = 0; i < this.finalRolesListArray.length; i++) {
        if (this.finalRolesListArray[i].is_active === true) {
          var final = {
            "is_active": this.finalRolesListArray[i].is_active,
            "role_id": this.finalRolesListArray[i].role_id,
            "role_name": this.finalRolesListArray[i].role_name
          }
          this.finalRolesArray.push(final);
        }
      }
      // console.log(this.finalRolesArray);
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Getting Some Network Issue while Getting the Store/Role List. Please Try Again",
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
  public createNewUser() {
    this.loader = true;
    this.submitted = true;
    if (this.createNewUserForm.invalid) {
      this.loader = false;
      if (this.permissionsMessage === false) {
        this.userpermissionsMessage = true;
      } else {
        this.userpermissionsMessage = false;
      }
      return;
    }
    // console.log(this.createNewUserForm.value);
    if (this.permissionsMessage === false) {
      this.loader = false;
      this.userpermissionsMessage = true;
      $.notify({
        icon: "add_alert",
        message: "Please Fill the All Required Fields",
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    } else {
      console.log(this.createNewUserForm.value);

      if (this.a.store_id.value === "for_admin") {
        console.log(this.finalStoresListArray);
        var storeArray = [];
        for (var i = 0; i < this.finalStoresListArray.length; i++) {
          storeArray.push(this.finalStoresListArray[i].store_id);
        }
        console.log(storeArray);
        var req = {
          "first_name": this.a.first_name.value,
          "last_name": this.a.last_name.value,
          "mobile": this.a.mobile.value,
          "email": this.a.email.value,
          "password": this.a.password.value,
          "role_id": this.a.role_id.value,
          "store_id": storeArray,
          "is_active": this.a.is_active.value
        }
        console.log(req);
        this.service.adminCreateNewUser(req).subscribe(result => {
          console.log(result);
          this.afterResultstatus = result;
          this.router.navigate(['/users-list']);
          this.loader = false;
          this.userpermissionsMessage = false;
          $.notify({
            icon: "add_alert",
            message: this.afterResultstatus.message,
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          storeArray = [];
        }, err => {
          console.log(err);
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: err.error.error_desc,
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
        var req = {
          "first_name": this.a.first_name.value,
          "last_name": this.a.last_name.value,
          "mobile": this.a.mobile.value,
          "email": this.a.email.value,
          "password": this.a.password.value,
          "role_id": this.a.role_id.value,
          "store_id": [this.a.store_id.value],
          "is_active": this.a.is_active.value
        }
        console.log(req);
        this.service.adminCreateNewUser(req).subscribe(result => {
          console.log(result);
          this.afterResultstatus = result;
          this.router.navigate(['/users-list']);
          this.loader = false;
          this.userpermissionsMessage = false;
          $.notify({
            icon: "add_alert",
            message: this.afterResultstatus.message,
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        }, err => {
          console.log(err);
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: err.error.error_desc,
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
  // public getAllScreens(){

  // }
  public cancel() {
    this.router.navigate(['/users-list']);
  }
}
