import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
// import { months } from 'moment';
declare var $: any;

@Component({
  selector: 'app-view-roles-list',
  templateUrl: './view-roles-list.component.html',
  styleUrls: ['./view-roles-list.component.css']
})
export class ViewRolesListComponent implements OnInit {
  sub: any;
  id: any;
  customer_ID: any;
  updateRoleForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  selectedRoleInformation: any;
  active: any;
  is_activeOrNot_new: { status: string; value: string; }[];
  checkEdit: boolean;
  updatedNow: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.getTheSpecificRoleInfo(this.id.role_id);
    this.updateRoleForm = this.formBuilder.group({
      role_name: ['', Validators.required],
      is_active: ['', Validators.required]
    });

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
  get a() { return this.updateRoleForm.controls; }

  ngOnInit(): void {
    this.is_activeOrNot_new = [
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

  public getTheSpecificRoleInfo(id) {
    this.loader = true;
    this.service.getTheSelectedRoleInformation(id).subscribe(roleInfoRes => {
      // console.log(roleInfoRes);
      this.selectedRoleInformation = roleInfoRes;
      // if (this.selectedRoleInformation.is_active === true) {
      //   this.active = "true";
      // } else {
      //   this.active = "false";
      // }
      this.loader = false;

    }, err => {
      this.loader = false;
      // console.log(err);
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
  public cancel() {
    this.router.navigate(['/roles-list']);
  }

  edit() {
    this.checkEdit = true;
    $('#edit_this').css("display", "none");
    $('#update_this').css("display", "block");
    document.getElementById('role_name_id').removeAttribute('readonly');
    $('#role_status_id').attr('disabled', false);

  }
  Update() {
    this.loader = true;
    this.submitted = true;
    if (this.updateRoleForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.updateRoleForm.value);

    this.service.updatetheSelectedRole(this.id.role_id, this.updateRoleForm.value).subscribe(updateres => {
      // console.log(updateres);
      this.updatedNow = updateres;

      $('#edit_this').css("display", "block");
      $('#update_this').css("display", "none");
      $("#role_name_id").attr("readonly", "true");
      $('#role_status_id').attr('disabled', true);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.updatedNow.message,
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.router.navigate(['/roles-list']);
    }, err => {
      // console.log(err);
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
