import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
// import { months } from 'moment';
declare var $: any;

@Component({
  selector: 'app-users-list-details',
  templateUrl: './users-list-details.component.html',
  styleUrls: ['./users-list-details.component.css']
})
export class UsersListDetailsComponent implements OnInit {
  sub: any;
  id: any;
  customer_ID: any;
  editUserForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  AllstoresInfo: any;
  AllrolesInfo: any;
  finalStoresListArray: any;
  finalRolesListArray: any;
  userInformation: any;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  afterResultstatus: any;
  checkEdit: boolean;
  userStatusSet: { status: string; is_active: string; }[];
  resultget: any;
  finalModifiedArray: any;
  is_read: any;
  dict = {};
  dict1 = {};
  readCheckBoxArray = [];
  WriteCheckBoxArray = [];
  permissionRes: any;
  permissionsMessage: boolean;
  userpermissionsMessage: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  finalRolesArray = [];
  userMatrixArray: any;
  getstatusArray: any;
  finalModifiedStatusArray = [];
  finalScreensList: any;
  screensList: any;
  modifiedUserMatrixArray = [];
  storeNameForAdmin: any;
  storeGetemail: any;
  storeGetfirst_name: any;
  storeGetis_active: any;
  storeGetlast_name: any;
  storeGetmobile: any;
  storeGetpassword: any;
  storeGetrole_id: any;
  storeGetrole_name: any;
  storeGetuser_id: any;
  storeGetstore_id: any;
  storeGetstore_name: any;
  assigne: any;
  makethisTrue: boolean;
  forUpdateUsersArray = [];
  takefromThis: any;
  req1: any;
  MixedArray = [];
  MixedArrayN = [];
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
      // console.log(this.id.user_id);
    });
    this.getDetails(this.id.user_id);
    this.editUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      role_id: ['', Validators.required],
      store_id: ['', Validators.required],
      is_active: ['', Validators.required]
    });
    this.getAllscreensList();
    this.getStatusList();
    this.getStore_and_RoleDetails();
    this.getSelectedUserPermissions(this.id.role_id);

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
  get a() { return this.editUserForm.controls; }

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
  }

  public getStore_and_RoleDetails() {
    this.loader = true;
    this.service.getAllStores().subscribe(res => {
      // console.log(res);
      this.AllstoresInfo = res;
      console.log(this.AllstoresInfo[0].stores);
      this.finalStoresListArray = this.AllstoresInfo[0].stores;
      this.forUpdateUsersArray = this.AllstoresInfo[0].stores;
      var setOfStoreIDs = [];
      for (var i = 0; i < this.finalStoresListArray.length; i++) {
        setOfStoreIDs.push(this.finalStoresListArray[i].store_id);
      }
      console.log(setOfStoreIDs);
      var addthis = {
        "store_id": setOfStoreIDs,
        "store_name": "All Stores",
      }
      this.finalStoresListArray.push(addthis);
      console.log(this.finalStoresListArray);
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
      console.log(this.finalRolesArray);
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

  public getDetails(id) {
    this.service.getSlectedUserDetails(id).subscribe(res => {
      console.log(res);
      this.userInformation = res;
      // this.storeNameForAdmin = this.userInformation.store_name;

      // this.assigne = "All Stroes";
      // this.storeGetemail = this.userInformation.email;
      // this.storeGetfirst_name = this.userInformation.first_name;
      // this.storeGetis_active = this.userInformation.is_active;
      // this.storeGetlast_name = this.userInformation.last_name;
      // this.storeGetmobile = this.userInformation.mobile;
      // this.storeGetpassword = this.userInformation.password;
      // this.storeGetrole_id = this.userInformation.role_id;
      // this.storeGetrole_name = this.userInformation.role_name;
      // this.storeGetuser_id = this.userInformation.user_id;
      // this.storeGetstore_id = this.userInformation.store_id;
      // if (this.storeGetstore_id.length > 1) {
      //   this.storeGetstore_name = "All Stores";
      //   this.makethisTrue = true;
      // } else {
      //   this.makethisTrue = false;
      //   this.storeGetstore_name = this.userInformation.store_name;
      // }
      // console.log(this.storeGetstore_name);

    });
  }
  edit() {
    this.checkEdit = true;
    this.makethisTrue = false;

    $('#store_id_name_id').attr('disabled', false);
    $('#edit_this').css("display", "none");
    $('#makenoneAfter').css("display", "none");
    $('#update_this').css("display", "block");
    document.getElementById('first_name_id').removeAttribute('readonly');
    document.getElementById('last_name_id').removeAttribute('readonly');
    document.getElementById('mobile_name_id').removeAttribute('readonly');
    document.getElementById('email_name_id').removeAttribute('readonly');
    document.getElementById('password_name_id').removeAttribute('readonly');
    $('#role_id_name_id').attr('disabled', false);
    $('#is_active_name_id').attr('disabled', false);
    $('#user_permission_id').attr('disabled', false);

  }
  public Update() {
    // this.loader = true;
    this.submitted = true;
    if (this.editUserForm.invalid) {
      if (this.permissionsMessage === false) {
        this.userpermissionsMessage = true;
      } else {
        this.userpermissionsMessage = false;
      }
      this.loader = false;
      return;
    }
    console.log(this.editUserForm.value);


    console.log(this.a.store_id.value);
    console.log(typeof (this.a.store_id.value));
    if (typeof (this.a.store_id.value) === "object") {
      console.log("No Checkthisarray");
      var checkthis = [];
      checkthis = this.a.store_id.value
    } else {
      console.log("Checkthisarray");
      console.log(this.a.store_id.value.includes(","));
      if (this.a.store_id.value.includes(",") === true) {
        var value = this.a.store_id.value.split(",");
        var checkthis = [];
        for (var i = 0; i < value.length; i++) {
          var allstoreCode = value[i];
          checkthis.push(allstoreCode);
        }
        console.log(checkthis);
      } else {
        var checkthis = [];
        checkthis.push(this.a.store_id.value);
      }
    }
    console.log(checkthis);
    this.takefromThis = this.editUserForm.value;
    if (checkthis.length > 1) {
      console.log(this.forUpdateUsersArray);
      var storeArray = [];
      for (var i = 0; i < this.forUpdateUsersArray.length; i++) {
        if (this.forUpdateUsersArray[i].store_name != "All Stores") {
          storeArray.push(this.forUpdateUsersArray[i].store_id);
        }
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
      this.service.updateTheSelectedUser(this.id.user_id, req).subscribe(result => {
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

      if (typeof (this.a.store_id.value) === "object") {
        this.req1 = {
          "first_name": this.a.first_name.value,
          "last_name": this.a.last_name.value,
          "mobile": this.a.mobile.value,
          "email": this.a.email.value,
          "password": this.a.password.value,
          "role_id": this.a.role_id.value,
          "store_id": this.a.store_id.value,
          "is_active": this.a.is_active.value
        }
      } else {
        this.req1 = {
          "first_name": this.a.first_name.value,
          "last_name": this.a.last_name.value,
          "mobile": this.a.mobile.value,
          "email": this.a.email.value,
          "password": this.a.password.value,
          "role_id": this.a.role_id.value,
          "store_id": [this.a.store_id.value],
          "is_active": this.a.is_active.value
        }
      }
      console.log(this.req1);
      this.service.updateTheSelectedUser(this.id.user_id, this.req1).subscribe(result => {
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



    // this.service.updateTheSelectedUser(this.id.user_id, this.editUserForm.value).subscribe(result => {
    //   console.log(result);
    //   this.afterResultstatus = result;
    //   this.router.navigate(['/users-list']);
    //   this.loader = false;
    //   $.notify({
    //     icon: "add_alert",
    //     message: this.afterResultstatus.message,
    //   }, {
    //     type: 'info',
    //     timer: 1000,
    //     placement: {
    //       from: 'top',
    //       align: 'center'
    //     }
    //   });
    // }, err => {
    //   console.log(err);
    //   this.loader = false;
    //   $.notify({
    //     icon: "add_alert",
    //     message: err,
    //   }, {
    //     type: 'info',
    //     timer: 1000,
    //     placement: {
    //       from: 'top',
    //       align: 'center'
    //     }
    //   });
    // })
  }
  public cancel() {
    this.router.navigate(['/users-list']);
  }
  public forUserPermission() {
    // console.log(this.a.role_id.value);
    $('#user_permission_id').attr("data-toggle", "modal");
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
          }
          this.finalModifiedStatusArray[0] = re0;
        }
        if (this.getstatusArray.statuses[i].status === "confirmed") {
          var re1 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[1] = re1;
        }
        if (this.getstatusArray.statuses[i].status === "pickup_confirmed") {
          var re2 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[2] = re2;
        }
        if (this.getstatusArray.statuses[i].status === "in_process") {
          var re3 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[3] = re3;
        }
        if (this.getstatusArray.statuses[i].status === "ready_for_shipping") {
          var re4 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[4] = re4;
        }
        if (this.getstatusArray.statuses[i].status === "out_for_delivery") {
          var re5 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[5] = re5;
        }
        if (this.getstatusArray.statuses[i].status === "delivered") {
          var re6 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[6] = re6;
        }
        if (this.getstatusArray.statuses[i].status === "cancelled") {
          var re7 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[7] = re7;
        }
        if (this.getstatusArray.statuses[i].status === "payment_failed") {
          var re8 = {
            "status_id": this.getstatusArray.statuses[i].status_id,
            "status": this.getstatusArray.statuses[i].status,
          }
          this.finalModifiedStatusArray[8] = re8;
        }

      }
      console.log(this.finalModifiedStatusArray);
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }
  public getSelectedUserPermissions(id) {
    this.service.selectedUserPermissions(id).subscribe(res => {
      console.log(res);
      this.resultget = res;
      this.finalModifiedArray = this.resultget[0].screens;
      this.service.getAllScreensAPI().subscribe(allscreensListres => {
        this.screensList = allscreensListres;
        this.finalScreensList = this.screensList[0].screens;
        console.log(this.finalScreensList);
        console.log(this.finalModifiedArray);
        var ListOne = [];
        var ListTwo = [];
        this.MixedArray = [];
        for (var i = 0; i < this.finalScreensList.length; i++) {
          ListOne.push(this.finalScreensList[i].screen_id);
        }
        for (var j = 0; j < this.finalModifiedArray.length; j++) {
          ListTwo.push(this.finalModifiedArray[j].screen_id);
        }
        console.log(ListOne);
        console.log(ListTwo);

        for (var k = 0; k < ListOne.length; k++) {
          if (ListTwo.includes(ListOne[k])) {
            this.MixedArray.push({
              "screen_id": this.finalModifiedArray[k].screen_id,
              "screen_name": this.finalModifiedArray[k].screen_name,
              "is_read": this.finalModifiedArray[k].is_read,
              "is_write": this.finalModifiedArray[k].is_write
            })
          } else {
            this.MixedArray.push({
              "screen_id": this.finalScreensList[k].screen_id,
              "screen_name": this.finalScreensList[k].screen_name,
              "is_read": false,
              "is_write": false
            })
          }
        }
        console.log(this.MixedArray);
        // });
        this.userMatrixArray = this.resultget[0].user_matrix[0].status;
        console.log(this.resultget[0].user_matrix[0].status);
        for (var i = 0; i < this.resultget[0].user_matrix[0].status.length; i++) {
          if (this.resultget[0].user_matrix[0].status[i].status_name === "placed") {
            var re0 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[0] = re0;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "confirmed") {
            var re1 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[1] = re1;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "pickup_confirmed") {
            var reNew = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[2] = reNew;
          }

          if (this.resultget[0].user_matrix[0].status[i].status_name === "in_process") {
            var re2 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[3] = re2;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "ready_for_shipping") {
            var re3 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[4] = re3;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "out_for_delivery") {
            var re4 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[5] = re4;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "delivered") {
            var re5 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[6] = re5;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "cancelled") {
            var re6 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[7] = re6;
          }
          if (this.resultget[0].user_matrix[0].status[i].status_name === "payment_failed") {
            var re7 = {
              "status_id": this.resultget[0].user_matrix[0].status[i].status_id,
              "status_name": this.resultget[0].user_matrix[0].status[i].status_name,
              "is_status_read": this.resultget[0].user_matrix[0].status[i].is_status_read,
              "is_status_write": this.resultget[0].user_matrix[0].status[i].is_status_write
            }
            this.modifiedUserMatrixArray[8] = re7;
          }
        }

        console.log(this.finalModifiedStatusArray);
        console.log(this.modifiedUserMatrixArray);
        var ListOneNN = [];
        var ListTwoNN = [];
        this.MixedArrayN = [];
        for (var l = 0; l < this.finalModifiedStatusArray.length; l++) {
          ListOneNN.push(this.finalModifiedStatusArray[l].status_id);
        }
        for (var m = 0; m < this.modifiedUserMatrixArray.length; m++) {
          ListTwoNN.push(this.modifiedUserMatrixArray[m].status_id);
        }
        console.log(ListOneNN);
        console.log(ListTwoNN);

        for (var a = 0; a < ListOneNN.length; a++) {
          if (ListTwoNN.includes(ListOneNN[a])) {
            this.MixedArrayN.push({
              "status_id": this.modifiedUserMatrixArray[a].status_id,
              "status_name": this.modifiedUserMatrixArray[a].status_name,
              "is_status_read": this.modifiedUserMatrixArray[a].is_status_read,
              "is_status_write": this.modifiedUserMatrixArray[a].is_status_write
            })
          } else {
            this.MixedArrayN.push({
              "status_id": this.finalModifiedStatusArray[a].status_id,
              "status_name": this.finalModifiedStatusArray[a].status,
              "is_status_read": false,
              "is_status_write": false
            })
          }
        }
        console.log(this.MixedArrayN);
      });





    }, err => {
      // console.log(err);
    });
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

    if ($("#checked_newNew" + index).prop('checked') == true) {
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
      console.log("Checkbox is checked.");
    }
    else if ($('#checked_newNew' + i).prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
  }
  public getAllscreensList() {
    this.loader = true;
    this.service.getAllScreensAPI().subscribe(allscreensListres => {
      this.screensList = allscreensListres;
      this.finalScreensList = this.screensList[0].screens;
      console.log(this.finalScreensList);
      this.loader = false;
    }, err => {
      this.loader = false;
      // console.log(err);
    });
  }

  public updateTheSelectedUserPermission() {
    // console.log(this.readCheckBoxArray);
    // console.log(this.WriteCheckBoxArray);
    var MargedArray = this.readCheckBoxArray.concat(this.WriteCheckBoxArray);
    // console.log(this.finalModifiedArray);
    // console.log(MargedArray);

    this.loader = true;
    var FinalArrayForRequRead = [];
    for (var i = 0; i < this.MixedArray.length; i++) {
      if ($('#checked_new' + i).prop("checked") === true) {
        var finalRequestT = {
          "screen_id": this.MixedArray[i].screen_id,
          "is_read": true
        }
        FinalArrayForRequRead.push(finalRequestT);
      } else if ($('#checked_new' + i).prop("checked") === false) {
        var finalRequestF = {
          "screen_id": this.MixedArray[i].screen_id,
          "is_read": false
        }
        FinalArrayForRequRead.push(finalRequestF);
      }
    }
    var FinalArrayForRequWrite = [];
    for (var i = 0; i < this.MixedArray.length; i++) {
      if ($('#checked_newNew' + i).prop("checked") === true) {
        var finalRequest_writeT = {
          "screen_id": this.MixedArray[i].screen_id,
          "is_write": true
        }
        FinalArrayForRequWrite.push(finalRequest_writeT);
      } else if ($('#checked_newNew' + i).prop("checked") === false) {
        var finalRequest_writeF = {
          "screen_id": this.MixedArray[i].screen_id,
          "is_write": false
        }
        FinalArrayForRequWrite.push(finalRequest_writeF);
      }
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
    // console.log(finalscreesArray);

    console.log(this.finalModifiedStatusArray);

    var FinalArrayForRequRead_status = [];
    for (var i = 0; i < this.finalModifiedStatusArray.length; i++) {
      if ($('#checked_new_status' + i).prop("checked") === true) {
        var finalRequest_status = {
          "status_id": $('#checked_new_status' + i).val(),
          "is_status_read": true
        }
      } else {
        var finalRequest_status = {
          "status_id": $('#checked_new_status' + i).val(),
          "is_status_read": false
        }
      }
      FinalArrayForRequRead_status.push(finalRequest_status);
    }
    var FinalArrayForRequWrite_status = [];
    for (var i = 0; i < this.finalModifiedStatusArray.length; i++) {
      if ($('#checked_new1_status' + i).prop("checked") === true) {
        var finalRequest_write_status = {
          "status_id": $('#checked_new1_status' + i).val(),
          "is_status_write": true
        }
      } else {
        var finalRequest_write_status = {
          "status_id": $('#checked_new1_status' + i).val(),
          "is_status_write": false
        }
      }
      FinalArrayForRequWrite_status.push(finalRequest_write_status);
    }

    console.log(FinalArrayForRequRead_status);
    console.log(FinalArrayForRequWrite_status);

    console.log(this.finalModifiedStatusArray);
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
    // this.loader = false;
    this.service.createNewPermission(apiRequest).subscribe(res => {
      console.log(res);
      this.permissionRes = res;
      $("#edit_user_permissions").modal("hide");
      this.loader = false;
      this.permissionsMessage = true;
      this.userpermissionsMessage = false;
      $.notify({
        icon: "add_alert",
        message: "Permission has been Updated successfully",
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



}
