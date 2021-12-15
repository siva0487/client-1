import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css']
})
export class SubscriptionDetailsComponent implements OnInit {
  sub: any;
  id: any;
  customer_ID: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.customer_ID = this.id.customer_id;
      // console.log(this.id);
    });
  }

  ngOnInit(): void {
  }
  public cancel() {
    this.router.navigate(['/subscribers']);
  }
}
