import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  sub: any;
  id: any;
  cart_ID: any;
  customerCartDetails: any;
  list: any;
  public loader: boolean = false;
  cartInfromation: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  customerDetails: any;
  name: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.cart_ID = this.id.cart_id;

      // console.log(this.id);
    });
    this.getSelected(this.cart_ID);
    this.getCustDetails();
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "carts") {
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

  public getSelected(id) {
    this.loader = true;
    this.service.getSelectedCartInfo(id).subscribe(res => {
      // console.log(res);
      this.customerCartDetails = res;
      this.list = this.customerCartDetails[0].items
      this.cartInfromation = this.customerCartDetails[0];
      // console.log(this.list);
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;

    })
  }


  getCustDetails() {
    this.loader = true;
    // console.log(this.customerCartDetails);
    this.service.getSpesificCustomerInfo(this.id.customer_id).subscribe(res => {
      // console.log(res);
      this.customerDetails = res;
      this.name = this.customerDetails.first_name + '' + this.customerDetails.last_name
      this.loader = false;
    }, err => {
      this.loader = false;
    });
  }

  public cancel() {
    this.router.navigate(['/cart-info']);
  }
}
