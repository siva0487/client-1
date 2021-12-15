import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-create-new-coupon',
  templateUrl: './create-new-coupon.component.html',
  styleUrls: ['./create-new-coupon.component.css']
})
export class CreateNewCouponComponent implements OnInit {
  coupon_types: any;
  addNewCouponForm: FormGroup;
  loader: boolean;
  submitted: boolean;
  value_type_list: any;
  coupon_status: any;
  requestBody: any;
  shareThisInfo: any;
  createCoupanSres: any;
  AllstoresInfo: any;
  finalStoresListArray: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.addNewCouponForm = this.formBuilder.group({
      coupon_name: ['', Validators.required],
      coupon_code: ['', Validators.required],
      // coupon_type: ['', Validators.required],
      store_id: ['', Validators.required],
      is_active: ['', Validators.required],
      value_type: ['', Validators.required],
      coupon_amount: ['', Validators.required],
      coupon_start_date: ['', Validators.required],
      coupon_end_date: ['', Validators.required],
      max_limit: ['', Validators.required],
      minimum_cart_value: ['', Validators.required],
      number_of_times_coupon_used: ['', Validators.required],
      number_of_times_per_customer: ['', Validators.required],
    });
    // this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
    //   if (this.showThisScreenWithPermissions.screens[i].screen_name === "Stores Management") {
    //     var forOrders = {
    //       "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
    //       "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
    //       "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
    //       "is_write": this.showThisScreenWithPermissions.screens[i].is_write
    //     }
    //     this.permissionForOnlyThisScreen.push(forOrders);
    //   }
    // }
    // this.allPermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
  }
  get a() { return this.addNewCouponForm.controls; }

  ngOnInit(): void {

    this.getStore();
    this.coupon_types = [
      {
        "coupon_type": "General",
        "val": "general"
      },
      {
        "coupon_type": "User Specific",
        "val": "user_specific"
      }
    ];

    this.coupon_status = [
      {
        "coupon_status": "Active",
        "val": true
      },
      {
        "coupon_status": "Inactive",
        "val": false
      }
    ];


    this.value_type_list = [
      {
        "type": "Amount",
        "value_type": "amount"
      },
      {
        "type": "Percentage",
        "value_type": "percentage"
      }
    ];
  }
  selectedType(val) {
    console.log(val);
    this.shareThisInfo = val;
    if (val === "percentage") {
      $('#showThepersentage').css("display", "block");
      this.addNewCouponForm.get('coupon_amount').setValue("");
    } else {
      $('#showThepersentage').css("display", "none");
      this.addNewCouponForm.get('coupon_amount').setValue("");
    }
  }

  getStore() {
    this.loader = true;
    this.service.getAllStores().subscribe(res => {
      // console.log(res);
      this.AllstoresInfo = res;
      // console.log(this.AllstoresInfo[0].stores);
      this.finalStoresListArray = this.AllstoresInfo[0].stores;
      this.loader = false;
    }, err => {
      // console.log(err);
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Getting Some Network Issue while Getting the Store/Role List. Please Try Again",
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


  createNewCoupons() {
    this.loader = true;
    this.submitted = true;
    if (this.addNewCouponForm.invalid) {
      this.loader = false;
      return;
    }
    console.log(this.addNewCouponForm.value);
    console.log(this.shareThisInfo);
    if (Number(this.a.minimum_cart_value.value) > Number(this.a.max_limit.value)) {

      if (this.shareThisInfo === "percentage") {
        console.log(this.a.coupon_amount.value);
        if (Number(this.a.coupon_amount.value) <= 100) {

          if (this.a.store_id.value === "for_admin") {
            console.log(this.finalStoresListArray);
            var storeArray = [];
            for (var i = 0; i < this.finalStoresListArray.length; i++) {
              storeArray.push(this.finalStoresListArray[i].plant_code);
            }
            this.requestBody = {
              // "coupon_type": this.a.coupon_type.value,
              "customer_id": null,
              "coupon_code": this.a.coupon_code.value.toUpperCase(),
              "is_percentage": true,
              "is_amount": false,
              "coupon_percentage": this.a.coupon_amount.value,
              "coupon_amount": null,
              "max_limit": this.a.max_limit.value,
              "coupon_start_date": this.a.coupon_start_date.value,
              "coupon_end_date": this.a.coupon_end_date.value,
              "number_of_times_coupon_used": this.a.number_of_times_coupon_used.value,
              "number_of_times_per_customer": this.a.number_of_times_per_customer.value,
              "minimum_cart_value": this.a.minimum_cart_value.value,
              "is_active": this.a.is_active.value,
              "store_id": storeArray,
              "coupon_name": this.a.coupon_name.value
            }
          } else {
            this.requestBody = {
              // "coupon_type": this.a.coupon_type.value,
              "customer_id": null,
              "coupon_code": this.a.coupon_code.value.toUpperCase(),
              "is_percentage": true,
              "is_amount": false,
              "coupon_percentage": this.a.coupon_amount.value,
              "coupon_amount": null,
              "max_limit": this.a.max_limit.value,
              "coupon_start_date": this.a.coupon_start_date.value,
              "coupon_end_date": this.a.coupon_end_date.value,
              "number_of_times_coupon_used": this.a.number_of_times_coupon_used.value,
              "number_of_times_per_customer": this.a.number_of_times_per_customer.value,
              "minimum_cart_value": this.a.minimum_cart_value.value,
              "is_active": this.a.is_active.value,
              "store_id": [this.a.store_id.value],
              "coupon_name": this.a.coupon_name.value
            }
          }
          console.log(this.requestBody);
          this.service.createNewCoupan(this.requestBody).subscribe(res => {
            console.log(res);
            this.createCoupanSres = res;
            $.notify({
              icon: "add_alert",
              message: this.createCoupanSres.message
            }, {
              type: 'info',
              timer: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
            this.loader = false;
            this.router.navigate(['/coupon-management']);
          }, err => {
            console.log(err);
            this.loader = false;
            $.notify({
              icon: "add_alert",
              message: err.error.error
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
          $.notify({
            icon: "add_alert",
            message: "Please check the Coupon Value, Value shoudn't More then 100 %"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }
      } else {

        if (this.a.store_id.value === "for_admin") {
          console.log(this.finalStoresListArray);
          var storeArray = [];
          for (var i = 0; i < this.finalStoresListArray.length; i++) {
            storeArray.push(this.finalStoresListArray[i].plant_code);
          }
          this.requestBody = {
            "store_id": storeArray,
            "coupon_name": this.a.coupon_name.value,
            // "coupon_type": this.a.coupon_type.value,
            "customer_id": null,
            "coupon_code": this.a.coupon_code.value.toUpperCase(),
            "is_percentage": false,
            "is_amount": true,
            "coupon_percentage": null,
            "coupon_amount": this.a.coupon_amount.value,
            "max_limit": this.a.max_limit.value,
            "coupon_start_date": this.a.coupon_start_date.value,
            "coupon_end_date": this.a.coupon_end_date.value,
            "number_of_times_coupon_used": this.a.number_of_times_coupon_used.value,
            "number_of_times_per_customer": this.a.number_of_times_per_customer.value,
            "minimum_cart_value": this.a.minimum_cart_value.value,
            "is_active": this.a.is_active.value
          }
        } else {
          this.requestBody = {
            "coupon_name": this.a.coupon_name.value,
            // "coupon_type": this.a.coupon_type.value,
            "customer_id": null,
            "coupon_code": this.a.coupon_code.value.toUpperCase(),
            "is_percentage": false,
            "is_amount": true,
            "coupon_percentage": null,
            "coupon_amount": this.a.coupon_amount.value,
            "max_limit": this.a.max_limit.value,
            "coupon_start_date": this.a.coupon_start_date.value,
            "coupon_end_date": this.a.coupon_end_date.value,
            "number_of_times_coupon_used": this.a.number_of_times_coupon_used.value,
            "number_of_times_per_customer": this.a.number_of_times_per_customer.value,
            "minimum_cart_value": this.a.minimum_cart_value.value,
            "is_active": this.a.is_active.value,
            "store_id": [this.a.store_id.value],
          }
        }
        console.log(this.requestBody);
        this.service.createNewCoupan(this.requestBody).subscribe(res => {
          console.log(res);
          this.createCoupanSres = res;
          $.notify({
            icon: "add_alert",
            message: this.createCoupanSres.message
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
          this.router.navigate(['/coupon-management']);
        }, err => {
          console.log(err);
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: err.error.error
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
    } else {
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Max Limit Value Should not greater than Minimum cart value"
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
  cancel() {
    this.router.navigate(['/coupon-management']);
  }
  numberOnly() {
    $('.filterme').keypress(function (eve) {
      if ((eve.which != 46 || $(this).val().indexOf('.') != -1) && (eve.which < 48 || eve.which > 57) || (eve.which == 46 && $(this).caret().start == 0)) {
        eve.preventDefault();
      }

      // this part is when left part of number is deleted and leaves a . in the leftmost position. For example, 33.25, then 33 is deleted
      $('.filterme').keyup(function (eve) {
        if ($(this).val().indexOf('.') == 0) {
          $(this).val($(this).val().substring(1));
        }
      });
    });
  }
  startdate() {
    var fromDate = $('#start_date').val();
    var toDate = $('#end_date').val();
    console.log(fromDate);

    if ((new Date(JSON.stringify(fromDate)).getTime()) <= (new Date(JSON.stringify(toDate)).getTime())) {
    } else {
      $('#end_date').val(null);
      this.addNewCouponForm.get('coupon_end_date').setValue("");
    }
  }
  enddate() {
    var fromDate = $('#start_date').val();
    var toDate = $('#end_date').val();
    if ((new Date(JSON.stringify(toDate)).getTime()) >= (new Date(JSON.stringify(fromDate)).getTime())) {
    } else {
      $('#start_date').val(null);
      this.addNewCouponForm.get('coupon_start_date').setValue("");
    }
  }
  checkValidation() {
    var date = new Date();
    var day = JSON.stringify(date.getDate())
    if (date.getDate() < 10) {
      day = "0" + day
    } else {
      day = day;
    }
    var month = JSON.stringify(date.getMonth() + 1)
    if ((date.getMonth() + 1) < 10) {
      month = "0" + month
    } else {
      month = month;
    }
    var year = date.getFullYear();
    var minDate = year + '-' + month + '-' + day;
    console.log(minDate);
    // alert(maxDate);

    //alert(startDate);
    $('#start_date').attr('min', minDate);
    // alert(maxDate);
    $('#end_date').attr('min', minDate);
  }

}
