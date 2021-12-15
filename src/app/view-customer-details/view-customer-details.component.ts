import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css']
})
export class ViewCustomerDetailsComponent implements OnInit {
  sub: any;
  id: any;
  customer_ID: any;
  customer_full_name: any;
  customer_full_name_new: any;
  public loader: boolean = false;
  customersDetails: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  waletDetails: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.customer_ID = this.id.customer_id;
      this.customer_full_name = this.id.first_name + ' ' + this.id.last_name
      // console.log(this.id);
    });
    this.getSelectedCustomerInfo(this.customer_ID);
    this.customerWaletInfo(this.customer_ID);
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Customers") {
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

  ngOnInit(): void {
  }

  public getSelectedCustomerInfo(id) {
    this.loader = true;
    this.service.getSpesificCustomerInfo(id).subscribe(res => {
      // console.log(res);
      this.customersDetails = res;
      this.customer_full_name_new = this.customersDetails.first_name + ' ' + this.customersDetails.last_name;
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
    });
  }

  public cancel() {
    this.router.navigate(['/customers']);
  }

  customerWaletInfo(id) {
    var request = {
      "customer_id": id
    }
    this.service.walte(request).subscribe(res => {
      // console.log(res);
      this.waletDetails = res;
    });
  }
}
