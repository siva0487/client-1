import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-list-of-slots',
  templateUrl: './list-of-slots.component.html',
  styleUrls: ['./list-of-slots.component.css']
})
export class ListOfSlotsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public addNewSlot() {
    this.router.navigate(['/create-new-slots']);
  }
}
