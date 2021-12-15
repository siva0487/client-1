import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-create-new-slots',
  templateUrl: './create-new-slots.component.html',
  styleUrls: ['./create-new-slots.component.css']
})
export class CreateNewSlotsComponent implements OnInit {
  mainOuterArray = [];
  numberOfDaysArray = [];
  store_status_list: { status: string; value: string; }[];
  hidethis: boolean;
  validation: boolean;
  validation_time_slots: boolean;
  constructor(private router: Router) {

    $(function () {
      var dtToday = new Date();
      // var month = dtToday.getMonth() + 1;
      var month = JSON.stringify(dtToday.getMonth() + 1)

      // var day = dtToday.getDate();
      var day = JSON.stringify(dtToday.getDate())
      var year = dtToday.getFullYear();
      if ((dtToday.getMonth() + 1) < 10)
        month = '0' + month
      if (dtToday.getDate() < 10)
        day = '0' + day
      var maxDate = year + '-' + month + '-' + day;
      // alert(maxDate);
      //alert(startDate);
      $('#from_date').attr('min', maxDate);
      // alert(maxDate);
      $('#to_date').attr('min', maxDate);
    });

    // var date = new Date();
    // var day = JSON.stringify(date.getDate())
    // if (date.getDate() < 10) {
    //     day = "0" + day
    // } else {
    //     day = day;
    // }
    // var month = JSON.stringify(date.getMonth() + 1)
    // if ((date.getMonth() + 1) < 10) {
    //     month = "0" + month
    // } else {
    //     month = month;
    // }
    // var currentBrowserDate = (day + '/' + month + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString('en-GB'));
    // // console.log(currentBrowserDate);


  }

  ngOnInit(): void {

    // $('#from_date').datepicker({
    //   multidate: true
    // });

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


    // this.numberOfDaysArray = []
    // this.numberOfDaysArray.push({
    //   time_slots: [
    //     {
    //       "slot_start_time": "",
    //       "slot_end_time": "",
    //       "slot_limit": "",
    //       "is_active": ""
    //     },
    //   ]
    // });
    // // console.log(this.numberOfDaysArray);
    this.mainOuterArray.push(
       {
        "from_date": "",
        "to_date": "",
        "full_dates": [
        ],
        "open_time": "",
        "close_time": "",
        "time_slots": [
          {
            "slot_start_time": "",
            "slot_end_time": "",
            "slot_limit": "",
            "is_active": ""
          },
        ]
      }
    );
    // console.log(this.mainOuterArray);
    // console.log(this.mainOuterArray[0].time_slots);

    if (this.mainOuterArray[0].time_slots.length === 1) {
      this.hidethis = true;
    } else {
      this.hidethis = false;
    }

  }

  add() {
    // console.log(this.mainOuterArray);
    this.mainOuterArray.push({
      "from_date": "",
      "to_date": "",
      "full_dates": [
      ],
      "open_time": "",
      "close_time": "",
      "time_slots": [
        {
          "slot_start_time": "",
          "slot_end_time": "",
          "slot_limit": "",
          "is_active": ""
        },
      ]
    });
  }
  remove() {
    // console.log(this.mainOuterArray);
    if (this.mainOuterArray.length > 1) {
      this.mainOuterArray.pop();
    } else {
      // console.log("fghj");

    }
  }

  add_time_slot(i, k) {
    this.mainOuterArray[i].time_slots.push({
      "slot_start_time": "",
      "slot_end_time": "",
      "slot_limit": "",
      "is_active": ""
    });
  }
  remove_time_slot(i, k) {
    // console.log(this.mainOuterArray);
    // if (this.mainOuterArray[0].time_slots.length > 1) {
    this.mainOuterArray[i].time_slots.pop();
    // } else {
    //   // console.log(this.mainOuterArray);
    // }
  }


  public todate_check_all(fromDate, toDate) {
    // console.log(fromDate, toDate);
    var f = new Date(fromDate);
    var t = new Date(toDate);
    var fdate = f.getDate();
    var tdate = t.getDate();
    // console.log("fromDate :" + fdate, "toDate :" + tdate);
    var fmonth = f.getMonth();
    var tmonth = t.getMonth();
    // console.log("fromMonth :" + fmonth, "toMonth :" + tmonth);
    var fyear = f.getFullYear();
    var tyear = t.getFullYear();
    // console.log("fromYear :" + fyear, "toYear :" + tyear);


    // console.log(this.mainOuterArray);
    for (var i = 0; i < this.mainOuterArray.length; i++) {
      for (var d = fdate; d < tdate; d++) {
        fdate = fdate + 1;
        this.mainOuterArray[i].full_dates.push(fdate);
      }
    }
    // console.log(this.mainOuterArray);
  
  }



  public cancel() {
    this.router.navigate(['/list-of-slots']);
  }
  public createSlotsForStore() {
    // console.log(this.mainOuterArray);
    // var checkFromdate = [];
    // var checkTOdate = [];

    // for (var j = 0; j < this.mainOuterArray.length; j++) {
    //   var fromdate = this.mainOuterArray[j].from_date;
    //   var todate = this.mainOuterArray[j].to_date;
    //   var splittedFromdate = fromdate.split("-");
    //   var splittedTodate = todate.split("-");
    //   checkFromdate.push(splittedFromdate);
    //   checkTOdate.push(splittedTodate);
    // }
    // // console.log(checkFromdate);
    // // console.log(checkTOdate);
    // var ValidationArray = [];
    // var ValidationArrayTimeSlotes = [];
    // for (var i = 0; i < this.mainOuterArray.length; i++) {
    //   if (this.mainOuterArray[i].from_date === "" || this.mainOuterArray[i].to_date === "" || this.mainOuterArray[i].open_time === "" || this.mainOuterArray[i].close_time === "") {
    //     this.validation = false;
    //     ValidationArray.push(this.validation);
    //   } else {
    //     this.validation = true;
    //     ValidationArray.push(this.validation);
    //   }
    // }

    // // console.log(ValidationArray);
    // // console.log(ValidationArrayTimeSlotes);
  }

}
