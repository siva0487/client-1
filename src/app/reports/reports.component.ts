import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;
import { ExportService } from '../_services/export.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  custome_download_one: FormGroup;
  custome_download_two: FormGroup;
  custome_download_three: FormGroup;
  submitted: boolean;
  submitted_one: boolean;
  submitted_two: boolean;
  walletResDetails: any;
  financeResDetails: any;
  transactionResDetails: any;
  loader: boolean;
  showWallet: boolean;
  shareSelectedReport: any;
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  constructor(private exportService: ExportService, private formBuilder: FormBuilder, private service: SharedServiceService) {



    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Reports") {
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


    this.custome_download_one = this.formBuilder.group({
      from_date: [''],
      to_date: [''],
    });
    // this.custome_download_two = this.formBuilder.group({
    //   from_date: ['', Validators.required],
    //   to_date: ['', Validators.required],
    // });
    // this.custome_download_three = this.formBuilder.group({
    //   from_date: ['', Validators.required],
    //   to_date: ['', Validators.required],
    // });

  }

  get a() { return this.custome_download_one.controls; }
  // get b() { return this.custome_download_two.controls; }
  // get c() { return this.custome_download_three.controls; }


  ngOnInit(): void {
  }

  eraseAllF() {
    this.submitted_one = false;
    this.custome_download_three.reset();
  }
  eraseAllT() {
    this.submitted_two = false;
    this.custome_download_two.reset();
  }
  eraseAllW() {
    this.submitted = false;
    this.custome_download_one.reset();
  }


  selectedInfo(val) {
    console.log(val);
    this.shareSelectedReport = val;
    this.custome_download_one.reset();
    $('#to_date').val("");
    $('#from_date').val("");
    if (val === "select") {
      this.showWallet = false;
    } else {
      this.showWallet = true;
    }
  }
  customeExport_wallet() {
    this.loader = true;
    console.log(this.custome_download_one.value);
    if (this.custome_download_one.value.from_date == "") {
      this.custome_download_one.value.from_date = null;
    }
    if (this.custome_download_one.value.to_date == "") {
      this.custome_download_one.value.to_date = null;
    }
    console.log(this.shareSelectedReport);
    console.log(this.custome_download_one.value);
    if (this.shareSelectedReport === "wallet") {
      console.log(this.custome_download_one.value);
      if (this.custome_download_one.value.from_date == "") {
        this.custome_download_one.value.from_date = null;
      }
      if (this.custome_download_one.value.to_date == "") {
        this.custome_download_one.value.to_date = null;
      }
      console.log(this.shareSelectedReport);
      console.log(this.custome_download_one.value);

      this.service.walletReportDownload(this.custome_download_one.value).subscribe(wRes => {
        console.log(wRes);
        if (wRes === null) {
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
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
          this.walletResDetails = wRes;
          this.exportService.exportExcel(this.walletResDetails[0].walletfilter, 'Wallet Reports');
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
        }
      }, err => {
        console.log(err);
        this.loader = false;
      });
    }
    if (this.shareSelectedReport === "transaction") {
      console.log(this.custome_download_one.value);
      if (this.custome_download_one.value.from_date == "") {
        this.custome_download_one.value.from_date = null;
      }
      if (this.custome_download_one.value.to_date == "") {
        this.custome_download_one.value.to_date = null;
      }
      console.log(this.shareSelectedReport);
      console.log(this.custome_download_one.value);
      this.service.transactionReportDownload(this.custome_download_one.value).subscribe(tRes => {
        console.log(tRes);
        if (tRes === null) {
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
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
          this.transactionResDetails = tRes;
          this.exportService.exportExcel(this.transactionResDetails[0].transactionsfilter, 'Transactions Reports');
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
        }
      }, err => {
        console.log(err);
        this.loader = false;
      });
    }
    if (this.shareSelectedReport === "finance") {
      console.log(this.custome_download_one.value);
      if (this.custome_download_one.value.from_date == "") {
        this.custome_download_one.value.from_date = null;
      }
      if (this.custome_download_one.value.to_date == "") {
        this.custome_download_one.value.to_date = null;
      }
      console.log(this.shareSelectedReport);
      console.log(this.custome_download_one.value);
      this.service.financeReportDownload(this.custome_download_one.value).subscribe(fRes => {
        console.log(fRes);
        if (fRes === null) {
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
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
          this.financeResDetails = fRes;
          this.exportService.exportExcel(this.financeResDetails[0].financefilter, 'Finance Report');
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
        }
      }, err => {
        this.loader = false;
        console.log(err);
      });
    }
    if (this.shareSelectedReport === "production" || this.shareSelectedReport === "sahyadrifarmproduct" || this.shareSelectedReport === "neworder" || this.shareSelectedReport === "categorywisesales" || this.shareSelectedReport === "customer" || this.shareSelectedReport === "delivery" || this.shareSelectedReport === "all_orders" || this.shareSelectedReport === "bulk_varient" || this.shareSelectedReport === "vehicle_plan" || this.shareSelectedReport === "vehicle_wise_dispatch_verification" || this.shareSelectedReport === "customer_order" || this.shareSelectedReport === "wing_wise_dispatch_verification" || this.shareSelectedReport === "product_master" || this.shareSelectedReport === "diily_oms" || this.shareSelectedReport === "WMS_upload_format" || this.shareSelectedReport === "picker_checker" || this.shareSelectedReport === "individual_store_dispatch_verification" || this.shareSelectedReport === "in_process") {
      console.log(this.custome_download_one.value);
      if (this.custome_download_one.value.from_date == "") {
        this.custome_download_one.value.from_date = null;
      }
      if (this.custome_download_one.value.to_date == "") {
        this.custome_download_one.value.to_date = null;
      }
      console.log(this.shareSelectedReport);
      console.log(this.custome_download_one.value);
      var reqBody = {
        "from_date": this.custome_download_one.value.from_date,
        "to_date": this.custome_download_one.value.to_date,
        "report_name": this.shareSelectedReport
      }
      console.log(reqBody);
      this.service.downloadNewReports(reqBody).subscribe(ReportsDownloadRES => {
        console.log(ReportsDownloadRES);
        if (ReportsDownloadRES === null) {
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
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
          this.financeResDetails = ReportsDownloadRES;
          this.exportService.exportExcel(this.financeResDetails[0].reportlist, this.shareSelectedReport + ' Report');
          this.loader = false;
          this.custome_download_one.reset();
          $('#to_date').val("");
          $('#from_date').val("");
        }
      }, err => {
        this.loader = false;
        console.log(err);
      });
    }

  }
}
