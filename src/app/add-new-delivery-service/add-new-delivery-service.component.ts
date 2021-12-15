import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-add-new-delivery-service',
  templateUrl: './add-new-delivery-service.component.html',
  styleUrls: ['./add-new-delivery-service.component.css']
})
export class AddNewDeliveryServiceComponent implements OnInit {

  selectedDelivery_option: { delivery_option: string; value: string; }[];
  addNewDeliveryOptionForm: FormGroup;
  loader: boolean;
  submitted: boolean;
  frequencyCreatedRes: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  delivery_option_StatusSet: { status: string; is_active: string; }[];
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.addNewDeliveryOptionForm = this.formBuilder.group({
      delivery_option: ['', Validators.required],
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

  get a() { return this.addNewDeliveryOptionForm.controls; }

  ngOnInit(): void {
    this.delivery_option_StatusSet =
      [{
        "status": "Active",
        "is_active": "true"
      },
      {
        "status": "Inactive",
        "is_active": "false"
      }
      ]
    this.selectedDelivery_option = [
      {
        "delivery_option": "Ring The Bell",
        "value": "ring_the_bell"
      },
      {
        "delivery_option": "Doorstep Delivery",
        "value": "doorstep_delivery"
      },
      {
        "delivery_option": "Handover",
        "value": "handover"
      }
    ]
  }
  public cancel() {
    this.router.navigate(['/delivery-option-service']);
  }

  public createNewDeliveryOption() {
    this.loader = true;
    this.submitted = true;
    if (this.addNewDeliveryOptionForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.addNewDeliveryOptionForm.value);
    this.service.createDeliveryOptions(this.addNewDeliveryOptionForm.value).subscribe(res => {
      // console.log(res);
      this.frequencyCreatedRes = res;
      this.loader = false;
      this.router.navigate(['/delivery-option-service']);
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
