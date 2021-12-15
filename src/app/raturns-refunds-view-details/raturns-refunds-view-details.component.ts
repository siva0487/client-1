import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raturns-refunds-view-details',
  templateUrl: './raturns-refunds-view-details.component.html',
  styleUrls: ['./raturns-refunds-view-details.component.css']
})
export class RaturnsRefundsViewDetailsComponent implements OnInit {

  sub: any;
  id: any;
  customer_ID: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Returns and Refunds") {
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
  public cancel() {
    this.router.navigate(['/returns-and-refunds']);
  }
}
