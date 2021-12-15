import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;
declare let google: any;
@Component({
  selector: 'app-add-new-product-for-this-order',
  templateUrl: './add-new-product-for-this-order.component.html',
  styleUrls: ['./add-new-product-for-this-order.component.scss']
})
export class AddNewProductForThisOrderComponent implements OnInit {
  loader: boolean;
  isSearchSuggestion: boolean;
  searchedProducts: any;
  searchLoader: boolean;
  newselectedItems = [];
  quantity: any;
  sub: any;
  id: any;
  order_ID: any;
  productadded: any;
  selectedOrder: any;
  customerShippingingAddress: any;
  sharethisInfo: any;
  private isButtonVisible = true;
  sharedIndex: any;
  @HostListener('document:click', ['$event']) clickout(event) {
    this.isSearchSuggestion = false;
  }

  constructor(private route: ActivatedRoute, private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public sharedService: SharedServiceService,) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params;
      this.order_ID = this.id.order_id;
      console.log(this.id);
      this.getOrderDetailsForStorePinceCheck(this.order_ID);
    });
    this.quantity = 1;

  }
  @ViewChild('searchBar') searchBar: ElementRef;
  @ViewChild('searchSuggestion') searchSuggestion: ElementRef;
  ngOnInit(): void {
  }
  handleAsideClick(event: Event) {
    event.stopPropagation();
  }
  getOrderDetailsForStorePinceCheck(orderID) {
    this.loader = true;
    this.sharedService.getAselectedOrderDetails(orderID).subscribe(res => {
      console.log(res);
      this.selectedOrder = res[0];
      this.customerShippingingAddress = this.selectedOrder.addresses[0].shipping_address[0];
      console.log(this.customerShippingingAddress.pincode);
      var reqsercheck = {
        "pincode": this.customerShippingingAddress.pincode,
        "lat_longs": null
      }
      console.log(reqsercheck);
      this.sharedService.OmsServiceblityCheck(reqsercheck).subscribe(resboth => {
        console.log(resboth);
        this.sharethisInfo = resboth;
        localStorage.setItem('plant_code_add_product', this.sharethisInfo.plant_code);
        this.loader = false;
      }, err => {
        this.loader = false;
        console.log(err);
      });
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }
  search(searchText, event) {
    this.loader = true;
    if (event.keyCode == 13) {
      this.isSearchSuggestion = false;
      this.loader = false;
      return
    }
    if (searchText.length < 3) {
      this.searchedProducts = '';
      this.isSearchSuggestion = false;
      this.loader = false;
      return
    }
    this.searchLoader = true;
    // this.sharedService.sendLoaderStatus(true);

    let requestBody = {
      "param": {
        "type": "search",//search or category
        "productName": searchText,// only if search
        // "store_id": this.sharethisInfo.store_id,
        "store_id": localStorage.getItem('plant_code_add_product'),
        "categoryId": "",
        "sort_by": '',
        "pageNumber": "",
        "pageCount": "",
        "filters": {
        }
      }
    }
    console.log(requestBody);
    this.sharedService.productSearch(requestBody).subscribe(data => {
      console.log(data);
      this.searchLoader = false;
      this.searchedProducts = data[0].products;
      console.log(this.searchedProducts);
      this.isSearchSuggestion = true;
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }
  updateCart(productDetails, selectedQTY, i) {
    // console.log(i);
    this.sharedIndex = i;
    console.log(productDetails.id);
    console.log(productDetails.inventory);
    console.log(productDetails);
    console.log(selectedQTY);

    // if (this.newselectedItems.length > 0) {
    //   for (var j = 0; j < this.newselectedItems.length; j++) {
    //     if (this.newselectedItems[j].id === productDetails.id) {
    //       var obj = {
    //         "defaultQty": j + 1,
    //         "forMyuse": productDetails.special_price
    //       }
    //       var finalObj = Object.assign(obj, productDetails);
    //       console.log(finalObj);
    //       this.newselectedItems.push(finalObj);
    //     }
    //   }
    // } else {
    var obj = {
      "defaultQty": 1,
      "forMyuse": productDetails.special_price
    }
    var finalObj = Object.assign(obj, productDetails);
    console.log(finalObj);
    this.newselectedItems.push(finalObj);
    console.log(this.newselectedItems);
    // }
  }
  // this.deliveryChargesArray.splice(i, 1);

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
  public updateCartNew(productId, quantityG, index, inventory, SP) {
    // this.loader = true;
    if (quantityG < 1) {
      // this.deleteCartProduct(productId, index);
      return
    }
    // this.quantity = quantityG;
    console.log(index);
    console.log(quantityG);
    console.log(this.newselectedItems);
    console.log(inventory);
    console.log(SP);
    // for (var j = 0; j < this.newselectedItems.length; j++) {
    //   this.newselectedItems[index].defaultQty = quantityG;
    // }
    // console.log(this.newselectedItems);

    if (quantityG > inventory) {
      if (inventory < 10 && inventory > 0) {
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: "Sorry, Available quantity is " + inventory
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      } else {
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: "Sorry, Ordered quantity is exceeding stock"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }
      return
    } else {
      for (var j = 0; j < this.newselectedItems.length; j++) {
        this.newselectedItems[index].defaultQty = quantityG;
        this.newselectedItems[index].special_price = SP * quantityG
      }
      console.log(this.newselectedItems);
    }
  }
  deleteCartProduct(i) {
    this.newselectedItems.splice(i, 1);
    console.log(this.newselectedItems);
  }
  addThisProducts() {
    this.loader = true;
    console.log(this.newselectedItems);
    var finalbodyArray = [];
    for (var i = 0; i < this.newselectedItems.length; i++) {
      var finalBody = {
        "item_id": this.newselectedItems[i].id,
        "quantity": this.newselectedItems[i].defaultQty,
        "store_id": localStorage.getItem('plant_code_add_product')
      }
      finalbodyArray.push(finalBody);
    }
    console.log(this.order_ID);
    console.log(finalbodyArray);
    var addNewProducts = {
      "items": finalbodyArray
    }
    console.log(addNewProducts);
    this.sharedService.updateTheOrderByOMS(this.order_ID, addNewProducts).subscribe(res => {
      console.log(res);
      this.productadded = res;
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.productadded.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.router.navigate(['/view-orders-page', this.id]);
      localStorage.removeItem('plant_code_add_product');
    }, err => {
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
      // localStorage.removeItem('userThisID_for_add_E');
    });

  }

  goBackToViewPage() {
    console.log(this.id);
    // localStorage.setItem('userThisID_for_add_E', orderID);
    // [routerLink]="['/view-orders-page']"
    this.router.navigate(['/view-orders-page', this.id]);
  }
}

