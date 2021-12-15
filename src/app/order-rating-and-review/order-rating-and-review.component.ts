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
  selector: 'app-order-rating-and-review',
  templateUrl: './order-rating-and-review.component.html',
  styleUrls: ['./order-rating-and-review.component.css']
})
export class OrderRatingAndReviewComponent implements OnInit {

  isButtonEnable: boolean;
  pos: string;
  post: string;
  dynamicorderDetailsByCheckBox: any[];
  dict = {};
  selectedInfoForEdit: any;

  selectedInfoForView: any;
  finalData: { customer_id: string; order_id: string; rating_status: string; }[];
  selectedAlldata = [];
  resDetails: any;
  selectedAlldataArray = [];
  loader: boolean;
  message_display: boolean;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  ratingInfo: any;
  custome_download: FormGroup;
  submitted: boolean;
  from_date: any;
  to_date: any;
  customeData: any;
  pager: any = {};
  pagedItems: any;
  howmanySelectedArray = [];
  ShareThisSelectedList: number = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private exportService: ExportService, private service: SharedServiceService) {
    this.getRating();
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
    this.custome_download = this.formBuilder.group({
      from_date: [''],
      to_date: ['']
      // status_id: ['', Validators.required]
    });

    // this.custome_search = this.formBuilder.group({
    //   order_id: [''],
    //   rating_id: [''],
    //   customer_name: [''],
    //   payment_type: [''],
    //   order_status: ['']
    // });
  }
  get a() { return this.custome_download.controls; }


  public customeExport() {
    this.loader = true;
    this.submitted = true;
    if (this.custome_download.invalid) {
      this.loader = false;
      return;
    }
    console.log(this.custome_download.value);

    this.from_date = new Date(this.a.from_date.value);
    this.to_date = new Date(this.a.to_date.value);
    // console.log(this.from_date, this.to_date);
    // console.log(this.to_date - this.from_date);
    if ((this.to_date - this.from_date) >= 0) {
      this.service.downloadCustomeRatingAndReview(this.custome_download.value).subscribe(res => {
        console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Available!"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.customeData = res;
          // for (var i = 0; i < this.customeData[0].orders; i++) {
          //   var change = {
          //     "city": this.customeData[0].orders,
          //     "country": this.customeData[0].orders,
          //     "created_at": this.customeData[0].orders,
          //     "email": this.customeData[0].orders,
          //     "end_slot_time": this.customeData[0].orders,
          //     "first_name": this.customeData[0].orders,
          //     "last_name": this.customeData[0].orders,
          //     "line_1": this.customeData[0].orders,
          //     "line_2": this.customeData[0].orders,
          //     "mobile": this.customeData[0].orders,
          //     "order_id": this.customeData[0].orders,
          //     "order_no": this.customeData[0].orders,
          //     "payment_method": this.customeData[0].orders,
          //     "pincode": this.customeData[0].orders,
          //     "start_slot_time": this.customeData[0].orders,
          //     "state": this.customeData[0].orders,
          //     "status": this.customeData[0].status,
          //     "street": this.customeData[0].street,
          //     "total_amount": this.customeData[0].total_amount,
          //     "updated_at": this.customeData[0].updated_at
          //   }
          // }
          this.exportService.exportExcel(this.customeData[0].ratings_reviews, 'Order Rating&Review Export');
          this.loader = false;
          $('#from_date').val("");
          $('#to_date').val("");
          this.submitted = false;
          this.custome_download.reset();
        }
      }, err => {
        // console.log(err);
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
    } else {
      $('#to_date').val("");
      // console.log("to_date");
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "To Date Should be Gater then From Date! Please currect the Date and try again"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }

  }

  customeDownloads() {
    $('#from_date').val("");
    $('#to_date').val("");
    this.submitted = false;
    this.custome_download.reset();
  }

  all(data) {
    this.selectedAlldata = data;
    // console.log(this.selectedAlldata);
    if ($('#selectall').prop("checked") == true) {
      $('body').on('click', '#selectall', function () {
        $('.singlechkbox').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata);
      this.ShareThisSelectedList = this.pagedItems.length;
    }
    else if ($('#selectall').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata = [];
      this.ShareThisSelectedList = 0;
      // console.log(this.selectedAlldata);
    }

  }


  public customeSearch() {
    if ($('#customer_name_id').val() != "") {
      var request = {
        "screen": "order_rating_review",
        "column_name": "customer_name",
        "search": $('#customer_name_id').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.ratingInfo = res[0].ratings_reviews;
          this.setPage(1);
          // console.log(this.ratingInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });
    } else if ($('#rating_id').val() != "") {
      var request = {
        "screen": "order_rating_review",
        "column_name": "rating",
        "search": $('#rating_id').val()
      }
      this.loader = true;
      // console.log(request);
      this.service.searchAPI(request).subscribe(res => {
        // console.log(res);
        if (res === null) {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: "No Data Found"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        } else {
          this.loader = false;
          this.ratingInfo = res[0].ratings_reviews;
          this.setPage(1);
          // console.log(this.ratingInfo);
        }
      }, err => {
        // console.log(err);
        this.loader = false;
      });

    } else {

    }


  }


  enableThis1() {
    document.getElementById('customer_name_id').removeAttribute('readonly');
    $('#rating_id').val("");
  }
  enableThis2() {
    document.getElementById('rating_id').removeAttribute('readonly');
    $('#customer_name_id').val("");

  }

  public reSet() {
    $('#customer_name_id').val("");
    $('#rating_id').val("");

    $("#customer_name_id").attr("readonly", "true");
    $("#rating_id").attr("readonly", "true");

    this.getRating();

    // $('.collapsed').trigger('click');
    // $('#heading1').click();
  }

  eraiseAll() {
    $('#customer_name_id').val("");
    $('#rating_id').val("");
  }

  generate() {
    console.log(this.ShareThisSelectedList);
    if (this.ShareThisSelectedList > 0) {
      // var finalData = _.map(this.selectedAlldata, function (item) {
      //   return _.pick(item, "first_name", "last_name", "rating", "review")
      // })
      // finalData = finalData.filter((item) => {
      //   return item != null;
      // });
      // console.log(finalData);

      var finalDataModified = [];
      for (var i = 0; i < this.pagedItems.length; i++) {
        if ($('#dynamicID' + i).prop("checked") === true) {
          var use = {
            "First Name": this.pagedItems[i].first_name,
            "Last Name": this.pagedItems[i].last_name,
            "Rating": this.pagedItems[i].rating,
            "Review": this.pagedItems[i].review
          }
          finalDataModified.push(use);
        }
      }
      this.exportService.exportExcel(finalDataModified, 'Order Rating&Review Export');
      $('#selectall').prop("checked", false);
      this.getRating();

    } else {
      $.notify({
        icon: "add_alert",
        message: "Please select the List"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }
  }
  single(event, data) {
    // console.log(data);

    if (this.dict.hasOwnProperty(event)) {
      delete this.dict[event];
    } else {
      this.dict[event] = data;
    }
    this.selectedAlldata = [];
    for (var key in this.dict) {
      this.selectedAlldata.push(this.dict[key]);
    }
    // console.log(this.selectedAlldata);


    $('body').on('click', '.singlechkbox', function () {
      if ($('.singlechkbox').length == $('.singlechkbox:checked').length) {
        $('#selectall').prop('checked', true);
        // // console.log("Checkbox is checked.");
      } else {
        $("#selectall").prop('checked', false);
        // // console.log("Checkbox is unchecked.");
      }
    });
    this.howmanySelectedArray = [];
    for (var i = 0; i < this.pagedItems.length; i++) {
      if ($('#dynamicID' + i).prop("checked") === true) {
        this.howmanySelectedArray.push(i);
      }
    }
    console.log(this.howmanySelectedArray.length);
    this.ShareThisSelectedList = this.howmanySelectedArray.length;

  }
  ngOnInit(): void {
    // this.finalData = [
    //   {
    //     "customer_id": "Siva",
    //     "order_id": "956585",
    //     "rating_status": "Approved",
    //   },
    //   {
    //     "customer_id": "Ram",
    //     "order_id": "436950",
    //     "rating_status": "Rejected",
    //   },
    //   {
    //     "customer_id": "Kumar",
    //     "order_id": "190300",
    //     "rating_status": "Pending",
    //   }];

  }

  public viewValue(Id) {
    this.selectedInfoForView = Id;
    this.router.navigate(['/rating-review-view-details', Id]);
  }
  public getRating() {
    this.loader = true;
    this.service.getAllRatingsAndReviews().subscribe(res => {
      // console.log(res);
      this.resDetails = res;
      // console.log(this.resDetails[0].ratings_reviews);
      if (this.resDetails[0].ratings_reviews.length === 0) {
        this.loader = false;
        this.message_display = true;
      } else {
        this.loader = false;
        this.ratingInfo = this.resDetails[0].ratings_reviews;
        this.setPage(1);
      }
    }, err => {
      // console.log(err);
      this.loader = false;
    });
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
    this.pager = this.getPager(this.ratingInfo.length, page);

    // get current page of items
    this.pagedItems = this.ratingInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.loader = false;
  }

}
