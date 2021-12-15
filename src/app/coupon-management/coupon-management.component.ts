import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'underscore';
import { ExportService } from 'app/_services/export.service';
import { SharedServiceService } from 'app/_services/shared-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit {
  list: any;
  loader: boolean;
  message_display: boolean;
  finalData: any;
  ShareThisSelectedList: number;
  pager: any = {};
  pagedItems: any;
  selectedInfoForView: any;
  shareThisID: any;
  deletedMessage: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private exportService: ExportService, private service: SharedServiceService) {
    this.getAllList();

    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Coupons") {
        var forOrders = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreen.push(forOrders);
      }
    }
    this.allPermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    console.log(this.allPermissionForOnlyThisScreen);
  }

  ngOnInit(): void {
  }
  public getAllList() {
    this.loader = true;
    this.service.getAllCoupons().subscribe(getStoresListRes => {
      // console.log(getStoresListRes);
      this.list = getStoresListRes;
      if (getStoresListRes === null) {
        this.loader = false;
        this.message_display = true;
      } else {
        this.message_display = false;
        this.finalData = this.list[0].coupons;
        this.setPage(1);
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
    })
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  setPage(page: number) {
    this.ShareThisSelectedList = 0;
    this.loader = true;
    if (page < 1 || page > this.pager.totalPages) {
      this.loader = false;
      return;
    }

    // get pager object from service
    this.pager = this.getPager(this.finalData.length, page);

    // get current page of items
    this.pagedItems = this.finalData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
    this.loader = false;
  }

  public viewValue(Id) {
    this.selectedInfoForView = Id;
    this.router.navigate(['/veiw-coupon-details', Id]);
  }
  addNewCoupons() {
    this.router.navigate(['/create-new-coupon']);
  }
  public closethisNow() {
    // $("#remove_selecte_store").modal("hide");
    $("#profile_edit_verified").trigger("click")
  }
  public forDelete(id) {
    this.shareThisID = id;
    console.log(this.shareThisID);
  }
  deleteThisNow() {
    this.loader = true;
    console.log(this.shareThisID);
    this.service.deleteTheSelectedCoupon(this.shareThisID).subscribe(deleteres => {
      console.log(deleteres);
      this.deletedMessage = deleteres;
      this.getAllList();
      $("#remove_selecte_store").modal("hide");
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.deletedMessage.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.loader = false;
    }, err => {
      console.log(err);
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
