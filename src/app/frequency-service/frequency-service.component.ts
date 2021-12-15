import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-frequency-service',
  templateUrl: './frequency-service.component.html',
  styleUrls: ['./frequency-service.component.css']
})
export class FrequencyServiceComponent implements OnInit {
  frequencyList: any;
  finalListOfFrequency: any;
  loader: boolean;
  shareThisID: any;
  deletedRes: any;
  message_display: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  writePermissionForOnlyThisScreen: any;
  constructor(private router: Router, private service: SharedServiceService) {
    this.getAllFrequencyList();
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

  ngOnInit(): void {
  }

  public addNewFrequency() {
    this.router.navigate(['/add-new-frequency-service']);
  }

  public getAllFrequencyList() {
    this.loader = true;
    this.service.getAllFrequency().subscribe(listRes => {
      // console.log(listRes);
      if (listRes === null) {
        this.loader = false;
        this.message_display = true;
      } else {
        this.frequencyList = listRes;
        this.finalListOfFrequency = this.frequencyList[0].frequencies;
        // console.log(this.frequencyList[0].frequencies);
        this.loader = false;
      }
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

  public viewFrequency(id) {

    this.router.navigate(['/view-frequency-service', id]);

  }

  public forDelete(id) {
    this.shareThisID = id;
    // console.log(this.shareThisID);
  }
  public closethisNow() {
    // $("#remove_new_user").modal("hide");
    $("#remove_frequency_popup_id").trigger("click")
  }
  public deleteThisNow() {
    // console.log(this.shareThisID);
    this.loader = true;
    this.service.deleteTheselectedFrequency(this.shareThisID).subscribe(res => {
      // console.log(res);
      this.deletedRes = res;
      $("#remove_frequency").modal("hide");
      this.getAllFrequencyList();
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.deletedRes.message
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
    });
  }

}
