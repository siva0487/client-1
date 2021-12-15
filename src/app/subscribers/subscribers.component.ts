import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportService } from 'app/_services/export.service';
declare var $: any;



@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  finalData: { customer_id: string; subscription_id: string; phone_number: string; type: string; start_date: string; end_date: string; }[];

   selectedAlldata = [];;
  selectedAlldataArray = [];
  dict = {};
  constructor(private router: Router, private exportService: ExportService) { }

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
      this.exportService.exportExcel(this.selectedAlldata, 'Subscribers List Export');
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
        "subscription_id": "6595262",
        "phone_number": "9642392940",
        "type": "Daily",
        "start_date": "12/01/2020",
        "end_date": "12/12/2022"
      },
      {
        "customer_id": "63594",
        "subscription_id": "1036980",
        "phone_number": "9663310487",
        "type": "Monthly",
        "start_date": "22/08/2020",
        "end_date": "12/12/2022"
      },
      {
        "customer_id": "30560",
        "subscription_id": "9640319",
        "phone_number": "9898980618",
        "type": "Weekly",
        "start_date": "09/09/2020",
        "end_date": "12/12/2022"
      },
      // {
      //   "customer_id": "12356",
      //   "subscription_id": "6595262",
      //   "phone_number": "9642392940",
      //   "type": "Gold",
      //   "start_date": "12/01/2020",
      //   "end_date": "12/12/2022"
      // },
      // {
      //   "customer_id": "12356",
      //   "subscription_id": "6595262",
      //   "phone_number": "9642392940",
      //   "type": "Gold",
      //   "start_date": "12/01/2020",
      //   "end_date": "12/12/2022"
      // },
      // {
      //   "customer_id": "12356",
      //   "subscription_id": "6595262",
      //   "phone_number": "9642392940",
      //   "type": "Gold",
      //   "start_date": "12/01/2020",
      //   "end_date": "12/12/2022"
      // },
      // {
      //   "customer_id": "12356",
      //   "subscription_id": "6595262",
      //   "phone_number": "9642392940",
      //   "type": "Gold",
      //   "start_date": "12/01/2020",
      //   "end_date": "12/12/2022"
      // }
    ];
  }

  public viewValue(Id) {
    this.router.navigate(['/subscription-details', Id]);
  }
}
