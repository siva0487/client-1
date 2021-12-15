import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'underscore';
import { ExportService } from 'app/_services/export.service';
declare var $: any;




@Component({
  selector: 'app-returns-and-refunds',
  templateUrl: './returns-and-refunds.component.html',
  styleUrls: ['./returns-and-refunds.component.css']
})
export class ReturnsAndRefundsComponent implements OnInit {

  isButtonEnable: boolean;
  pos: string;
  post: string;
  dynamicorderDetailsByCheckBox: any[];
  dict = {};
  selectedInfoForEdit: any;

  selectedInfoForView: any;
  finalData: { customer_id: string; order_id: string; order_amount: string; order_type: string; return_status: string; }[];
  selectedAlldata = [];;
  selectedAlldataArray = [];
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  constructor(private router: Router, private exportService: ExportService) {
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

  all(data) {
    this.selectedAlldata = data;
    // console.log(this.selectedAlldata);
    if ($('#selectall').prop("checked") == true) {
      $('body').on('click', '#selectall', function () {
        $('.singlechkbox').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata);
    }
    else if ($('#selectall').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata = [];
      // console.log(this.selectedAlldata);
    }

  }
  generate() {
    if (this.selectedAlldata.length > 0) {
      this.exportService.exportExcel(this.selectedAlldata, 'Returns&Refund Export');
      $('#selectall').prop("checked") == false
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
  }
  ngOnInit(): void {
    this.finalData = [
      {
        "customer_id": "12356",
        "order_id": "65926613",
        "order_amount": "56000",
        "order_type": "Normal",
        "return_status": "Approved"
      },
      {
        "customer_id": "56296",
        "order_id": "93100267",
        "order_amount": "2000",
        "order_type": "Normal",
        "return_status": "Pending"
      },
      {
        "customer_id": "96200",
        "order_id": "300219580",
        "order_amount": "3000",
        "order_type": "subscription",
        "return_status": "Pending"
      },
      // {
      //   "customer_id": "12356",
      //   "order_id": "65926613",
      //   "order_amount": "56000",
      //   "order_type": "COD",
      //   "return_status": "Approved"
      // },
      // {
      //   "customer_id": "12356",
      //   "order_id": "65926613",
      //   "order_amount": "56000",
      //   "order_type": "COD",
      //   "return_status": "Approved"
      // },
      // {
      //   "customer_id": "12356",
      //   "order_id": "65926613",
      //   "order_amount": "56000",
      //   "order_type": "COD",
      //   "return_status": "Approved"
      // },
      // {
      //   "customer_id": "12356",
      //   "order_id": "65926613",
      //   "order_amount": "56000",
      //   "order_type": "COD",
      //   "return_status": "Approved"
      // }
    ];
  }

  public viewValue(Id) {
    this.selectedInfoForView = Id;
    this.router.navigate(['/raturns-refunds-view-details', Id]);
  }

}
