import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-view-delivery-service',
  templateUrl: './view-delivery-service.component.html',
  styleUrls: ['./view-delivery-service.component.css']
})
export class ViewDeliveryServiceComponent implements OnInit {

  sub: any;
  id: any;
  editFrequencyForm: FormGroup;
  resOfSelectedFrequency: any;
  checkEdit: boolean;
  submitted: boolean;
  loader: boolean;
  resSelectedUpdated: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  selected_delivery_option_service: { delivery_option: string; value: string; }[];
  delivery_option_StatusSet: { status: string; is_active: string; }[];
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.getSelectedDeliveryData(this.id.delivery_option_id);
    this.editFrequencyForm = this.formBuilder.group({
      delivery_option: ['', Validators.required],
      is_active: ['', Validators.required]
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
  get a() { return this.editFrequencyForm.controls; }

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
    this.selected_delivery_option_service = [
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

  public getSelectedDeliveryData(id) {
    this.loader = true;
    this.service.selectedDeliveryOptionDetails(id).subscribe(res => {
      // console.log(res);
      this.resOfSelectedFrequency = res;
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
    this.router.navigate(['/delivery-option-service']);
  }

  edit() {
    this.checkEdit = true;
    $('#edit_this').css("display", "none");
    $('#update_this').css("display", "block");
    $('#is_active_delivery_option_store_id').attr('disabled', false);
    document.getElementById('delivery_option_store_id').removeAttribute('readonly');


  }

  public UpdateDeliveryOption() {

    this.loader = true;
    this.submitted = true;
    if (this.editFrequencyForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.editFrequencyForm.value);
    var request = {
      "delivery_option": this.a.delivery_option.value
    }
    this.service.updateTheDeliveryOptions(this.id.delivery_option_id, this.editFrequencyForm.value).subscribe(res => {
      // console.log(res);
      this.resSelectedUpdated = res;
      this.loader = false;
      $('#is_active_delivery_option_store_id').attr('disabled', true);
      $("#delivery_option_store_id").attr("readonly", "true");

      $('#edit_this').css("display", "block");
      $('#update_this').css("display", "none");
      this.router.navigate(['/delivery-option-service']);
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
