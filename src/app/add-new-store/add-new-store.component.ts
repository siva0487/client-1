import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
// import { months } from 'moment';
declare var $: any;


@Component({
  selector: 'app-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewStoreComponent implements OnInit {


  addNewStoreForm: FormGroup;
  submitted: boolean;
  request: any;
  createdRes: any;
  public loader: boolean = false;
  store_status_list: { status: string; value: string; }[];
  serviceablitypincodes: any;
  numberOfDaysArray = [];
  is_activeOrNot: { status: string; value: string; }[];
  months: { name: string; value: number; }[];
  days: { value: number; }[];
  toggle: boolean;
  togglemonth: boolean;
  selectedAlldata = [];
  selectedAlldata_days = [];
  dict = {};
  dict_days = {};
  slotscrestRes: any;
  // ----------------------------------------------------//
  // daysSelected: any[] = [];
  // event: any;
  // isSelected = (event: any) => {
  //   const date =
  //     event.getFullYear() +
  //     "-" +
  //     ("00" + (event.getMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("00" + event.getDate()).slice(-2);
  //   return this.daysSelected.find(x => x == date) ? "selected" : null;
  // };

  // select(event: any, calendar: any) {
  //   const date =
  //     event.getFullYear() +
  //     "-" +
  //     ("00" + (event.getMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("00" + event.getDate()).slice(-2);
  //   const index = this.daysSelected.findIndex(x => x == date);
  //   if (index < 0) this.daysSelected.push(date);
  //   else this.daysSelected.splice(index, 1);

  //   calendar.updateTodaysDate();
  //   // console.log(this.daysSelected);
  // }
  // ----------------------------------------------------//
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  serviceablitypincodeslatitude: any;
  serviceablitypincodeslongitude: any;
  private finalLatLongMArray = [];
  constructor(private router: Router, private formBuilder: FormBuilder, private service: SharedServiceService) {
    this.addNewStoreForm = this.formBuilder.group({
      store_name: ['', Validators.required],
      phone_no: ['', Validators.required],
      plant_code: ['', Validators.required],
      ds_code: ['', Validators.required],
      line_1: ['', Validators.required],
      line_2: ['', Validators.required],
      street: ['', Validators.required],
      is_active: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      serviceable_pincodes: ['', Validators.required],
      zone: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      sales_org: ['', Validators.required],
      customer: ['', Validators.required],
      profit_center: ['', Validators.required],
      bupla: ['', Validators.required],
      company_code: ['', Validators.required],
    });
    this.showThisScreenWithPermissions = JSON.parse(localStorage.getItem('screensList'));
    // console.log(this.showThisScreenWithPermissions);

    for (var i = 0; i < this.showThisScreenWithPermissions.screens.length; i++) {
      if (this.showThisScreenWithPermissions.screens[i].screen_name === "Stores Management") {
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


  get a() { return this.addNewStoreForm.controls; }
  ngOnInit(): void {
    this.store_status_list =
      [
        {
          "status": "Active",
          "value": "true"
        },
        {
          "status": "Inactive",
          "value": "false"
        }
      ]
    this.is_activeOrNot = [
      {
        "status": "Active",
        "value": "true"
      },
      {
        "status": "Inactive",
        "value": "false"
      }
    ]
    this.days = [
      { "value": 1 },
      { "value": 2 },
      { "value": 3 }, { "value": 4 }, { "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8 }, { "value": 9 }, { "value": 10 }, { "value": 11 }, { "value": 12 }, { "value": 13 }, { "value": 14 }, { "value": 15 }, { "value": 16 }, { "value": 17 }, { "value": 18 }, { "value": 19 }, { "value": 20 }, { "value": 21 }, { "value": 22 }, { "value": 23 }, { "value": 24 }, { "value": 25 }, { "value": 26 }, { "value": 27 }, { "value": 28 }, { "value": 29 }, { "value": 30 }, { "value": 31 },

    ]
    this.months = [
      {
        "name": "January",
        "value": 1
      },
      {
        "name": "February",
        "value": 2
      }, {
        "name": "March",
        "value": 3
      }, {
        "name": "April",
        "value": 4
      }, {
        "name": "May",
        "value": 5
      }, {
        "name": "June",
        "value": 6
      }, {
        "name": "July",
        "value": 7
      }, {
        "name": "August",
        "value": 8
      }, {
        "name": "September",
        "value": 9
      }, {
        "name": "October",
        "value": 10
      }, {
        "name": "November",
        "value": 11
      }, {
        "name": "December",
        "value": 12
      }
    ];

    this.numberOfDaysArray = []
    this.numberOfDaysArray.push({
      time_slots: [
        {
          "slot_start_time": "",
          "slot_end_time": "",
          "slot_limit": "",
          "is_active": ""
        },
      ]
    });
    // console.log(this.numberOfDaysArray);
  }

  toggled() {
    this.toggle = !this.toggle;
    //// console.log(this.toggle);
  }

  toggledmonth() {
    this.togglemonth = !this.togglemonth;
    //// console.log(this.toggle);
  }


  add(i) {
    this.numberOfDaysArray[i].time_slots.push({
      "slot_start_time": "",
      "slot_end_time": "",
      "slot_limit": "",
      "is_active": ""
    });
  }
  remove(i) {
    // console.log(this.numberOfDaysArray);
    if (this.numberOfDaysArray[0].time_slots.length > 1) {
      this.numberOfDaysArray[i].time_slots.pop();
    } else {
      // console.log("fghj");

    }
  }



  public createNewStore() {
    this.loader = true;
    this.submitted = true;
    if (this.addNewStoreForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.addNewStoreForm.value);
    this.serviceablitypincodes = this.a.serviceable_pincodes.value;
    // console.log(this.serviceablitypincodes);
    // console.log(parseInt(this.serviceablitypincodes));
    var value = this.serviceablitypincodes.split(",");
    // console.log(value);
    let finalServiceable_pincodes = [];
    // console.log(value);
    for (var i = 0; i < value.length; i++) {
      var Serviceable_pincodes = parseInt(value[i]);
      finalServiceable_pincodes.push(Serviceable_pincodes);
    }
    // console.log(finalServiceable_pincodes);

    // console.log(this.a.latitude.value);
    this.serviceablitypincodeslatitude = this.a.latitude.value;
    // console.log(this.serviceablitypincodeslatitude);
    // // console.log(parseInt(this.serviceablitypincodeslatitude));
    var valuelatlatitude = this.serviceablitypincodeslatitude.split(",");
    // console.log(valuelatlatitude);
    let finalServiceable_pincodeslatitude = [];
    // console.log(valuelatlatitude);
    for (var i = 0; i < valuelatlatitude.length; i++) {
      var Serviceable_pincodes_latitude = parseFloat(valuelatlatitude[i]);
      finalServiceable_pincodeslatitude.push(Serviceable_pincodes_latitude);
    }
    // console.log(finalServiceable_pincodeslatitude);
    // console.log(this.a.longitude.value);
    this.serviceablitypincodeslongitude = this.a.longitude.value;
    // console.log(this.serviceablitypincodeslongitude);
    // console.log(parseInt(this.serviceablitypincodeslongitude));
    var valuelatlongitude = this.serviceablitypincodeslongitude.split(",");
    // console.log(valuelatlongitude);
    let finalServiceable_pincodeslongitude = [];
    // console.log(valuelatlongitude);
    for (var i = 0; i < valuelatlongitude.length; i++) {
      var Serviceable_pincodes_longitude = parseFloat(valuelatlongitude[i]);
      finalServiceable_pincodeslongitude.push(Serviceable_pincodes_longitude);
    }
    // console.log(finalServiceable_pincodeslatitude);
    // console.log(finalServiceable_pincodeslongitude);
    if (finalServiceable_pincodeslatitude.length === finalServiceable_pincodeslongitude.length) {
      var subLatLongArray = [];
      for (var i = 0; i < finalServiceable_pincodeslongitude.length; i++) {
        var v = [
          finalServiceable_pincodeslatitude[i],
          finalServiceable_pincodeslongitude[i]
        ]
        subLatLongArray.push(v);
      }
      // console.log(subLatLongArray);
      // this.loader = false;
      var Request = {
        "store_name": this.a.store_name.value,
        "phone_no": this.a.phone_no.value,
        "is_sfs_enabled": "True",
        "is_cc_enabled": "True",
        "line_1": this.a.line_1.value,
        "line_2": this.a.line_2.value,
        "street": this.a.street.value,
        "city": this.a.city.value,
        "state": this.a.state.value,
        "country": this.a.country.value,
        "is_billing": "False",
        "is_shipping": "True",
        "plant_code": this.a.plant_code.value,
        "ds_code": this.a.ds_code.value,
        "pincode": this.a.pincode.value,
        "is_active": this.a.is_active.value,
        "lat_longs": subLatLongArray, 
        "serviceable_pincodes": finalServiceable_pincodes,
        "zone": this.a.zone.value,
        "sales_org": this.a.sales_org.value,
        "customer": this.a.customer.value,
        "profit_center": this.a.profit_center.value,
        "bupla": this.a.bupla.value,
        "company_code": this.a.company_code.value
      }

      // console.log(Request);
      this.service.createNewStoreAPI(Request).subscribe(Res => {
        console.log(Res);
        this.createdRes = Res;
        this.loader = false;
        $('.Custome_store_creat').css("display", "none");
        $('.Custome_slots_creat').css("display", "block");
      }, err => {
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: err.error.error_desc,
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        // console.log(err.error.error_desc);
      });
    } else {
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: "Please Check the lat&long",
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

  numberOnlyForSRP(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode != 8 && charCode != 44) {
      return false;
    } else {
      if ((charCode < 48 || charCode > 57) && charCode != 8 && charCode != 44) {
        event.preventDefault();
        return false;
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  public cancel() {
    this.router.navigate(['/stores']);
  }


  all(data) {
    for (var i = 0; i < data.length; i++) {
      this.selectedAlldata.push(data[i].value);
    }
    // this.selectedAlldata = data;
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


  all_days(data) {
    for (var i = 0; i < data.length; i++) {
      this.selectedAlldata_days.push(data[i].value);
    }
    // this.selectedAlldata_days = data;
    // console.log(this.selectedAlldata_days);
    if ($('#selectall_days').prop("checked") == true) {
      $('body').on('click', '#selectall_days', function () {
        $('.singlechkbox_days').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata_days);
    }
    else if ($('#selectall_days').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata_days = [];
      // console.log(this.selectedAlldata_days);
    }

  }
  single_days(event_days, data_days) {
    // console.log(data_days);

    if (this.dict_days.hasOwnProperty(event_days)) {
      delete this.dict_days[event_days];
    } else {
      this.dict_days[event_days] = data_days;
    }
    this.selectedAlldata_days = [];
    for (var key in this.dict_days) {
      this.selectedAlldata_days.push(this.dict_days[key]);
    }
    // console.log(this.selectedAlldata_days);


    $('body').on('click', '.singlechkbox_days', function () {
      if ($('.singlechkbox_days').length == $('.singlechkbox_days:checked').length) {
        $('#selectall_days').prop('checked', true);
        // // console.log("Checkbox is checked.");
      } else {
        $("#selectall_days").prop('checked', false);
        // // console.log("Checkbox is unchecked.");
      }
    });
  }

  public createSlotsForStore() {
    this.loader = true;
    // console.log(this.selectedAlldata);
    // console.log(this.selectedAlldata_days);
    // console.log(this.createdRes.store_id);
    // console.log(this.numberOfDaysArray[0].time_slots);
    var result = [];
    var modifiedArray = [];
    for (var j = 0; j < this.numberOfDaysArray[0].time_slots.length; j++) {
      if (this.numberOfDaysArray[0].time_slots[j].slot_start_time === "" || this.numberOfDaysArray[0].time_slots[j].slot_end_time === "" || this.numberOfDaysArray[0].time_slots[j].slot_limit === "" || this.numberOfDaysArray[0].time_slots[j].is_active === "") {
        result.push(true);
      } else {
        var time_slots =
        {
          "slot_start_time": "2020-10-17T:" + this.numberOfDaysArray[0].time_slots[j].slot_start_time + ":00Z",
          "slot_end_time": "2020-10-17T:" + this.numberOfDaysArray[0].time_slots[j].slot_end_time + ":00Z",
          "slot_limit": this.numberOfDaysArray[0].time_slots[j].slot_limit,
          "is_active": this.numberOfDaysArray[0].time_slots[j].is_active
        }
        modifiedArray.push(time_slots);
        result.push(false);
      }
    }
    if (this.selectedAlldata.length === 0 || this.selectedAlldata_days.length === 0) {
      $.notify({
        icon: "add_alert",
        message: "Please fill the all mandatory fields"
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
      if (result.includes(true)) {

        $.notify({
          icon: "add_alert",
          message: "Please fill the all mandatory fields"
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
        // console.log(modifiedArray);
        var request = {
          "store_id": this.createdRes.store_id,
          "months": this.selectedAlldata,
          "day_slots": [
            {
              "open_days": this.selectedAlldata_days,
              "open_time": "2020-10-17T18:45:35Z",
              "close_time": "2020-10-18T18:29:35Z",
              "time_slots": modifiedArray
            }

          ]
        }

        // console.log("Final Request", request);


        this.service.createSlotsForStore(request).subscribe(slotsres => {
          // console.log(slotsres);
          this.slotscrestRes = slotsres;
          $('.Custome_slots_creat').css("display", "none");
          $('.Custome_store_creat').css("display", "block");
          this.router.navigate(['/stores']);
          this.loader = false;

          $.notify({
            icon: "add_alert",
            message: "Store & Slots have been created successfully",
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        }, err => {
          this.loader = false;
          $.notify({
            icon: "add_alert",
            message: err.error.error_desc,
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
