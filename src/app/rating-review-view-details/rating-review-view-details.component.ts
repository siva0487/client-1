import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating-review-view-details',
  templateUrl: './rating-review-view-details.component.html',
  styleUrls: ['./rating-review-view-details.component.css']
})
export class RatingReviewViewDetailsComponent implements OnInit {

  sub: any;
  id: any;
  customer_ID: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  showThis: boolean;
  constructor(private router: Router,private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.customer_ID = this.id.customer_id;
      // console.log(this.id);
    });

    if (this.id.review === null || this.id.review === "null" || this.id.review === "" || this.id.review === undefined) {
      this.showThis = true;
    } else {
      this.showThis = false;
    }
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Order Rating and Review") {
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

  goBack(){
    this.router.navigate(['/order-rating-and-review']);
  }
}
