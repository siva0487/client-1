import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-add-new-subscription-service',
  templateUrl: './add-new-subscription-service.component.html',
  styleUrls: ['./add-new-subscription-service.component.css']
})
export class AddNewSubscriptionServiceComponent implements OnInit {
  addNewSubscriptionForm: FormGroup;
  loader: boolean;
  submitted: boolean;
  frequencyCreatedRes: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  subscription_service_StatusSet: { status: string; value: string; }[];
  subscription_Type_Service: any;
  subscription_Type_ServiceBind: any;
  final_Subscription_type = [];
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.addNewSubscriptionForm = this.formBuilder.group({
      subscription_type: ['', Validators.required],
      subscription_period: ['', Validators.required],
      is_active: ['', Validators.required],
    });
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Subscription") {
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

  get a() { return this.addNewSubscriptionForm.controls; }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.subscription_service_StatusSet =
      [
        {
          "status": "Active",
          "value": "true"
        },
        {
          "status": "Inactive",
          "value": "false"
        }
      ]
    this.loader = true;
    this.service.getAllFrequency().subscribe(res => {
      // console.log(res);
      this.subscription_Type_Service = res
      this.subscription_Type_ServiceBind = this.subscription_Type_Service[0].frequencies
      for (var i = 0; i < this.subscription_Type_ServiceBind.length; i++) {
        if (this.subscription_Type_ServiceBind[i].is_active === true) {
          var final = {
            "frequency": this.subscription_Type_ServiceBind[i].frequency,
            "frequency_id": this.subscription_Type_ServiceBind[i].frequency_id,
            "is_active": this.subscription_Type_ServiceBind[i].is_active
          }
          this.final_Subscription_type.push(final);
        }
      }
      // console.log(this.final_Subscription_type);
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
    });
  }

  public cancel() {
    this.router.navigate(['/subscription-service']);
  }

  public createNewSubscription_type() {
    this.loader = true;
    this.submitted = true;
    if (this.addNewSubscriptionForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.addNewSubscriptionForm.value);
    this.service.createNewSubscription_service(this.addNewSubscriptionForm.value).subscribe(res => {
      // console.log(res);
      this.frequencyCreatedRes = res;
      this.loader = false;
      this.router.navigate(['/subscription-service']);
      $.notify({
        icon: "add_alert",
        message: this.frequencyCreatedRes.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
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
  }
}
