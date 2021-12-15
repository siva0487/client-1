import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-view-subscription-service',
  templateUrl: './view-subscription-service.component.html',
  styleUrls: ['./view-subscription-service.component.css']
})
export class ViewSubscriptionServiceComponent implements OnInit {

  sub: any;
  id: any;
  addEditSubscriptionForm: FormGroup;
  selectTheFrequency: { frequency: string; value: string; }[];
  resOfSubscription_service: any;
  checkEdit: boolean;
  submitted: boolean;
  loader: boolean;
  resSelectedUpdated: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  edit_subscription_service_StatusSet: { status: string; is_active: string; }[];
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.getSelectedSubscriptionService(this.id.subscription_id);
    this.addEditSubscriptionForm = this.formBuilder.group({
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
  get a() { return this.addEditSubscriptionForm.controls; }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ngOnInit(): void {
    this.edit_subscription_service_StatusSet =
      [{
        "status": "Active",
        "is_active": "true"
      },
      {
        "status": "Inactive",
        "is_active": "false"
      }
      ]
    this.selectTheFrequency = [
      {
        "frequency": "Daily",
        "value": "daily"
      },
      {
        "frequency": "weekly",
        "value": "weekly"
      },
      {
        "frequency": "Monthly",
        "value": "monthly"
      },
      {
        "frequency": "3 months",
        "value": "3 months"
      },
      {
        "frequency": "6 months",
        "value": "6 months"
      }
    ]
  }

  public getSelectedSubscriptionService(id) {
    this.loader = true;
    this.service.getSelectedSubscriptionAPI(id).subscribe(res => {
      // console.log(res);
      this.resOfSubscription_service = res;
      this.loader = false;
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
  public cancel() {
    this.router.navigate(['/subscription-service']);
  }

  edit() {
    this.checkEdit = true;
    $('#edit_this').css("display", "none");
    $('#update_this').css("display", "block");
    $('#subscription_service_is_active_id').attr('disabled', false);
    document.getElementById('subscription_type_id').removeAttribute('readonly');
    document.getElementById('subscription_period_id').removeAttribute('readonly');
  }


  public updateSubscriptionService() {

    this.loader = true;
    this.submitted = true;
    if (this.addEditSubscriptionForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.addEditSubscriptionForm.value);
    this.service.updateTheselectedSubscription(this.id.subscription_id, this.addEditSubscriptionForm.value).subscribe(res => {
      // console.log(res);
      this.resSelectedUpdated = res;
      this.loader = false;
      $('#subscription_service_is_active_id').attr('disabled', true);
      $("#subscription_type_id").attr("readonly", "true");
      $("#subscription_period_id").attr("readonly", "true");

      $('#edit_this').css("display", "block");
      $('#update_this').css("display", "none");
      this.router.navigate(['/subscription-service']);
      $.notify({
        icon: "add_alert",
        message: this.resSelectedUpdated.message
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
    })
  }



}
