import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-add-new-frequency-service',
  templateUrl: './add-new-frequency-service.component.html',
  styleUrls: ['./add-new-frequency-service.component.css']
})
export class AddNewFrequencyServiceComponent implements OnInit {
  selectTheFrequency: { frequency: string; value: string; }[];
  addNewFrequencyForm: FormGroup;
  loader: boolean;
  submitted: boolean;
  frequencyCreatedRes: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  frequencyStatusSet: { status: string; is_active: string; }[];
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.addNewFrequencyForm = this.formBuilder.group({
      frequency: ['', Validators.required],
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

  get a() { return this.addNewFrequencyForm.controls; }

  ngOnInit(): void {
    this.frequencyStatusSet =
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
  public cancel() {
    this.router.navigate(['/frequency-service']);
  }

  public createNewFrequency() {
    this.loader = true;
    this.submitted = true;
    if (this.addNewFrequencyForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.addNewFrequencyForm.value);
    this.service.createFrequency(this.addNewFrequencyForm.value).subscribe(res => {
      // console.log(res);
      this.frequencyCreatedRes = res;
      this.loader = false;
      this.router.navigate(['/frequency-service']);
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
