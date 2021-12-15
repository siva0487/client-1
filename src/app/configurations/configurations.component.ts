import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  showDeliveryInfo: boolean;
  deliveryChargesArray = [];
  loader: boolean;
  charges: any;
  // showUpdate: boolean;
  message_display: boolean;
  message_display_button: boolean;
  configurationRes: any;
  showCreate: boolean;
  showDelete: boolean;
  showEdit: boolean;
  validationMessage: boolean;
  misMatchCheck: boolean = true;
  showMinimumOrderValueInfo: boolean;
  finalRes: any;
  showPackagingType: boolean;
  finalPackageGet: any;
  forEditPackageInfo: any;
  forDeletePackagingType: any;
  submitted: boolean;
  finalUpdateRes: any;
  showThisMessageForPackagingType: boolean = false;
  showThisNoPackageTpe: boolean;
  showThisMessageForCreatePackagingType: boolean;
  miniOrderValRes: any;
  add_showThisMessageForPackagingType: boolean;
  shareThisItemToUpdate: any;
  showThisMessageForUpdatedMini_orderVal: boolean;
  deliveryChargesMissMatch: boolean;
  constructor(private service: SharedServiceService, private formBuilder: FormBuilder) {
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Configurations") {
        var forOrders = {
          "screen_id": this.showThisScreenWithPermissions.screens[i].screen_id,
          "screen_name": this.showThisScreenWithPermissions.screens[i].screen_name,
          "is_read": this.showThisScreenWithPermissions.screens[i].is_read,
          "is_write": this.showThisScreenWithPermissions.screens[i].is_write
        }
        this.permissionForOnlyThisScreen.push(forOrders);
      }
    }
    console.log(this.permissionForOnlyThisScreen[0]);
    this.allPermissionForOnlyThisScreen = this.permissionForOnlyThisScreen[0];
    console.log(this.allPermissionForOnlyThisScreen);
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
  ngOnInit(): void {
    // this.deliveryChargesArray;


  }
  addNew() {
    this.deliveryChargesArray.push(
      {
        "min_cart_value": "",
        "max_cart_value": "",
        "amount": ""
      }
    );
    console.log(this.deliveryChargesArray);

    this.showDelete = true;
    this.message_display = false;
    this.showCreate = true;
  }
  delete(i, item) {
    console.log(i);
    console.log(item);
    console.log(item.delivery_charges_id);
    this.loader = true;
    if (item.delivery_charges_id === undefined || item.delivery_charges_id === "" || item.delivery_charges_id === null) {
      this.deliveryChargesArray.splice(i, 1);
      console.log(this.deliveryChargesArray);
      $.notify({
        icon: "add_alert",
        message: "Delivery charge has been removed successfully"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      if (this.deliveryChargesArray.length === 0) {
        this.message_display = true;
        this.showCreate = false;
      } else {
        this.message_display = false;
      }
      this.loader = false;
    } else {
      console.log(item.delivery_charges_id);
      this.service.deleteTheDeliveryCharge(item.delivery_charges_id).subscribe(res => {
        console.log(res);
        $.notify({
          icon: "add_alert",
          message: "Delivery charge has been removed successfully"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });

        this.deliveryChargesArray.splice(i, 1);

        if (this.deliveryChargesArray.length === 0) {
          this.message_display = true;
          this.showCreate = false;
        } else {
          this.message_display = false;
        }
        // this.showCreate = false;
        // this.message_display = true;
        this.message_display_button = true;
        // this.showCreate = false;
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
  edit() {
    this.showCreate = true;
    this.showDelete = true;
    this.showEdit = false;
    this.message_display_button = true;
    this.deliveryChargesArray
    // for (var i = 0; i < this.deliveryChargesArray.length; i++) {
    //   document.getElementById('minimum_cart_val' + i).removeAttribute('readonly');
    //   document.getElementById('maximum_cart_val' + i).removeAttribute('readonly');
    //   document.getElementById('charges_d' + i).removeAttribute('readonly');
    // }
  }
  selectedInfo(val) {
    console.log(val);
    // this.deliveryChargesArray;
    // console.log(this.deliveryChargesArray);
    if (val === "delivery") {
      this.showDeliveryInfo = true;
      this.loader = true;
      this.service.getDeliveryCharges().subscribe(res => {
        console.log(res);
        if (res === null) {
          this.loader = false;
          this.message_display = true;
          this.message_display_button = true;
        } else {
          this.charges = res;
          console.log(this.charges[0].delivery_charges);
          // for (var i = 0; i < this.charges[0].delivery_charges.length; i++) {
          //   this.deliveryChargesArray.push(this.charges[0].delivery_charges[i]);
          // }
          this.deliveryChargesArray = this.charges[0].delivery_charges;
          console.log(this.deliveryChargesArray);
          if (this.deliveryChargesArray.length === 0) {
            this.showEdit = false;
            this.showCreate = true;
            // this.showDelete = true;
          } else {
            this.showEdit = true;
            this.showCreate = false;
            this.showDelete = false;
            this.message_display_button = false;
            this.message_display = false;
          }
          this.loader = false;

        }
      }, err => {
        console.log(err);
        this.loader = false;
      });
    } else {
      this.showDeliveryInfo = false;
    }

    if (val === "min_order") {
      this.showMinimumOrderValueInfo = true;
      this.service.getMinimumOrderValueInfo().subscribe(res => {
        console.log(res);
        this.miniOrderValRes = res;
        // minimum_order_val
        // $('#minimum_order_val').val(this.miniOrderValRes.min_order_value);
      }, err => {
        console.log(err);
      });

    } else {
      this.showMinimumOrderValueInfo = false;
    }
    if (val === "packaging_types") {

      this.showPackagingType = true;
      this.service.getPackagingType().subscribe(res => {
        console.log(res);
        if (res === null) {
          this.showThisNoPackageTpe = true;
        } else {
          this.showThisNoPackageTpe = false;
          this.finalPackageGet = res[0].packaging_types;
          console.log(this.finalPackageGet);
        }
      }, err => {
        console.log(err);
      });

    } else {
      this.showPackagingType = false;
    }

  }
  // public closethisNow_delete_PKG() {
  //   $("#profile_delete_verified").trigger("click")
  // }
  closethisNow_Edit_PKG() {
    $("#profile_edit_verified_one").trigger("click")
    // console.log("1");
  }

  forEditPackagingTtype(item) {
    console.log(item);
    this.forEditPackageInfo = item;
    $('#packaging_type_id').val(this.forEditPackageInfo.packaging_type);
    $('#amount_id').val(this.forEditPackageInfo.amount);
  }
  // forDeletePackagingTtype(delete_item) {
  //   console.log(delete_item);
  //   this.forDeletePackagingType = delete_item;
  // }

  add_closethisNow_Edit_PKG() {
    $("#profile_edit_verified").trigger("click")
    $('#add_packaging_type_id').val("");
    $('#add_amount_id').val("");
  }
  add_package_create() {
    var add_packaging_type = $('#add_packaging_type_id').val();
    var add_packaging_amount = $('#add_amount_id').val();
    console.log(add_packaging_type);
    console.log(add_packaging_amount);

    if ((add_packaging_type === "" || add_packaging_type === undefined || add_packaging_type === null) && (add_packaging_amount === "" || add_packaging_amount === undefined || add_packaging_amount === null)) {
      console.log("null");
      this.add_showThisMessageForPackagingType = true;
      this.loader = false;
    } else {
      this.add_showThisMessageForPackagingType = false;
      var body = {
        "packaging_type": add_packaging_type,
        "amount": add_packaging_amount
      }
      console.log(body);
      this.service.createPackagingType(body).subscribe(res => {
        console.log(res);
        this.finalUpdateRes = res;
        $("#add_packaging_type").modal("hide");
        $('#add_packaging_type_id').val("");
        $('#add_amount_id').val("");
        this.selectedInfo("packaging_types");
        $.notify({
          icon: "add_alert",
          message: this.finalUpdateRes.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }, err => {
        console.log(err);
      });

    }


  }
  packageUpdate() {
    console.log(this.forEditPackageInfo);
    var packaging_type = $('#packaging_type_id').val();
    var packaging_amount = $('#amount_id').val();
    console.log(packaging_type);
    console.log(packaging_amount);

    if ((packaging_type === "" || packaging_type === undefined || packaging_type === null) && (packaging_amount === "" || packaging_amount === undefined || packaging_amount === null)) {
      console.log("null");
      this.showThisMessageForPackagingType = true;
      this.loader = false;
    } else {
      this.showThisMessageForPackagingType = false;
      var body = {
        "packaging_type": packaging_type,
        "amount": packaging_amount
      }
      console.log(body);
      this.service.editPackagingType(this.forEditPackageInfo.packaging_type_id, body).subscribe(res => {
        console.log(res);
        this.finalUpdateRes = res;
        $("#edit_packaging_type").modal("hide");
        this.selectedInfo("packaging_types");
        $.notify({
          icon: "add_alert",
          message: this.finalUpdateRes.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }, err => {
        console.log(err);
      });

    }

  }
  // packageDelete() {
  //   console.log(this.forDeletePackagingType);
  //   console.log(this.forDeletePackagingType.packaging_type_id);
  //   this.service.deletePackagingType(this.forDeletePackagingType.packaging_type_id).subscribe(res => {
  //     console.log(res);
  //     this.finalUpdateRes = res;
  //     $("#remove_packaging_type").modal("hide");
  //     this.selectedInfo("packaging_types");
  //     $.notify({
  //       icon: "add_alert",
  //       message: this.finalUpdateRes.message
  //     }, {
  //       type: 'info',
  //       timer: 1000,
  //       placement: {
  //         from: 'top',
  //         align: 'center'
  //       }
  //     });
  //   }, err => {
  //     console.log(err);
  //   });

  // }

  createPackagingType() {



    var createpackaging_type = $('#create_packaging_type_val').val();
    var createpackaging_amount = $('#create_amount_val').val();
    console.log(createpackaging_type);
    console.log(createpackaging_amount);

    if ((createpackaging_type === "" || createpackaging_type === undefined || createpackaging_type === null) && (createpackaging_amount === "" || createpackaging_amount === undefined || createpackaging_amount === null)) {
      console.log("null");
      this.showThisMessageForCreatePackagingType = true;
      this.loader = false;
    } else {
      this.showThisMessageForCreatePackagingType = false;
      var body = {
        "packaging_type": createpackaging_type,
        "amount": createpackaging_amount
      }
      console.log(body);
      this.service.createPackagingType(body).subscribe(res => {
        console.log(res);
        this.finalUpdateRes = res;
        this.selectedInfo("packaging_types");
        $.notify({
          icon: "add_alert",
          message: this.finalUpdateRes.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }, err => {
        console.log(err);
      });

    }



  }
  check(i) {
    var minVal = $('#minimum_cart_val' + i).val();
    var maxVal = $('#maximum_cart_val' + i).val();
    console.log(minVal);
    console.log(maxVal);
    if (minVal >= maxVal) {
      $('#maximum_cart_val' + i).val("");
    }
  }
  check2(i) {
    var minVal = $('#minimum_cart_val' + i).val();
    var maxVal = $('#maximum_cart_val' + i).val();
    console.log(minVal);
    console.log(maxVal);
    if (minVal >= maxVal) {
      $('#maximum_cart_val' + i).val("");
    }
  }


  createNewDeliveryCharges() {


    this.loader = true;

    console.log(this.deliveryChargesArray);
    for (var i = 0; i < (this.deliveryChargesArray.length - 1); i++) {
      let abc = Number(this.deliveryChargesArray[i].max_cart_value);
      let efg = Number(this.deliveryChargesArray[i + 1].min_cart_value);
      console.log(abc, typeof (abc));
      console.log(efg, typeof (efg));
      if (abc >= efg) {
        if (i != (this.deliveryChargesArray.length - 1)) {
          this.misMatchCheck = false;
          i = this.deliveryChargesArray.length
        } else {
          this.misMatchCheck = true;
        }
      } else {
        this.misMatchCheck = true;
      }
    }
    for (var i = 0; i < this.deliveryChargesArray.length; i++) {
      if (this.deliveryChargesArray[i].min_cart_value === "" || this.deliveryChargesArray[i].max_cart_value === "" || this.deliveryChargesArray[i].amount === "") {
        this.validationMessage = false;
        console.log("something is missing");
      } else {
        if (this.misMatchCheck === false) {
          var minVal = $('#minimum_cart_val' + i).val();
          var maxVal = $('#maximum_cart_val' + i).val();
          console.log(minVal);
          console.log(maxVal);
          if (parseFloat(maxVal) <= parseFloat(minVal)) {
            $('#maximum_cart_val' + i).val("");
            console.log("false");
            this.deliveryChargesMissMatch = true;
          } else {
            this.deliveryChargesMissMatch = false;
            this.validationMessage = true;
            this.misMatchCheck = false;
          }
        } else {
          var minValT = $('#minimum_cart_val' + i).val();
          var maxValT = $('#maximum_cart_val' + i).val();
          console.log(minValT);
          console.log(maxValT);
          if (parseFloat(maxValT) <= parseFloat(minValT)) {
            $('#maximum_cart_val' + i).val("");
            console.log("false");
            this.deliveryChargesMissMatch = true;
          } else {
            this.deliveryChargesMissMatch = false;
            this.validationMessage = true;
            this.misMatchCheck = true;
          }
        }

        // else {
        // if (this.misMatchCheck === false) {
        //   console.log("no");
        //   this.validationMessage = true;
        // } else {
        // this.validationMessage = true;
        // }
        // }
      }
    }
    console.log(this.validationMessage);
    if (this.validationMessage === false) {
      $.notify({
        icon: "add_alert",
        message: "Please Fill the Mandatory Fields"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.loader = false;
    } else {
      if (this.misMatchCheck === false) {
        $.notify({
          icon: "add_alert",
          message: "Please Check the Minimum and Maximum Cart Values"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.loader = false;
      } else {
        if (this.deliveryChargesMissMatch === true) {
          $.notify({
            icon: "add_alert",
            message: "Maximum Cart Value should be Greater Than Minimum Cart value"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        } else {
          var req = {
            "delivery_charges": this.deliveryChargesArray
          }
          this.service.createDeliveryCharges(req).subscribe(res => {
            console.log(res);
            this.configurationRes = res;
            $.notify({
              icon: "add_alert",
              message: this.configurationRes.message
            }, {
              type: 'info',
              timer: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
            this.loader = false;
            this.selectedInfo("delivery");
            this.ngOnInit();
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
    }
  }
  cancel() {
    // this.deliveryChargesArray = [];
    // this.message_display = true;
    this.selectedInfo("delivery")    // this.showCreate = true;
    this.showDelete = false;
    // this.showUpdate = false;
    // this.delete(i);
    // this.showEdit = true;
    // this.message_display_button = false;
  }

  getTheDeliveryCharges() {
    this.loader = true;
    this.service.getDeliveryCharges().subscribe(res => {
      console.log(res);
      this.charges = res;
      console.log(this.charges[0].delivery_charges);
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }
  close_updatingTheMinimum_order_val() {
    $("#updatingThe_Mini_order_val").trigger("click");
  }
  updateMinimumOrderValue(item) {
    console.log(item);
    this.shareThisItemToUpdate = item;
    $('#updatingTheMinimum_order_val_id').val(item.min_order_value);
  }
  updatingTheMinimum_order_val_Update() {
    console.log(this.shareThisItemToUpdate);
    var updatedMiniVal = $('#updatingTheMinimum_order_val_id').val();
    if (updatedMiniVal === "" || updatedMiniVal === undefined || updatedMiniVal === null) {
      this.showThisMessageForUpdatedMini_orderVal = true;
    } else {
      this.showThisMessageForUpdatedMini_orderVal = false;
      var body = {
        "min_order_value": $('#updatingTheMinimum_order_val_id').val()
      }
      console.log(body);
      this.service.updateMiniOrderval(this.shareThisItemToUpdate.min_order_value_id, body).subscribe(res => {
        console.log(res);
        this.finalRes = res;
        $("#updatingThe_Mini_order_val").modal("hide");
        this.selectedInfo("min_order");
        $.notify({
          icon: "add_alert",
          message: this.finalRes.message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }, err => {
        console.log(err);
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


  // createMinimumOrderValue() {
  //   var minimumOrderVal = $('#minimum_order_val').val();
  //   console.log(minimumOrderVal);

  //   var req = {
  //     "min_order_value": minimumOrderVal
  //   }
  //   if (req.min_order_value === "") {

  //   } else {
  //     console.log(req);
  //     this.service.createminOrderVal(req).subscribe(res => {
  //       console.log(res);
  //       this.finalRes = res;
  //       $.notify({
  //         icon: "add_alert",
  //         message: this.finalRes.message
  //       }, {
  //         type: 'info',
  //         timer: 1000,
  //         placement: {
  //           from: 'top',
  //           align: 'center'
  //         }
  //       });
  //     }, err => {
  //       console.log(err);
  //       $.notify({
  //         icon: "add_alert",
  //         message: err.error.error_desc
  //       }, {
  //         type: 'info',
  //         timer: 1000,
  //         placement: {
  //           from: 'top',
  //           align: 'center'
  //         }
  //       });
  //     });
  //   }

  // }

}
