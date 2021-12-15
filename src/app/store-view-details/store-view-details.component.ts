import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-store-view-details',
  templateUrl: './store-view-details.component.html',
  styleUrls: ['./store-view-details.component.css']
})
export class StoreViewDetailsComponent implements OnInit {

  sub: any;
  id: any;
  customer_ID: any;
  selectedStoreInfoList: any;
  address: any;
  updateStoreForm: FormGroup;
  checkEdit: boolean = false;
  submitted: boolean;
  addressID: any;
  public loader: boolean = false;
  updatedNow: any;
  store_status: { status: string; value: string; }[];
  months: { value: any; name: string; }[];

  weekDays: { value: any; name: string; }[];
  serviceablePincodesGET: any;
  serviceablitypincodes: any;
  numberOfDaysArray = [];
  days: { value: number; }[];
  selectedAlldata = [];
  selectedAlldata_new = [];
  selectedAlldata_days = [];
  selectedAlldata_days_new = [];
  dict = {};
  dict_days = {};
  slotscrestRes: any;
  slotsInformation: any;
  monthsgetArray = [];
  monthsgetArray_new = [];
  daysLiat = [];
  daysListFinal = [];
  is_activeOrNot: { status: string; value: string; }[];
  numberOfDaysArray1 = [];
  checkednow = [];
  is_activeOrNot_new: { status: string; value: string; }[];
  days_new: { value: number; }[];
  months_new: { name: string; value: number; }[];
  numberOfDaysArray_new = [];
  showThisScreenWithPermissions: any;
  permissionForOnlyThisScreen = [];
  allPermissionForOnlyThisScreen: any;
  lat = [];
  long = [];
  serviceablitypincodeslatitude: any;
  serviceablitypincodeslongitude: any;
  calledParam: any;
  months_submit = [];
  daysLiat_submit = [];
  daysListFinal_submit = [];
  newMethod_Months: any;
  newMethod_Months1: any;
  resPoseDetails: any;
  finalaylatGet: any;
  finalaylongGet: any;
  // modifyNew: { slot_start_time: string; slot_end_time: string; slot_limit: any; is_active: boolean; };
  // modifyNew : any;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: SharedServiceService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      // console.log(this.id);
    });
    this.getSelectedStoreDetails(this.id.store_id);
    this.getThePurtiqularSlotData(this.id.store_id);
    this.updateStoreForm = this.formBuilder.group({
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
  get a() { return this.updateStoreForm.controls; }





  ngOnInit(): void {



    this.is_activeOrNot_new = [
      {
        "status": "Active",
        "value": "true"
      },
      {
        "status": "Inactive",
        "value": "false"
      }
    ]
    this.days_new = [
      { "value": 1 },
      { "value": 2 },
      { "value": 3 }, { "value": 4 }, { "value": 5 }, { "value": 6 }, { "value": 7 }, { "value": 8 }, { "value": 9 }, { "value": 10 }, { "value": 11 }, { "value": 12 }, { "value": 13 }, { "value": 14 }, { "value": 15 }, { "value": 16 }, { "value": 17 }, { "value": 18 }, { "value": 19 }, { "value": 20 }, { "value": 21 }, { "value": 22 }, { "value": 23 }, { "value": 24 }, { "value": 25 }, { "value": 26 }, { "value": 27 }, { "value": 28 }, { "value": 29 }, { "value": 30 }, { "value": 31 },

    ]
    this.months_new = [
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

    this.numberOfDaysArray_new = []
    this.numberOfDaysArray_new.push({
      time_slots: [
        {
          "slot_start_time": "",
          "slot_end_time": "",
          "slot_limit": "",
          "is_active": ""
        },
      ]
    });
    // console.log(this.numberOfDaysArray_new);



    this.store_status =
      [{
        "status": "Active",
        "value": "true"
      }, {
        "status": "Inactive",
        "value": "false"
      }
      ]
    this.weekDays = [{
      "value": "0",
      "name": "Sunday"
    },
    {
      "value": "1",
      "name": "Monday"
    },
    {
      "value": "2",
      "name": "Tuesday"
    },
    {
      "value": "3",
      "name": "Wednesday"
    },
    {
      "value": "4",
      "name": "Thursday"
    },
    {
      "value": "5",
      "name": "Friday"
    },
    {
      "value": "6",
      "name": "Saturday"
    },]



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

  add_new(i) {
    this.numberOfDaysArray_new[i].time_slots.push({
      "slot_start_time": "",
      "slot_end_time": "",
      "slot_limit": "",
      "is_active": ""
    });
  }
  remove_new(i) {
    // console.log(this.numberOfDaysArray_new);
    if (this.numberOfDaysArray_new[0].time_slots.length > 1) {
      this.numberOfDaysArray_new[i].time_slots.pop();
    } else {
      // console.log("fghj");

    }
  }


  // onItemSelect(item: any) {
  //   // console.log('onItemSelect', item);
  // }

  // toggleCloseDropdownSelection() {
  //   this.closeDropdownSelection = !this.closeDropdownSelection;
  //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  // }
  getSelectedStoreDetails(id) {
    // console.log(id);
    this.loader = true;
    this.service.getSelectedStoreInfo(id).subscribe(getSelectedStoreDetailsRes => {
      console.log(getSelectedStoreDetailsRes);
      this.selectedStoreInfoList = getSelectedStoreDetailsRes;
      this.serviceablePincodesGET = this.selectedStoreInfoList.serviceable_pincodes.join(',');
      // console.log(this.selectedStoreInfoList.lat_longs.toString());


      for (var i = 0; i < this.selectedStoreInfoList.lat_longs.length; i++) {
        this.lat[i] = this.selectedStoreInfoList.lat_longs[i][0];
        this.long[i] = this.selectedStoreInfoList.lat_longs[i][1];
      }
      // console.log(this.lat);
      // console.log(this.long);
      this.finalaylatGet = this.lat.toString();
      this.finalaylongGet = this.long.toString();
      // console.log(this.finalaylatGet);
      // console.log(this.finalaylongGet);
      this.loader = false;
    }, err => {
      this.loader = false;
    })
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
  edit() {
    this.checkEdit = true;
    $('#edit_this').css("display", "none");
    $('#update_this').css("display", "block");
    document.getElementById('store_name_id').removeAttribute('readonly');
    document.getElementById('phone_no_id').removeAttribute('readonly');
    document.getElementById('plant_code_id').removeAttribute('readonly');
    document.getElementById('ds_code_id').removeAttribute('readonly');
    document.getElementById('line_1_id').removeAttribute('readonly');
    document.getElementById('line_2_id').removeAttribute('readonly');
    document.getElementById('street_id').removeAttribute('readonly');
    document.getElementById('country_id').removeAttribute('readonly');
    document.getElementById('state_id').removeAttribute('readonly');
    document.getElementById('city_id').removeAttribute('readonly');
    document.getElementById('pincode_id').removeAttribute('readonly');
    document.getElementById('serviceable_pincodes_ID').removeAttribute('readonly');
    document.getElementById('zone_ID').removeAttribute('readonly');
    document.getElementById('lat').removeAttribute('readonly');
    document.getElementById('long').removeAttribute('readonly');
    document.getElementById('sales_org_id').removeAttribute('readonly');
    document.getElementById('customer_id').removeAttribute('readonly');
    document.getElementById('profit_center_id').removeAttribute('readonly');
    document.getElementById('bupla_id').removeAttribute('readonly');
    document.getElementById('company_code_id').removeAttribute('readonly');


    $('#store_id').attr('disabled', false);

  }
  Update() {
    // $('#edit_this').css("display", "block");
    // $('#update_this').css("display", "none");
    this.loader = true;
    this.submitted = true;
    if (this.updateStoreForm.invalid) {
      this.loader = false;
      return;
    }
    // console.log(this.updateStoreForm.value);
    this.serviceablitypincodes = this.a.serviceable_pincodes.value;
    // console.log(this.serviceablitypincodes);
    // console.log(parseInt(this.serviceablitypincodes));
    var value = this.serviceablitypincodes.split(",");
    let finalServiceable_pincodes = [];
    // console.log(value);
    for (var i = 0; i < value.length; i++) {
      var Serviceable_pincodes = parseInt(value[i]);
      // var Serviceable_pincodes = value[i];
      finalServiceable_pincodes.push(Serviceable_pincodes);
    }
    // console.log(finalServiceable_pincodes);

    this.serviceablitypincodeslatitude = this.a.latitude.value;
    // console.log(this.serviceablitypincodeslatitude);

    if (this.serviceablitypincodeslatitude.length === 1) {
      var finalServiceable_pincodeslatitude = [];
      for (var i = 0; i < this.serviceablitypincodeslatitude.length; i++) {
        var Serviceable_pincodes_latitude = parseFloat(this.serviceablitypincodeslatitude[i]);
        finalServiceable_pincodeslatitude.push(Serviceable_pincodes_latitude);
      }
      // console.log(finalServiceable_pincodeslatitude);
    } else {
      var valuelatlatitude = this.serviceablitypincodeslatitude.split(",");
      // console.log(valuelatlatitude);
      var finalServiceable_pincodeslatitude = [];
      // console.log(valuelatlatitude);
      for (var i = 0; i < valuelatlatitude.length; i++) {
        var Serviceable_pincodes_latitude = parseFloat(valuelatlatitude[i]);
        finalServiceable_pincodeslatitude.push(Serviceable_pincodes_latitude);
      }
      // console.log(finalServiceable_pincodeslatitude);
    }

    // // console.log(this.a.longitude.value);
    this.serviceablitypincodeslongitude = this.a.longitude.value;
    // console.log(this.serviceablitypincodeslongitude);
    if (this.serviceablitypincodeslongitude.length === 1) {
      var finalServiceable_pincodeslongitude = [];
      for (var i = 0; i < this.serviceablitypincodeslongitude.length; i++) {
        var Serviceable_pincodes_longitude = parseFloat(this.serviceablitypincodeslongitude[i]);
        finalServiceable_pincodeslongitude.push(Serviceable_pincodes_longitude);
      }
    } else {
      var valuelatlongitude = this.serviceablitypincodeslongitude.split(",");
      var finalServiceable_pincodeslongitude = [];
      for (var i = 0; i < valuelatlongitude.length; i++) {
        var Serviceable_pincodes_longitude = parseFloat(valuelatlongitude[i]);
        finalServiceable_pincodeslongitude.push(Serviceable_pincodes_longitude);
      }
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

      var res = {
        "store_name": this.a.store_name.value,
        "phone_no": this.a.phone_no.value,
        "plant_code": this.a.plant_code.value,
        "ds_code": this.a.ds_code.value,
        "is_sfs_enabled": "False",
        "is_cc_enabled": "False",
        "is_active": this.a.is_active.value,
        "serviceable_pincodes": finalServiceable_pincodes,
        "lat_longs": subLatLongArray,
        "zone": this.a.zone.value,
        "sales_org": this.a.sales_org.value,
        "customer": this.a.customer.value,
        "profit_center": this.a.profit_center.value,
        "bupla": this.a.bupla.value,
        "company_code": this.a.company_code.value
      }
      console.log(res);
      var id = this.selectedStoreInfoList.store_id;
      // console.log(id);
      this.service.updateSelecteStore(id, res).subscribe(updateres => {
        // console.log(updateres);

        this.addressID = this.selectedStoreInfoList.address_id;
        var new_address_res = {
          "first_name": "store_person_first_name",
          "last_name": "store_person_last_name",
          "email": "email@gmail.com",
          "mobile": 9865969589,
          "line_1": this.a.line_1.value,
          "line_2": this.a.line_2.value,
          "street": this.a.street.value,
          "city": this.a.city.value,
          "state": this.a.state.value,
          "country": this.a.country.value,
          "is_billing": "False",
          "is_shipping": "True",
          "pincode": this.a.pincode.value
        }
        // console.log(new_address_res);
        this.service.updateTheAddressOfSelectedStore(this.addressID, new_address_res).subscribe(updateaddress => {
          // console.log(updateaddress);
          $('#edit_this').css("display", "block");
          $('#update_this').css("display", "none");
          $("#store_name_id").attr("readonly", "true");
          $("#phone_no_id").attr("readonly", "true");
          $("#plant_code_id").attr("readonly", "true");
          $("#ds_code_id").attr("readonly", "true");
          $("#line_1_id").attr("readonly", "true");
          $("#line_2_id").attr("readonly", "true");
          $("#street_id").attr("readonly", "true");
          $("#country_id").attr("readonly", "true");
          $("#state_id").attr("readonly", "true");
          $("#city_id").attr("readonly", "true");
          $("#pincode_id").attr("readonly", "true");
          $('#store_id').attr('disabled', true);
          $("#serviceable_pincodes_ID").attr("readonly", "true");
          $("#zone_ID").attr("readonly", "true");
          $("#lat").attr("readonly", "true");
          $("#long").attr("readonly", "true");
          $("#sales_org_id").attr("readonly", "true");
          $("#customer_id").attr("readonly", "true");
          $("#profit_center_id").attr("readonly", "true");
          $("#bupla_id").attr("readonly", "true");
          $("#company_code_id").attr("readonly", "true");

          this.router.navigate(['/stores']);
          this.loader = false;
          this.updatedNow = updateres;
          $.notify({
            icon: "add_alert",
            message: this.updatedNow.message,
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
        }, err => {
          // console.log(err);
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
      }, err => {
        // console.log(err);
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
  public getThePurtiqularSlotData(id) {
    this.service.getSelectedStoreSlots(id).subscribe(slotsGetRes => {
      // console.log(slotsGetRes);
      this.slotsInformation = slotsGetRes;
      this.monthsgetArray = [];
      for (var i = 0; i < this.slotsInformation.slots.length; i++) {
        this.monthsgetArray.push(this.slotsInformation.slots[i].month);
      }
      // console.log(this.monthsgetArray);
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
      for (var i = 0; i < this.months.length; i++) {
        var n = this.monthsgetArray.includes(this.months[i].value);
        if (n) {
          this.months[i]["values"] = true
        } else {
          this.months[i]["values"] = false
        }
      }
      // console.log(this.months);
      this.daysLiat = [];
      for (var i = 0; i < this.slotsInformation.slots.length; i++) {
        // this.monthsgetArray.push(this.slotsInformation.slots[i].month);
        for (var j = 0; j < this.slotsInformation.slots[i].day_slots.length; j++) {
          // var days = {
          //    this.slotsInformation.slots[i].day_slots[j].day
          // }
          this.daysLiat.push(this.slotsInformation.slots[i].day_slots[j].day);
        }
      }
      // this.daysLiat = this.slotsInformation.slots[0].day_slots.length
      // console.log(this.daysLiat);

      this.daysListFinal = [
        { "day": 1 },
        { "day": 2 },
        { "day": 3 },
        { "day": 4 },
        { "day": 5 },
        { "day": 6 },
        { "day": 7 },
        { "day": 8 },
        { "day": 9 },
        { "day": 10 },
        { "day": 11 },
        { "day": 12 },
        { "day": 13 },
        { "day": 14 },
        { "day": 15 },
        { "day": 16 },
        { "day": 17 },
        { "day": 18 },
        { "day": 19 },
        { "day": 20 },
        { "day": 21 },
        { "day": 22 },
        { "day": 23 },
        { "day": 24 },
        { "day": 25 },
        { "day": 26 },
        { "day": 27 },
        { "day": 28 },
        { "day": 29 },
        { "day": 30 },
        { "day": 31 },
      ]

      // this.daysListFinal = [];
      for (var j = 0; j < this.daysListFinal.length; j++) {
        var n = this.daysLiat.includes(this.daysListFinal[j].day);
        if (n) {
          this.daysListFinal[j]["value"] = true
        } else {
          this.daysListFinal[j]["value"] = false
        }
        // var use = {
        //   "day": this.slotsInformation.slots[0].day_slots[j].day,
        //   "value": true
        // }
        // this.daysListFinal.push(use);
      }
      // console.log(this.daysListFinal);

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
      this.numberOfDaysArray = [
        {
          "time_slots": this.slotsInformation.slots[0].day_slots[0].time_slots
        }]
      // console.log(this.numberOfDaysArray);

      var str = "2020-10-17T10:00:00Z";
      var splitted = str.split("T");
      var finalsplitted = splitted[1].split("Z");
      // console.log(finalsplitted[0]);
      // console.log(this.numberOfDaysArray);

      for (var k = 0; k < this.numberOfDaysArray[0].time_slots.length; k++) {
        const splitted = this.numberOfDaysArray[0].time_slots[k].slot_start_time.split("T");
        const finalsplitted = splitted[1].split("Z");
        const splittedEndTime = this.numberOfDaysArray[0].time_slots[k].slot_end_time.split("T");
        const finalsplittedEndTime = splittedEndTime[1].split("Z");
        this.numberOfDaysArray1.push({
          time_slots: [
            {
              "slot_start_time": finalsplitted[0],
              "slot_end_time": finalsplittedEndTime[0],
              "slot_limit": this.numberOfDaysArray[0].time_slots[k].slot_limit,
              "is_active": this.numberOfDaysArray[0].time_slots[k].is_active
            },
          ]
        });
      }
      // this.numberOfDaysArray = this.numberOfDaysArray.slice(1, 4);
      // console.log(this.numberOfDaysArray1);
      this.checkednow = [];
      for (var p = 0; p < this.numberOfDaysArray1.length; p++) {
        this.checkednow.push(this.numberOfDaysArray1[p].time_slots[0]);
      }
      // console.log(this.checkednow);
      this.numberOfDaysArray_new = [
        {
          "time_slots": this.checkednow
        }]
      // console.log(this.numberOfDaysArray_new);
    }, err => {
      // console.log(err);
    });
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


  public cancel() {
    this.router.navigate(['/stores']);
  }

  all_days_new(data) {
    for (var i = 0; i < data.length; i++) {
      this.selectedAlldata_days_new.push(data[i].day);
    }
    // this.selectedAlldata_days = data;
    // console.log(this.selectedAlldata_days_new);
    if ($('#selectall_days_new').prop("checked") == true) {
      $('body').on('click', '#selectall_days_new', function () {
        $('.singlechkbox_days_new').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata_days_new);
    }
    else if ($('#selectall_days_new').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata_days_new = [];
      // console.log(this.selectedAlldata_days_new);
    }

  }
  single_days_new(event_days, data_days) {
    // console.log(data_days);

    if (this.dict_days.hasOwnProperty(event_days)) {
      delete this.dict_days[event_days];
    } else {
      this.dict_days[event_days] = data_days;
    }
    this.selectedAlldata_days_new = [];
    for (var key in this.dict_days) {
      this.selectedAlldata_days_new.push(this.dict_days[key]);
    }
    // console.log(this.selectedAlldata_days_new);


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


  all_new(data) {
    for (var i = 0; i < data.length; i++) {
      this.selectedAlldata_new.push(data[i].value);
    }
    // this.selectedAlldata = data;
    // console.log(this.selectedAlldata_new);
    if ($('#selectall_new').prop("checked") == true) {
      $('body').on('click', '#selectall_new', function () {
        $('.singlechkbox_new').prop('checked', this.checked);
      });
      // console.log("Checkbox is checked.");
      // console.log(this.selectedAlldata_new);
    }
    else if ($('#selectall_new').prop("checked") == false) {
      // console.log("Checkbox is unchecked.");
      this.selectedAlldata_new = [];
      // console.log(this.selectedAlldata_new);
    }

  }
  single_new(event, data) {

    this.newMethod_Months = $('#new_method' + { event }).val();


    // console.log(data);
    // console.log(event + 1);
    if (this.dict.hasOwnProperty(event)) {
      delete this.dict[event];
    } else {
      this.dict[event] = data;
    }
    this.selectedAlldata_new = [];
    for (var key in this.dict) {
      this.selectedAlldata_new.push(this.dict[key]);
    }
    // console.log(this.selectedAlldata_new);


    $('body').on('click', '.singlechkbox_new', function () {
      if ($('.singlechkbox_new').length == $('.singlechkbox_new:checked').length) {
        $('#selectall_new').prop('checked', true);
        // // console.log("Checkbox is checked.");
      } else {
        $("#selectall_new").prop('checked', false);
        // // console.log("Checkbox is unchecked.");
      }
    });
  }
  edit_store_slots() {

    $('#show_hide_this').css("display", "block");
    $('#selectall_new').attr('disabled', false);
    $('.singlechkbox_new').attr('disabled', false);

    $('#selectall_days_new').attr('disabled', false);
    $('.singlechkbox_days_new').attr('disabled', false);

    $('.info_status').attr('disabled', false);

    $('#hide_this_edit').css("display", "none");
    $('#show_this_update').css("display", "block");



    // $('.full_store_slots_info').css("display", "none");

    // $('.Custome_slots_creat_edit').css("display", "block");


  }


  public createSlotsForStore() {
    this.loader = true;
    // // console.log(this.months);
    // // console.log(this.months);
    // // console.log(this.selectedAlldata_new);
    // // console.log(this.selectedAlldata_days_new);

    // var result = [];
    // var modifiedArray = [];
    // // console.log(this.newMethod_Months);

    // console.log(this.days_new);
    // console.log(this.months_new);


    // console.log($('#new_method3').prop("checked"))
    // console.log($('#new_method3').val());
    var finalMonthsArray = [];
    for (var i = 0; i < this.months_new.length; i++) {
      if ($('#new_method' + i).prop("checked") === true) {
        finalMonthsArray.push(i + 1);
      }
    }
    // console.log(finalMonthsArray);

    var finalDaysArray = [];
    for (var i = 0; i < this.days_new.length; i++) {
      if ($('#new_method_for_day' + i).prop("checked") === true) {
        finalDaysArray.push(i + 1);
      }
    }
    // console.log(finalDaysArray);

    // console.log(this.slotsInformation.store_id);
    // console.log(this.numberOfDaysArray_new[0].time_slots);
    var time_slots_array = [];
    for (var i = 0; i < this.numberOfDaysArray_new[0].time_slots.length; i++) {
      var modifyNew = {
        "slot_start_time": "2020-12-17T:" + this.numberOfDaysArray_new[0].time_slots[i].slot_start_time + "Z",
        "slot_end_time": "2020-12-17T:" + this.numberOfDaysArray_new[0].time_slots[i].slot_end_time + "Z",
        "slot_limit": this.numberOfDaysArray_new[0].time_slots[i].slot_limit,
        "is_active": this.numberOfDaysArray_new[0].time_slots[i].is_active,
      }
      time_slots_array.push(modifyNew);
    }
    // console.log(time_slots_array)
    var req = {
      "store_id": this.slotsInformation.store_id,
      "months": finalMonthsArray,
      "day_slots": [
        {
          "open_days": finalDaysArray,
          "open_time": "2020-12-17T10:30:00Z",
          "close_time": "2020-12-18T18:00:00Z",
          "time_slots": time_slots_array
        }
      ]
    }
    // console.log(req);
    this.service.updateTheStoreSlots(req).subscribe(res => {
      // console.log(res);
      this.resPoseDetails = res;
      this.loader = false;
      this.router.navigate(['/stores']);
      $.notify({
        icon: "add_alert",
        message: this.resPoseDetails.message,
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
    }, err => {
      // console.log(err);
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