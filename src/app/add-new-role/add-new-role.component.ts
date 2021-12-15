import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
// import { months } from 'moment';
declare var $: any;

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.css']
})
export class AddNewRoleComponent implements OnInit {

  createNewRoleForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  afterResultstatus: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  roleStatusSet: { status: string; is_active: string; }[];
  
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.createNewRoleForm = this.formBuilder.group({
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
    this.allPermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    // console.log(this.allPermissionForOnlyThisScreen);
  }
  get a() { return this.createNewRoleForm.controls; }

  ngOnInit(): void {
    this.roleStatusSet =
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

  public createNewUser() {
    this.loader = true;
    this.submitted = true;
    if (this.createNewRoleForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.createNewRoleForm.value);

    this.service.adminCreateNewRole(this.createNewRoleForm.value).subscribe(result => {
      // console.log(result);
      this.afterResultstatus = result;
      this.router.navigate(['/roles-list']);
      this.loader = false;
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
      // console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "A Role with this name is already present",
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
  public cancel() {
    this.router.navigate(['/roles-list']);
  }

}
