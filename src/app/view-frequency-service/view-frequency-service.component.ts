import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-view-frequency-service',
  templateUrl: './view-frequency-service.component.html',
  styleUrls: ['./view-frequency-service.component.css']
})
export class ViewFrequencyServiceComponent implements OnInit {
  sub: any;
  id: any;
  editFrequencyForm: FormGroup;
  selectTheFrequency: { frequency: string; value: string; }[];
  resOfSelectedFrequency: any;
  checkEdit: boolean;
  submitted: boolean;
  loader: boolean;
  resSelectedUpdated: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  frequencyStatusSet: { status: string; is_active: string; }[];
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.getSelectedFrequencyData(this.id.frequency_id);
    this.editFrequencyForm = this.formBuilder.group({
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
  get a() { return this.editFrequencyForm.controls; }

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

  public getSelectedFrequencyData(id) {
    this.loader = true;
    this.service.selectedFrequencyDetails(id).subscribe(res => {
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
    this.router.navigate(['/frequency-service']);
  }

  edit() {
    this.checkEdit = true;
    $('#edit_this').css("display", "none");
    $('#update_this').css("display", "block");
    $('#frequency_service_is_active_id').attr('disabled', false);
    document.getElementById('frequency_service_id').removeAttribute('readonly');

  }

  public UpdateFrequency() {

    this.loader = true;
    this.submitted = true;
    if (this.editFrequencyForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.editFrequencyForm.value);
    var request = {
      "frequency": this.a.frequency.value
    }
    this.service.updateTheFrequency(this.id.frequency_id, this.editFrequencyForm.value).subscribe(res => {
      // console.log(res);
      this.resSelectedUpdated = res;
      this.loader = false;
      $('#frequency_service_is_active_id').attr('disabled', true);
      $("#frequency_service_id").attr("readonly", "true");
      $('#edit_this').css("display", "block");
      $('#update_this').css("display", "none");
      this.router.navigate(['/frequency-service']);
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
