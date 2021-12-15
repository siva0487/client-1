import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;
declare let google: any;

@Component({
  selector: 'app-adding-orders-from-oms',
  templateUrl: './adding-orders-from-oms.component.html',
  styleUrls: ['./adding-orders-from-oms.component.scss']
})
export class AddingOrdersFromOMSComponent implements OnInit {

  public componentName = "AddressListingComponent";
  public deviceWidth: any;
  public addressList: any;
  public addAddressForm: FormGroup;
  public addressSubmitted = false;
  public addAddressStatus: any;
  public editAddressId: any;
  private geocoder;
  public selectedSlotDates = '';
  showcustomerSearchErrormsg: boolean;
  Customer_Data: any;
  loader: boolean;
  AddressAddedRes: any;
  AddressDeleteRes: any;
  inputReq: any;
  finalCusterMerSearchRes: any;
  updatedCustomerAddressFinalRES: any;
  userSelectedBilling: boolean;
  userSelectedShipping: boolean;
  isSearchSuggestion: boolean = false;
  searchedProducts: any;
  searchLoader: boolean = false;
  @ViewChild('searchBar') searchBar: ElementRef;
  @ViewChild('searchSuggestion') searchSuggestion: ElementRef;
  showThisOnlySuccess: boolean;
  cartInfo: any;
  getCartData: any;
  packagingTypes: any;
  cartStatus: boolean;
  showThisOnlyAddressSuccess: boolean;
  cashOnDelivery: boolean;
  cardOnDelivery: boolean;
  errStatus: any;
  userSelectedOneCheckBox_So_Address_Validations_no: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_billing: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_Shipping: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_both: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_1: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_2: boolean = true;
  userSelectedOneCheckBox_So_Address_Validations_3: boolean = true;
  finalOrderPalced: any;
  showNewAddAddress: boolean;
  getCartData_new: any;
  showThisUserNotAvailable: boolean;
  createNewUserForm: FormGroup;
  createNewUserFormAfterVerify: FormGroup;
  addnewUserSubmitted: boolean;
  sentOtp: any;
  addnewUserSubmittedAfterVerify: boolean;
  VerifyOTPFinalRES: any;
  showOTPInvalid: boolean;
  showMsgOtpsentsuccess: boolean;
  msg: any;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  shippingAddresCheck: any;
  shippingAddresCheckB: any;
  servicebleAddress: boolean;
  servicebleAddressboth: boolean;
  landmarkStatus: boolean;
  detectLocationStatus: boolean;
  showThisForLandmark: boolean = false;
  public slots: any;
  selectedDateTimeSlots: any;
  public objectNew = {};
  showThisSlotSelection: boolean = false;
  proceesdNext: boolean;
  check = [];
  billing_address_id: any;
  shipping_address_id: any;
  public selectedSlots: any;
  selectedSlotStartTime: any;
  selectedSlotEndTime: any;
  selectSlotStatus: boolean;
  currentYear: any;
  minDate: Date;
  public maxDate: Date;
  proceedToSelectPayment: boolean = false;
  // google: any;
  public pincodeList = {
    "431151": {
      "district": "AURANGABAD",
      "city": "Andhari",
      "state": "Maharashtra"
    },
    "431001": {
      "district": "AURANGABAD",
      "city": "Aurangabad",
      "state": "Maharashtra"
    },
    "431002": {
      "district": "AURANGABAD",
      "city": "Aurangabad Cantonment",
      "state": "Maharashtra"
    },
    "431134": {
      "district": "AURANGABAD",
      "city": "Badod Bazar",
      "state": "Maharashtra"
    },
    "431136": {
      "district": "AURANGABAD",
      "city": "Bajaj Nagar",
      "state": "Maharashtra"
    },
    "431105": {
      "district": "AURANGABAD",
      "city": "Bidkingaon",
      "state": "Maharashtra"
    },
    "431137": {
      "district": "AURANGABAD",
      "city": "Bihamandwa",
      "state": "Maharashtra"
    },
    "431007": {
      "district": "AURANGABAD",
      "city": "Chikhalthana",
      "state": "Maharashtra"
    },
    "431006": {
      "district": "AURANGABAD",
      "city": "Chikhalthana Industrial Area",
      "state": "Maharashtra"
    },
    "431147": {
      "district": "AURANGABAD",
      "city": "Chincholi Limbaji",
      "state": "Maharashtra"
    },
    "431003": {
      "district": "AURANGABAD",
      "city": "Cidco Colony",
      "state": "Maharashtra"
    },
    "431115": {
      "district": "AURANGABAD",
      "city": "Degaon Rangari",
      "state": "Maharashtra"
    },
    "431004": {
      "district": "AURANGABAD",
      "city": "Dr. Babasaheb Ambedkar Marathwada University",
      "state": "Maharashtra"
    },
    "431102": {
      "district": "AURANGABAD",
      "city": "Ellora",
      "state": "Maharashtra"
    },
    "431109": {
      "district": "AURANGABAD",
      "city": "Gangapur",
      "state": "Maharashtra"
    },
    "431008": {
      "district": "AURANGABAD",
      "city": "Harsool",
      "state": "Maharashtra"
    },
    "431103": {
      "district": "AURANGABAD",
      "city": "Kannad",
      "state": "Maharashtra"
    },
    "431101": {
      "district": "AURANGABAD",
      "city": "Khultabad",
      "state": "Maharashtra"
    },
    "431005": {
      "district": "AURANGABAD",
      "city": "Kranti Chowk",
      "state": "Maharashtra"
    },
    "423702": {
      "district": "AURANGABAD",
      "city": "Lasur Station",
      "state": "Maharashtra"
    },
    "431106": {
      "district": "AURANGABAD",
      "city": "Nathnagar(North",
      "state": "Maharashtra"
    },
    "431121": {
      "district": "AURANGABAD",
      "city": "Pachod",
      "state": "Maharashtra"
    },
    "431107": {
      "district": "AURANGABAD",
      "city": "Paithan",
      "state": "Maharashtra"
    },
    "431148": {
      "district": "AURANGABAD",
      "city": "Paithansakhar Karkhana",
      "state": "Maharashtra"
    },
    "423703": {
      "district": "AURANGABAD",
      "city": "Parsoda",
      "state": "Maharashtra"
    },
    "431111": {
      "district": "AURANGABAD",
      "city": "Phulambri",
      "state": "Maharashtra"
    },
    "431104": {
      "district": "AURANGABAD",
      "city": "Pishor",
      "state": "Maharashtra"
    },
    "431110": {
      "district": "AURANGABAD",
      "city": "Raghunath Naga r",
      "state": "Maharashtra"
    },
    "431116": {
      "district": "AURANGABAD",
      "city": "Shivar",
      "state": "Maharashtra"
    },
    "423701": {
      "district": "AURANGABAD",
      "city": "Vaijapur",
      "state": "Maharashtra"
    },
    "431133": {
      "district": "AURANGABAD",
      "city": "Walunj",
      "state": "Maharashtra"
    },
    "413207": {
      "district": "AURANGABAD",
      "city": "Amalner",
      "state": "Maharashtra"
    },
    "431523": {
      "district": "AURANGABAD",
      "city": "Amba S.K",
      "state": "Maharashtra"
    },
    "431517": {
      "district": "AURANGABAD",
      "city": "Ambajogai",
      "state": "Maharashtra"
    },
    "414203": {
      "district": "AURANGABAD",
      "city": "Ashti",
      "state": "Maharashtra"
    },
    "431518": {
      "district": "AURANGABAD",
      "city": "Bansarola",
      "state": "Maharashtra"
    },
    "431122": {
      "district": "AURANGABAD",
      "city": "Beed",
      "state": "Maharashtra"
    },
    "431126": {
      "district": "AURANGABAD",
      "city": "Chausala",
      "state": "Maharashtra"
    },
    "431128": {
      "district": "AURANGABAD",
      "city": "Dindrood",
      "state": "Maharashtra"
    },
    "431127": {
      "district": "AURANGABAD",
      "city": "Gevrai",
      "state": "Maharashtra"
    },
    "431519": {
      "district": "AURANGABAD",
      "city": "Ghatnandur",
      "state": "Maharashtra"
    },
    "431143": {
      "district": "AURANGABAD",
      "city": "Jai Bhavani SSK",
      "state": "Maharashtra"
    },
    "414202": {
      "district": "AURANGABAD",
      "city": "Kada",
      "state": "Maharashtra"
    },
    "414208": {
      "district": "AURANGABAD",
      "city": "Kadasakhar",
      "state": "Maharashtra"
    },
    "431123": {
      "district": "AURANGABAD",
      "city": "Kaij",
      "state": "Maharashtra"
    },
    "431142": {
      "district": "AURANGABAD",
      "city": "Kesapuri Camp",
      "state": "Maharashtra"
    },
    "431124": {
      "district": "AURANGABAD",
      "city": "Kille Dharur",
      "state": "Maharashtra"
    },
    "431131": {
      "district": "AURANGABAD",
      "city": "Majalgaon",
      "state": "Maharashtra"
    },
    "431125": {
      "district": "AURANGABAD",
      "city": "Naiknoor",
      "state": "Maharashtra"
    },
    "431515": {
      "district": "AURANGABAD",
      "city": "Parali Vaijnath",
      "state": "Maharashtra"
    },
    "431520": {
      "district": "AURANGABAD",
      "city": "Parli TPS",
      "state": "Maharashtra"
    },
    "414204": {
      "district": "AURANGABAD",
      "city": "Patoda",
      "state": "Maharashtra"
    },
    "413229": {
      "district": "AURANGABAD",
      "city": "Pimpalwadi",
      "state": "Maharashtra"
    },
    "414205": {
      "district": "AURANGABAD",
      "city": "Rajuri Navgan",
      "state": "Maharashtra"
    },
    "413249": {
      "district": "AURANGABAD",
      "city": "Shirur",
      "state": "Maharashtra"
    },
    "431129": {
      "district": "AURANGABAD",
      "city": "Talkheda",
      "state": "Maharashtra"
    },
    "431130": {
      "district": "AURANGABAD",
      "city": "Umapur",
      "state": "Maharashtra"
    },
    "431530": {
      "district": "AURANGABAD",
      "city": "VSSK  (Pangri",
      "state": "Maharashtra"
    },
    "431701": {
      "district": "AURANGABAD",
      "city": "Akhada Balapur",
      "state": "Maharashtra"
    },
    "431705": {
      "district": "AURANGABAD",
      "city": "Aundha Nagnath",
      "state": "Maharashtra"
    },
    "431703": {
      "district": "AURANGABAD",
      "city": "Goregaon",
      "state": "Maharashtra"
    },
    "431513": {
      "district": "AURANGABAD",
      "city": "Hingoli",
      "state": "Maharashtra"
    },
    "431702": {
      "district": "AURANGABAD",
      "city": "Kalamnuri",
      "state": "Maharashtra"
    },
    "431117": {
      "district": "AURANGABAD",
      "city": "Ajanta",
      "state": "Maharashtra"
    },
    "431204": {
      "district": "AURANGABAD",
      "city": "Ambad",
      "state": "Maharashtra"
    },
    "431212": {
      "district": "AURANGABAD",
      "city": "Ankushnagar",
      "state": "Maharashtra"
    },
    "431202": {
      "district": "AURANGABAD",
      "city": "Badnapur",
      "state": "Maharashtra"
    },
    "431150": {
      "district": "AURANGABAD",
      "city": "Banoti",
      "state": "Maharashtra"
    },
    "431113": {
      "district": "AURANGABAD",
      "city": "Bharadi",
      "state": "Maharashtra"
    },
    "431114": {
      "district": "AURANGABAD",
      "city": "Bhokardan",
      "state": "Maharashtra"
    },
    "431209": {
      "district": "AURANGABAD",
      "city": "Ghansawangi",
      "state": "Maharashtra"
    },
    "431206": {
      "district": "AURANGABAD",
      "city": "Jaffarabad",
      "state": "Maharashtra"
    },
    "431203": {
      "district": "AURANGABAD",
      "city": "Jalna",
      "state": "Maharashtra"
    },
    "431213": {
      "district": "AURANGABAD",
      "city": "Jalna Railway Station",
      "state": "Maharashtra"
    },
    "431211": {
      "district": "AURANGABAD",
      "city": "Kubbhar Pimplgaon",
      "state": "Maharashtra"
    },
    "431118": {
      "district": "AURANGABAD",
      "city": "Phardapur",
      "state": "Maharashtra"
    },
    "431207": {
      "district": "AURANGABAD",
      "city": "Ranjani",
      "state": "Maharashtra"
    },
    "431132": {
      "district": "AURANGABAD",
      "city": "Shivna",
      "state": "Maharashtra"
    },
    "431112": {
      "district": "AURANGABAD",
      "city": "Sillod",
      "state": "Maharashtra"
    },
    "431135": {
      "district": "AURANGABAD",
      "city": "Sillod Sakhar Karkhana",
      "state": "Maharashtra"
    },
    "431120": {
      "district": "AURANGABAD",
      "city": "Soygaon",
      "state": "Maharashtra"
    },
    "431208": {
      "district": "AURANGABAD",
      "city": "Tembhurni",
      "state": "Maharashtra"
    },
    "431205": {
      "district": "AURANGABAD",
      "city": "Wadigodri",
      "state": "Maharashtra"
    },
    "413515": {
      "district": "AURANGABAD",
      "city": "Ahmedpur",
      "state": "Maharashtra"
    },
    "413522": {
      "district": "AURANGABAD",
      "city": "Aurad Shahjani",
      "state": "Maharashtra"
    },
    "413520": {
      "district": "AURANGABAD",
      "city": "Ausa",
      "state": "Maharashtra"
    },
    "413511": {
      "district": "AURANGABAD",
      "city": "Borgaon",
      "state": "Maharashtra"
    },
    "413513": {
      "district": "AURANGABAD",
      "city": "Chakur",
      "state": "Maharashtra"
    },
    "413521": {
      "district": "AURANGABAD",
      "city": "Deoni",
      "state": "Maharashtra"
    },
    "413532": {
      "district": "AURANGABAD",
      "city": "Jalkot",
      "state": "Maharashtra"
    },
    "413607": {
      "district": "AURANGABAD",
      "city": "Kasarshirshi",
      "state": "Maharashtra"
    },
    "413516": {
      "district": "AURANGABAD",
      "city": "Killari",
      "state": "Maharashtra"
    },
    "413523": {
      "district": "AURANGABAD",
      "city": "Kingaon",
      "state": "Maharashtra"
    },
    "413527": {
      "district": "AURANGABAD",
      "city": "Kingaon",
      "state": "Maharashtra"
    },
    "413512": {
      "district": "AURANGABAD",
      "city": "Latur",
      "state": "Maharashtra"
    },
    "413510": {
      "district": "AURANGABAD",
      "city": "Murud",
      "state": "Maharashtra"
    },
    "413524": {
      "district": "AURANGABAD",
      "city": "Nalegaon",
      "state": "Maharashtra"
    },
    "413530": {
      "district": "AURANGABAD",
      "city": "Nitoor",
      "state": "Maharashtra"
    },
    "431522": {
      "district": "AURANGABAD",
      "city": "Pangaon",
      "state": "Maharashtra"
    },
    "413544": {
      "district": "AURANGABAD",
      "city": "Shirur Anantpal",
      "state": "Maharashtra"
    },
    "413514": {
      "district": "AURANGABAD",
      "city": "Shirur Tajband",
      "state": "Maharashtra"
    },
    "413531": {
      "district": "AURANGABAD",
      "city": "Tilaknagar Latur",
      "state": "Maharashtra"
    },
    "413517": {
      "district": "AURANGABAD",
      "city": "Udgir",
      "state": "Maharashtra"
    },
    "413518": {
      "district": "AURANGABAD",
      "city": "Wadhona",
      "state": "Maharashtra"
    },
    "413529": {
      "district": "AURANGABAD",
      "city": "Wadwak Nagnath",
      "state": "Maharashtra"
    },
    "431704": {
      "district": "AURANGABAD",
      "city": "Ardhapur",
      "state": "Maharashtra"
    },
    "431801": {
      "district": "AURANGABAD",
      "city": "Bhokar",
      "state": "Maharashtra"
    },
    "431710": {
      "district": "AURANGABAD",
      "city": "Biloli",
      "state": "Maharashtra"
    },
    "431603": {
      "district": "AURANGABAD",
      "city": "Cidco Nanded",
      "state": "Maharashtra"
    },
    "431717": {
      "district": "AURANGABAD",
      "city": "Degloor",
      "state": "Maharashtra"
    },
    "431809": {
      "district": "AURANGABAD",
      "city": "Dharmabad",
      "state": "Maharashtra"
    },
    "431712": {
      "district": "AURANGABAD",
      "city": "Hadgaon",
      "state": "Maharashtra"
    },
    "431802": {
      "district": "AURANGABAD",
      "city": "Himayatnagar",
      "state": "Maharashtra"
    },
    "431604": {
      "district": "AURANGABAD",
      "city": "Itwara",
      "state": "Maharashtra"
    },
    "431714": {
      "district": "AURANGABAD",
      "city": "Kandhar",
      "state": "Maharashtra"
    },
    "431804": {
      "district": "AURANGABAD",
      "city": "Kinwat",
      "state": "Maharashtra"
    },
    "431708": {
      "district": "AURANGABAD",
      "city": "Loha",
      "state": "Maharashtra"
    },
    "431721": {
      "district": "AURANGABAD",
      "city": "Mahore",
      "state": "Maharashtra"
    },
    "431806": {
      "district": "AURANGABAD",
      "city": "Mudkhed",
      "state": "Maharashtra"
    },
    "431815": {
      "district": "AURANGABAD",
      "city": "Mukhed",
      "state": "Maharashtra"
    },
    "431709": {
      "district": "AURANGABAD",
      "city": "Naigaon",
      "state": "Maharashtra"
    },
    "431601": {
      "district": "AURANGABAD",
      "city": "Nanded",
      "state": "Maharashtra"
    },
    "431602": {
      "district": "AURANGABAD",
      "city": "Shivaji Nagar",
      "state": "Maharashtra"
    },
    "431606": {
      "district": "AURANGABAD",
      "city": "Srtmu",
      "state": "Maharashtra"
    },
    "431605": {
      "district": "AURANGABAD",
      "city": "Taroda Rd",
      "state": "Maharashtra"
    },
    "431512": {
      "district": "AURANGABAD",
      "city": "Basmath Nagar",
      "state": "Maharashtra"
    },
    "431508": {
      "district": "AURANGABAD",
      "city": "Bori",
      "state": "Maharashtra"
    },
    "431521": {
      "district": "AURANGABAD",
      "city": "Daithana",
      "state": "Maharashtra"
    },
    "431514": {
      "district": "AURANGABAD",
      "city": "Gangakhed",
      "state": "Maharashtra"
    },
    "431509": {
      "district": "AURANGABAD",
      "city": "Jintur",
      "state": "Maharashtra"
    },
    "431505": {
      "district": "AURANGABAD",
      "city": "Manwath",
      "state": "Maharashtra"
    },
    "431402": {
      "district": "AURANGABAD",
      "city": "Mau Parbhani",
      "state": "Maharashtra"
    },
    "431720": {
      "district": "AURANGABAD",
      "city": "Palam",
      "state": "Maharashtra"
    },
    "431401": {
      "district": "AURANGABAD",
      "city": "Parbhani",
      "state": "Maharashtra"
    },
    "431506": {
      "district": "AURANGABAD",
      "city": "Pathari",
      "state": "Maharashtra"
    },
    "431537": {
      "district": "AURANGABAD",
      "city": "Pedgaon",
      "state": "Maharashtra"
    },
    "431511": {
      "district": "AURANGABAD",
      "city": "Puma",
      "state": "Maharashtra"
    },
    "431541": {
      "district": "AURANGABAD",
      "city": "Rampuri BK",
      "state": "Maharashtra"
    },
    "431536": {
      "district": "AURANGABAD",
      "city": "Rani Sawargaon",
      "state": "Maharashtra"
    },
    "431503": {
      "district": "AURANGABAD",
      "city": "Sailu",
      "state": "Maharashtra"
    },
    "431542": {
      "district": "AURANGABAD",
      "city": "Sengaon",
      "state": "Maharashtra"
    },
    "431516": {
      "district": "AURANGABAD",
      "city": "Sonpeth",
      "state": "Maharashtra"
    },
    "431510": {
      "district": "AURANGABAD",
      "city": "Yeldari",
      "state": "Maharashtra"
    },
    "431540": {
      "district": "AURANGABAD",
      "city": "Zari",
      "state": "Maharashtra"
    },
    "442705": {
      "district": "CHANDRAPUR",
      "city": "Aheri",
      "state": "Maharashtra"
    },
    "442703": {
      "district": "CHANDRAPUR",
      "city": "Allapalli",
      "state": "Maharashtra"
    },
    "442914": {
      "district": "CHANDRAPUR",
      "city": "Anandwan",
      "state": "Maharashtra"
    },
    "441208": {
      "district": "CHANDRAPUR",
      "city": "Armori",
      "state": "Maharashtra"
    },
    "442707": {
      "district": "CHANDRAPUR",
      "city": "Ashti",
      "state": "Maharashtra"
    },
    "444917": {
      "district": "CHANDRAPUR",
      "city": "Awarpur Cement Proj .",
      "state": "Maharashtra"
    },
    "442403": {
      "district": "CHANDRAPUR",
      "city": "Babupeth",
      "state": "Maharashtra"
    },
    "442901": {
      "district": "CHANDRAPUR",
      "city": "Ballapur Mills",
      "state": "Maharashtra"
    },
    "441226": {
      "district": "CHANDRAPUR",
      "city": "Bembal",
      "state": "Maharashtra"
    },
    "442902": {
      "district": "CHANDRAPUR",
      "city": "Bhadrawati",
      "state": "Maharashtra"
    },
    "441206": {
      "district": "CHANDRAPUR",
      "city": "Bramhapuri",
      "state": "Maharashtra"
    },
    "442502": {
      "district": "CHANDRAPUR",
      "city": "Cement Nagar",
      "state": "Maharashtra"
    },
    "442603": {
      "district": "CHANDRAPUR",
      "city": "Chamorshi",
      "state": "Maharashtra"
    },
    "442402": {
      "district": "CHANDRAPUR",
      "city": "Chandrapur City",
      "state": "Maharashtra"
    },
    "442501": {
      "district": "CHANDRAPUR",
      "city": "Chandrapur 0.F",
      "state": "Maharashtra"
    },
    "442404": {
      "district": "CHANDRAPUR",
      "city": "Chandrapur TPS",
      "state": "Maharashtra"
    },
    "442908": {
      "district": "CHANDRAPUR",
      "city": "Chandur",
      "state": "Maharashtra"
    },
    "442903": {
      "district": "CHANDRAPUR",
      "city": "Chimur",
      "state": "Maharashtra"
    },
    "441207": {
      "district": "CHANDRAPUR",
      "city": "Desaiganj",
      "state": "Maharashtra"
    },
    "442606": {
      "district": "CHANDRAPUR",
      "city": "Dhanora",
      "state": "Maharashtra"
    },
    "442704": {
      "district": "CHANDRAPUR",
      "city": "Ettapalli",
      "state": "Maharashtra"
    },
    "442604": {
      "district": "CHANDRAPUR",
      "city": "Ghot",
      "state": "Maharashtra"
    },
    "442505": {
      "district": "CHANDRAPUR",
      "city": "Ghuggus Colliery",
      "state": "Maharashtra"
    },
    "442702": {
      "district": "CHANDRAPUR",
      "city": "Gondpipri",
      "state": "Maharashtra"
    },
    "442507": {
      "district": "CHANDRAPUR",
      "city": "H.L.C",
      "state": "Maharashtra"
    },
    "442709": {
      "district": "CHANDRAPUR",
      "city": "Kamlapur",
      "state": "Maharashtra"
    },
    "441209": {
      "district": "CHANDRAPUR",
      "city": "Kurkheda",
      "state": "Maharashtra"
    },
    "442910": {
      "district": "CHANDRAPUR",
      "city": "Madheli",
      "state": "Maharashtra"
    },
    "442406": {
      "district": "CHANDRAPUR",
      "city": "Mfdc",
      "state": "Maharashtra"
    },
    "441224": {
      "district": "CHANDRAPUR",
      "city": "Mul",
      "state": "Maharashtra"
    },
    "441205": {
      "district": "CHANDRAPUR",
      "city": "Naghid",
      "state": "Maharashtra"
    },
    "442912": {
      "district": "CHANDRAPUR",
      "city": "Nagri",
      "state": "Maharashtra"
    },
    "441223": {
      "district": "CHANDRAPUR",
      "city": "Nawargaon",
      "state": "Maharashtra"
    },
    "442904": {
      "district": "CHANDRAPUR",
      "city": "Neeri",
      "state": "Maharashtra"
    },
    "441215": {
      "district": "CHANDRAPUR",
      "city": "Pathri",
      "state": "Maharashtra"
    },
    "442506": {
      "district": "CHANDRAPUR",
      "city": "Pombhurna",
      "state": "Maharashtra"
    },
    "441212": {
      "district": "CHANDRAPUR",
      "city": "Rajoli",
      "state": "Maharashtra"
    },
    "442905": {
      "district": "CHANDRAPUR",
      "city": "Rajura Mk",
      "state": "Maharashtra"
    },
    "441225": {
      "district": "CHANDRAPUR",
      "city": "Saoli",
      "state": "Maharashtra"
    },
    "442706": {
      "district": "CHANDRAPUR",
      "city": "Sasti",
      "state": "Maharashtra"
    },
    "442906": {
      "district": "CHANDRAPUR",
      "city": "Shegaon Bk",
      "state": "Maharashtra"
    },
    "442503": {
      "district": "CHANDRAPUR",
      "city": "Shivajinagar",
      "state": "Maharashtra"
    },
    "441222": {
      "district": "CHANDRAPUR",
      "city": "Sindewahi",
      "state": "Maharashtra"
    },
    "442504": {
      "district": "CHANDRAPUR",
      "city": "Sironcha",
      "state": "Maharashtra"
    },
    "441217": {
      "district": "CHANDRAPUR",
      "city": "T.Balapur",
      "state": "Maharashtra"
    },
    "442916": {
      "district": "CHANDRAPUR",
      "city": "Vansadi",
      "state": "Maharashtra"
    },
    "441227": {
      "district": "CHANDRAPUR",
      "city": "Vyahad Khd",
      "state": "Maharashtra"
    },
    "442907": {
      "district": "CHANDRAPUR",
      "city": "Warora",
      "state": "Maharashtra"
    },
    "425101": {
      "district": "JALGAON",
      "city": "Asoda",
      "state": "Maharashtra"
    },
    "425102": {
      "district": "JALGAON",
      "city": "Bhadli",
      "state": "Maharashtra"
    },
    "425115": {
      "district": "JALGAON",
      "city": "Dharangaon",
      "state": "Maharashtra"
    },
    "425001": {
      "district": "JALGAON",
      "city": "Jalgaon",
      "state": "Maharashtra"
    },
    "425003": {
      "district": "JALGAON",
      "city": "Jalgaon A V",
      "state": "Maharashtra"
    },
    "425002": {
      "district": "JALGAON",
      "city": "Jalgaon M J College",
      "state": "Maharashtra"
    },
    "425116": {
      "district": "JALGAON",
      "city": "Mhasawad",
      "state": "Maharashtra"
    },
    "425103": {
      "district": "JALGAON",
      "city": "Paldhi",
      "state": "Maharashtra"
    },
    "425104": {
      "district": "JALGAON",
      "city": "Pimprikh",
      "state": "Maharashtra"
    },
    "425420": {
      "district": "JALGAON",
      "city": "Amalgoan",
      "state": "Maharashtra"
    },
    "425401": {
      "district": "JALGAON",
      "city": "Amalner",
      "state": "Maharashtra"
    },
    "425402": {
      "district": "JALGAON",
      "city": "Marwad",
      "state": "Maharashtra"
    },
    "425303": {
      "district": "JALGAON",
      "city": "Adavad",
      "state": "Maharashtra"
    },
    "425108": {
      "district": "JALGAON",
      "city": "Akulkheda",
      "state": "Maharashtra"
    },
    "425304": {
      "district": "JALGAON",
      "city": "Bhalod",
      "state": "Maharashtra"
    },
    "425201": {
      "district": "JALGAON",
      "city": "Bhusaval",
      "state": "Maharashtra"
    },
    "425203": {
      "district": "JALGAON",
      "city": "Bhusaval OF",
      "state": "Maharashtra"
    },
    "425310": {
      "district": "JALGAON",
      "city": "Bodwad",
      "state": "Maharashtra"
    },
    "425505": {
      "district": "JALGAON",
      "city": "Chinawal",
      "state": "Maharashtra"
    },
    "425107": {
      "district": "JALGAON",
      "city": "Chopada",
      "state": "Maharashtra"
    },
    "425307": {
      "district": "JALGAON",
      "city": "Deepnagar",
      "state": "Maharashtra"
    },
    "425503": {
      "district": "JALGAON",
      "city": "Faizpur",
      "state": "Maharashtra"
    },
    "424209": {
      "district": "JALGAON",
      "city": "Fattepur",
      "state": "Maharashtra"
    },
    "424206": {
      "district": "JALGAON",
      "city": "Jamner",
      "state": "Maharashtra"
    },
    "425507": {
      "district": "JALGAON",
      "city": "Khirdi",
      "state": "Maharashtra"
    },
    "425504": {
      "district": "JALGAON",
      "city": "Khiroda",
      "state": "Maharashtra"
    },
    "425311": {
      "district": "JALGAON",
      "city": "Kurha",
      "state": "Maharashtra"
    },
    "425327": {
      "district": "JALGAON",
      "city": "Kurha Kakoda",
      "state": "Maharashtra"
    },
    "425524": {
      "district": "JALGAON",
      "city": "Mssk Faizpur",
      "state": "Maharashtra"
    },
    "425306": {
      "district": "JALGAON",
      "city": "Muktainagar",
      "state": "Maharashtra"
    },
    "425309": {
      "district": "JALGAON",
      "city": "Nasirabad",
      "state": "Maharashtra"
    },
    "425114": {
      "district": "JALGAON",
      "city": "Neri",
      "state": "Maharashtra"
    },
    "424205": {
      "district": "JALGAON",
      "city": "Pahur",
      "state": "Maharashtra"
    },
    "425508": {
      "district": "JALGAON",
      "city": "Raver",
      "state": "Maharashtra"
    },
    "425302": {
      "district": "JALGAON",
      "city": "Sakali",
      "state": "Maharashtra"
    },
    "425502": {
      "district": "JALGAON",
      "city": "Savda",
      "state": "Maharashtra"
    },
    "424204": {
      "district": "JALGAON",
      "city": "Shendurni",
      "state": "Maharashtra"
    },
    "425501": {
      "district": "JALGAON",
      "city": "Thorgavan",
      "state": "Maharashtra"
    },
    "425305": {
      "district": "JALGAON",
      "city": "Varangaon",
      "state": "Maharashtra"
    },
    "425308": {
      "district": "JALGAON",
      "city": "Varangaon OF",
      "state": "Maharashtra"
    },
    "424207": {
      "district": "JALGAON",
      "city": "Wakadi",
      "state": "Maharashtra"
    },
    "425301": {
      "district": "JALGAON",
      "city": "Yaval",
      "state": "Maharashtra"
    },
    "425113": {
      "district": "JALGAON",
      "city": "Bahadarpur",
      "state": "Maharashtra"
    },
    "424105": {
      "district": "JALGAON",
      "city": "Bhadgaon",
      "state": "Maharashtra"
    },
    "424101": {
      "district": "JALGAON",
      "city": "Chalisgaon",
      "state": "Maharashtra"
    },
    "425112": {
      "district": "JALGAON",
      "city": "Devgaon",
      "state": "Maharashtra"
    },
    "425109": {
      "district": "JALGAON",
      "city": "Erandol",
      "state": "Maharashtra"
    },
    "424108": {
      "district": "JALGAON",
      "city": "Hirapur",
      "state": "Maharashtra"
    },
    "424103": {
      "district": "JALGAON",
      "city": "Kaigaon",
      "state": "Maharashtra"
    },
    "425110": {
      "district": "JALGAON",
      "city": "Kasoda",
      "state": "Maharashtra"
    },
    "424107": {
      "district": "JALGAON",
      "city": "Khedgaon",
      "state": "Maharashtra"
    },
    "424106": {
      "district": "JALGAON",
      "city": "Mehunbare",
      "state": "Maharashtra"
    },
    "424104": {
      "district": "JALGAON",
      "city": "Nagardeola",
      "state": "Maharashtra"
    },
    "424201": {
      "district": "JALGAON",
      "city": "Pachora",
      "state": "Maharashtra"
    },
    "425111": {
      "district": "JALGAON",
      "city": "Parola",
      "state": "Maharashtra"
    },
    "424102": {
      "district": "JALGAON",
      "city": "Patonda",
      "state": "Maharashtra"
    },
    "424203": {
      "district": "JALGAON",
      "city": "Pimpalgaon",
      "state": "Maharashtra"
    },
    "424202": {
      "district": "JALGAON",
      "city": "Varkhedi",
      "state": "Maharashtra"
    },
    "425415": {
      "district": "JALGAON",
      "city": "Akkalkuwa",
      "state": "Maharashtra"
    },
    "425403": {
      "district": "JALGAON",
      "city": "Betawad",
      "state": "Maharashtra"
    },
    "425442": {
      "district": "JALGAON",
      "city": "Borad",
      "state": "Maharashtra"
    },
    "425428": {
      "district": "JALGAON",
      "city": "Boradi",
      "state": "Maharashtra"
    },
    "425407": {
      "district": "JALGAON",
      "city": "Chimthana",
      "state": "Maharashtra"
    },
    "425417": {
      "district": "JALGAON",
      "city": "Chinchpada",
      "state": "Maharashtra"
    },
    "425414": {
      "district": "JALGAON",
      "city": "Dhadgaon",
      "state": "Maharashtra"
    },
    "424001": {
      "district": "JALGAON",
      "city": "Dhule",
      "state": "Maharashtra"
    },
    "424002": {
      "district": "JALGAON",
      "city": "Dhule J/H Colony",
      "state": "Maharashtra"
    },
    "424004": {
      "district": "JALGAON",
      "city": "Dhule Market Yard",
      "state": "Maharashtra"
    },
    "424006": {
      "district": "JALGAON",
      "city": "Dhule MIDC",
      "state": "Maharashtra"
    },
    "424005": {
      "district": "JALGAON",
      "city": "Dhule V/ Nagari",
      "state": "Maharashtra"
    },
    "425408": {
      "district": "JALGAON",
      "city": "Dondaicha",
      "state": "Maharashtra"
    },
    "424301": {
      "district": "JALGAON",
      "city": "Fagna",
      "state": "Maharashtra"
    },
    "424307": {
      "district": "JALGAON",
      "city": "Kapadana",
      "state": "Maharashtra"
    },
    "424310": {
      "district": "JALGAON",
      "city": "Kasara",
      "state": "Maharashtra"
    },
    "425419": {
      "district": "JALGAON",
      "city": "Khapar",
      "state": "Maharashtra"
    },
    "424302": {
      "district": "JALGAON",
      "city": "Kusumba",
      "state": "Maharashtra"
    },
    "425444": {
      "district": "JALGAON",
      "city": "Mandana",
      "state": "Maharashtra"
    },
    "425432": {
      "district": "JALGAON",
      "city": "Mhasawad",
      "state": "Maharashtra"
    },
    "424311": {
      "district": "JALGAON",
      "city": "Mohadi Laling",
      "state": "Maharashtra"
    },
    "425452": {
      "district": "JALGAON",
      "city": "Molgi",
      "state": "Maharashtra"
    },
    "425404": {
      "district": "JALGAON",
      "city": "Nardana",
      "state": "Maharashtra"
    },
    "424318": {
      "district": "JALGAON",
      "city": "Navalnaga r",
      "state": "Maharashtra"
    },
    "425418": {
      "district": "JALGAON",
      "city": "Navapur",
      "state": "Maharashtra"
    },
    "424303": {
      "district": "JALGAON",
      "city": "Ner",
      "state": "Maharashtra"
    },
    "424305": {
      "district": "JALGAON",
      "city": "Nizampur",
      "state": "Maharashtra"
    },
    "425424": {
      "district": "JALGAON",
      "city": "P.Nagar",
      "state": "Maharashtra"
    },
    "424306": {
      "district": "JALGAON",
      "city": "Pimpalner",
      "state": "Maharashtra"
    },
    "425422": {
      "district": "JALGAON",
      "city": "Prakasha",
      "state": "Maharashtra"
    },
    "424304": {
      "district": "JALGAON",
      "city": "Sakri",
      "state": "Maharashtra"
    },
    "425410": {
      "district": "JALGAON",
      "city": "Sarangkheda",
      "state": "Maharashtra"
    },
    "425409": {
      "district": "JALGAON",
      "city": "Shahada",
      "state": "Maharashtra"
    },
    "425405": {
      "district": "JALGAON",
      "city": "Shirpur",
      "state": "Maharashtra"
    },
    "424308": {
      "district": "JALGAON",
      "city": "Shirud",
      "state": "Maharashtra"
    },
    "425406": {
      "district": "JALGAON",
      "city": "Sindkheda",
      "state": "Maharashtra"
    },
    "424309": {
      "district": "JALGAON",
      "city": "Songir",
      "state": "Maharashtra"
    },
    "425413": {
      "district": "JALGAON",
      "city": "Taloda",
      "state": "Maharashtra"
    },
    "425421": {
      "district": "JALGAON",
      "city": "Thalner",
      "state": "Maharashtra"
    },
    "425423": {
      "district": "JALGAON",
      "city": "Vadali",
      "state": "Maharashtra"
    },
    "425427": {
      "district": "JALGAON",
      "city": "Vikharan",
      "state": "Maharashtra"
    },
    "425426": {
      "district": "JALGAON",
      "city": "Visarwadi",
      "state": "Maharashtra"
    },
    "425416": {
      "district": "JALGAON",
      "city": "Khandbara",
      "state": "Maharashtra"
    },
    "425412": {
      "district": "JALGAON",
      "city": "Nandurbar",
      "state": "Maharashtra"
    },
    "425411": {
      "district": "JALGAON",
      "city": "Ranala",
      "state": "Maharashtra"
    },
    "416505": {
      "district": "KOLHAPUR",
      "city": "Ajara",
      "state": "Maharashtra"
    },
    "416229": {
      "district": "KOLHAPUR",
      "city": "Ambewadi",
      "state": "Maharashtra"
    },
    "416213": {
      "district": "KOLHAPUR",
      "city": "Bambavda",
      "state": "Maharashtra"
    },
    "416208": {
      "district": "KOLHAPUR",
      "city": "Bidri",
      "state": "Maharashtra"
    },
    "416509": {
      "district": "KOLHAPUR",
      "city": "Chandgad",
      "state": "Maharashtra"
    },
    "416552": {
      "district": "KOLHAPUR",
      "city": "Daulat Sugar Factory(Halkami)",
      "state": "Maharashtra"
    },
    "416231": {
      "district": "KOLHAPUR",
      "city": "Dudhganganagar",
      "state": "Maharashtra"
    },
    "416501": {
      "district": "KOLHAPUR",
      "city": "Dundage",
      "state": "Maharashtra"
    },
    "416502": {
      "district": "KOLHAPUR",
      "city": "Gadhinglaj",
      "state": "Maharashtra"
    },
    "416206": {
      "district": "KOLHAPUR",
      "city": "Gaganbavda",
      "state": "Maharashtra"
    },
    "416119": {
      "district": "KOLHAPUR",
      "city": "Gandhinagar",
      "state": "Maharashtra"
    },
    "416209": {
      "district": "KOLHAPUR",
      "city": "Gargoti",
      "state": "Maharashtra"
    },
    "416005": {
      "district": "KOLHAPUR",
      "city": "Gur Market Yard Kop",
      "state": "Maharashtra"
    },
    "416506": {
      "district": "KOLHAPUR",
      "city": "Halkarni",
      "state": "Maharashtra"
    },
    "416203": {
      "district": "KOLHAPUR",
      "city": "Hupri",
      "state": "Maharashtra"
    },
    "416207": {
      "district": "KOLHAPUR",
      "city": "lspurli",
      "state": "Maharashtra"
    },
    "416210": {
      "district": "KOLHAPUR",
      "city": "Kadgaon Gargoti",
      "state": "Maharashtra"
    },
    "416216": {
      "district": "KOLHAPUR",
      "city": "Kagal",
      "state": "Maharashtra"
    },
    "416007": {
      "district": "KOLHAPUR",
      "city": "Kalamba",
      "state": "Maharashtra"
    },
    "416205": {
      "district": "KOLHAPUR",
      "city": "Kale",
      "state": "Maharashtra"
    },
    "416218": {
      "district": "KOLHAPUR",
      "city": "Kapshi",
      "state": "Maharashtra"
    },
    "416507": {
      "district": "KOLHAPUR",
      "city": "Karve",
      "state": "Maharashtra"
    },
    "416006": {
      "district": "KOLHAPUR",
      "city": "Kasba Bavda",
      "state": "Maharashtra"
    },
    "416003": {
      "district": "KOLHAPUR",
      "city": "Kolhapur",
      "state": "Maharashtra"
    },
    "416012": {
      "district": "KOLHAPUR",
      "city": "Kolhapur City",
      "state": "Maharashtra"
    },
    "416001": {
      "district": "KOLHAPUR",
      "city": "Kolhapur R.S.",
      "state": "Maharashtra"
    },
    "416230": {
      "district": "KOLHAPUR",
      "city": "Kotoli",
      "state": "Maharashtra"
    },
    "416526": {
      "district": "KOLHAPUR",
      "city": "Koulage",
      "state": "Maharashtra"
    },
    "416508": {
      "district": "KOLHAPUR",
      "city": "Kowad",
      "state": "Maharashtra"
    },
    "416204": {
      "district": "KOLHAPUR",
      "city": "Kuditre",
      "state": "Maharashtra"
    },
    "416503": {
      "district": "KOLHAPUR",
      "city": "Mahagaon",
      "state": "Maharashtra"
    },
    "415101": {
      "district": "KOLHAPUR",
      "city": "Malkapur",
      "state": "Maharashtra"
    },
    "416223": {
      "district": "KOLHAPUR",
      "city": "Mhasave",
      "state": "Maharashtra"
    },
    "416234": {
      "district": "KOLHAPUR",
      "city": "Midc Gokul Shrigoan",
      "state": "Maharashtra"
    },
    "416122": {
      "district": "KOLHAPUR",
      "city": "Midc Shiroli",
      "state": "Maharashtra"
    },
    "416219": {
      "district": "KOLHAPUR",
      "city": "Murgud",
      "state": "Maharashtra"
    },
    "416504": {
      "district": "KOLHAPUR",
      "city": "Nesari",
      "state": "Maharashtra"
    },
    "416551": {
      "district": "KOLHAPUR",
      "city": "Nool",
      "state": "Maharashtra"
    },
    "416201": {
      "district": "KOLHAPUR",
      "city": "Panhala",
      "state": "Maharashtra"
    },
    "416211": {
      "district": "KOLHAPUR",
      "city": "Parite",
      "state": "Maharashtra"
    },
    "416202": {
      "district": "KOLHAPUR",
      "city": "Pattankodoli",
      "state": "Maharashtra"
    },
    "416010": {
      "district": "KOLHAPUR",
      "city": "Phulewadi",
      "state": "Maharashtra"
    },
    "416013": {
      "district": "KOLHAPUR",
      "city": "R.K.Nagar Kop",
      "state": "Maharashtra"
    },
    "416212": {
      "district": "KOLHAPUR",
      "city": "Radhanagari",
      "state": "Maharashtra"
    },
    "416008": {
      "district": "KOLHAPUR",
      "city": "Rajarampuri",
      "state": "Maharashtra"
    },
    "416118": {
      "district": "KOLHAPUR",
      "city": "Rukadi",
      "state": "Maharashtra"
    },
    "416235": {
      "district": "KOLHAPUR",
      "city": "Sadashivnagar",
      "state": "Maharashtra"
    },
    "416214": {
      "district": "KOLHAPUR",
      "city": "Sarud",
      "state": "Maharashtra"
    },
    "416215": {
      "district": "KOLHAPUR",
      "city": "Shahuwadi",
      "state": "Maharashtra"
    },
    "416002": {
      "district": "KOLHAPUR",
      "city": "Shaniwarpeth",
      "state": "Maharashtra"
    },
    "416004": {
      "district": "KOLHAPUR",
      "city": "Shivaji University",
      "state": "Maharashtra"
    },
    "416232": {
      "district": "KOLHAPUR",
      "city": "Sidhnerli",
      "state": "Maharashtra"
    },
    "416527": {
      "district": "KOLHAPUR",
      "city": "Tillarninagar",
      "state": "Maharashtra"
    },
    "416220": {
      "district": "KOLHAPUR",
      "city": "Uttur",
      "state": "Maharashtra"
    },
    "416221": {
      "district": "KOLHAPUR",
      "city": "Walwa Bk.",
      "state": "Maharashtra"
    },
    "416144": {
      "district": "KOLHAPUR",
      "city": "Akiwate lndl. EstateJaysingpur",
      "state": "Maharashtra"
    },
    "416110": {
      "district": "KOLHAPUR",
      "city": "Bahubali",
      "state": "Maharashtra"
    },
    "416120": {
      "district": "KOLHAPUR",
      "city": "Dattanagar",
      "state": "Maharashtra"
    },
    "416107": {
      "district": "KOLHAPUR",
      "city": "Dattawad",
      "state": "Maharashtra"
    },
    "416105": {
      "district": "KOLHAPUR",
      "city": "Ganeshwadi",
      "state": "Maharashtra"
    },
    "416116": {
      "district": "KOLHAPUR",
      "city": "Ganganagar",
      "state": "Maharashtra"
    },
    "416109": {
      "district": "KOLHAPUR",
      "city": "Hatkalangda",
      "state": "Maharashtra"
    },
    "416115": {
      "district": "KOLHAPUR",
      "city": "Ichalkaranji",
      "state": "Maharashtra"
    },
    "416143": {
      "district": "KOLHAPUR",
      "city": "Ico Spin.Mills (Shivnakwadi)",
      "state": "Maharashtra"
    },
    "416117": {
      "district": "KOLHAPUR",
      "city": "Jawaharnagar",
      "state": "Maharashtra"
    },
    "416101": {
      "district": "KOLHAPUR",
      "city": "Jaysingpur",
      "state": "Maharashtra"
    },
    "416114": {
      "district": "KOLHAPUR",
      "city": "Kodoli",
      "state": "Maharashtra"
    },
    "416111": {
      "district": "KOLHAPUR",
      "city": "Kumbhoj",
      "state": "Maharashtra"
    },
    "416106": {
      "district": "KOLHAPUR",
      "city": "Kurundwad",
      "state": "Maharashtra"
    },
    "416102": {
      "district": "KOLHAPUR",
      "city": "Nandani",
      "state": "Maharashtra"
    },
    "416104": {
      "district": "KOLHAPUR",
      "city": "Narsobawadi",
      "state": "Maharashtra"
    },
    "416145": {
      "district": "KOLHAPUR",
      "city": "Parvati Industrial Estate",
      "state": "Maharashtra"
    },
    "416121": {
      "district": "KOLHAPUR",
      "city": "R.K.Nagar   (LKR)",
      "state": "Maharashtra"
    },
    "416103": {
      "district": "KOLHAPUR",
      "city": "Shirol",
      "state": "Maharashtra"
    },
    "416108": {
      "district": "KOLHAPUR",
      "city": "Takali",
      "state": "Maharashtra"
    },
    "416112": {
      "district": "KOLHAPUR",
      "city": "Vadgaon",
      "state": "Maharashtra"
    },
    "416113": {
      "district": "KOLHAPUR",
      "city": "Warnanagar",
      "state": "Maharashtra"
    },
    "400094": {
      "district": "MUMBAI",
      "city": "A S Nagar",
      "state": "Maharashtra"
    },
    "400065": {
      "district": "MUMBAI",
      "city": "AM.Colony",
      "state": "Maharashtra"
    },
    "400037": {
      "district": "MUMBAI",
      "city": "Antop Hill",
      "state": "Maharashtra"
    },
    "400085": {
      "district": "MUMBAI",
      "city": "Bare",
      "state": "Maharashtra"
    },
    "400084": {
      "district": "MUMBAI",
      "city": "Barve Nagar",
      "state": "Maharashtra"
    },
    "400042": {
      "district": "MUMBAI",
      "city": "Bhandup (E)",
      "state": "Maharashtra"
    },
    "400078": {
      "district": "MUMBAI",
      "city": "Bhandup (W)",
      "state": "Maharashtra"
    },
    "400082": {
      "district": "MUMBAI",
      "city": "Bhandup Wwc",
      "state": "Maharashtra"
    },
    "400028": {
      "district": "MUMBAI",
      "city": "Bhavani Shankar",
      "state": "Maharashtra"
    },
    "400091": {
      "district": "MUMBAI",
      "city": "Borivali",
      "state": "Maharashtra"
    },
    "400066": {
      "district": "MUMBAI",
      "city": "Borivali East",
      "state": "Maharashtra"
    },
    "400092": {
      "district": "MUMBAI",
      "city": "Borivali West",
      "state": "Maharashtra"
    },
    "400071": {
      "district": "MUMBAI",
      "city": "Chembur",
      "state": "Maharashtra"
    },
    "400009": {
      "district": "MUMBAI",
      "city": "Chinchbunder",
      "state": "Maharashtra"
    },
    "400005": {
      "district": "MUMBAI",
      "city": "Colaba",
      "state": "Maharashtra"
    },
    "400026": {
      "district": "MUMBAI",
      "city": "Cumballa Hill",
      "state": "Maharashtra"
    },
    "400014": {
      "district": "MUMBAI",
      "city": "Dadar",
      "state": "Maharashtra"
    },
    "400068": {
      "district": "MUMBAI",
      "city": "Dahisar East",
      "state": "Maharashtra"
    },
    "400013": {
      "district": "MUMBAI",
      "city": "Delisle Road",
      "state": "Maharashtra"
    },
    "400017": {
      "district": "MUMBAI",
      "city": "Dharavi",
      "state": "Maharashtra"
    },
    "400074": {
      "district": "MUMBAI",
      "city": "Fci",
      "state": "Maharashtra"
    },
    "400086": {
      "district": "MUMBAI",
      "city": "Ghatkopar (W)",
      "state": "Maharashtra"
    },
    "400004": {
      "district": "MUMBAI",
      "city": "Girgaon",
      "state": "Maharashtra"
    },
    "400063": {
      "district": "MUMBAI",
      "city": "Goregaon East",
      "state": "Maharashtra"
    },
    "400007": {
      "district": "MUMBAI",
      "city": "Grant Road",
      "state": "Maharashtra"
    },
    "400011": {
      "district": "MUMBAI",
      "city": "Jacob Circle",
      "state": "Maharashtra"
    },
    "400060": {
      "district": "MUMBAI",
      "city": "Jogeshwari East",
      "state": "Maharashtra"
    },
    "400102": {
      "district": "MUMBAI",
      "city": "Jogeshwari West",
      "state": "Maharashtra"
    },
    "400002": {
      "district": "MUMBAI",
      "city": "Kalbadevi",
      "state": "Maharashtra"
    },
    "400101": {
      "district": "MUMBAI",
      "city": "Kandivali East",
      "state": "Maharashtra"
    },
    "400067": {
      "district": "MUMBAI",
      "city": "Kandivali West",
      "state": "Maharashtra"
    },
    "400095": {
      "district": "MUMBAI",
      "city": "Kharodi",
      "state": "Maharashtra"
    },
    "400070": {
      "district": "MUMBAI",
      "city": "Kurla",
      "state": "Maharashtra"
    },
    "400016": {
      "district": "MUMBAI",
      "city": "Mahim",
      "state": "Maharashtra"
    },
    "400097": {
      "district": "MUMBAI",
      "city": "Malad East",
      "state": "Maharashtra"
    },
    "400064": {
      "district": "MUMBAI",
      "city": "Malad West",
      "state": "Maharashtra"
    },
    "400006": {
      "district": "MUMBAI",
      "city": "Malbar Hill",
      "state": "Maharashtra"
    },
    "400103": {
      "district": "MUMBAI",
      "city": "Mandpeshwar",
      "state": "Maharashtra"
    },
    "400003": {
      "district": "MUMBAI",
      "city": "Mandvi",
      "state": "Maharashtra"
    },
    "400032": {
      "district": "MUMBAI",
      "city": "Mantralaya",
      "state": "Maharashtra"
    },
    "400020": {
      "district": "MUMBAI",
      "city": "Marine Lines",
      "state": "Maharashtra"
    },
    "400019": {
      "district": "MUMBAI",
      "city": "Matunga",
      "state": "Maharashtra"
    },
    "400010": {
      "district": "MUMBAI",
      "city": "Mazgaon",
      "state": "Maharashtra"
    },
    "400104": {
      "district": "MUMBAI",
      "city": "Motilalnagar",
      "state": "Maharashtra"
    },
    "400081": {
      "district": "MUMBAI",
      "city": "Mulund (E)",
      "state": "Maharashtra"
    },
    "400080": {
      "district": "MUMBAI",
      "city": "Mulund (W)",
      "state": "Maharashtra"
    },
    "400001": {
      "district": "MUMBAI",
      "city": "Mumbai",
      "state": "Maharashtra"
    },
    "400008": {
      "district": "MUMBAI",
      "city": "Mumbai Central",
      "state": "Maharashtra"
    },
    "400021": {
      "district": "MUMBAI",
      "city": "Nariman Point",
      "state": "Maharashtra"
    },
    "400024": {
      "district": "MUMBAI",
      "city": "Nehru Nagar",
      "state": "Maharashtra"
    },
    "400087": {
      "district": "MUMBAI",
      "city": "Nitie",
      "state": "Maharashtra"
    },
    "400075": {
      "district": "MUMBAI",
      "city": "Pant Nagar",
      "state": "Maharashtra"
    },
    "400012": {
      "district": "MUMBAI",
      "city": "Parel",
      "state": "Maharashtra"
    },
    "400025": {
      "district": "MUMBAI",
      "city": "Prabhadevi",
      "state": "Maharashtra"
    },
    "400077": {
      "district": "MUMBAI",
      "city": "Rajawadi",
      "state": "Maharashtra"
    },
    "400035": {
      "district": "MUMBAI",
      "city": "Rajbhavan",
      "state": "Maharashtra"
    },
    "400072": {
      "district": "MUMBAI",
      "city": "Sakinaka",
      "state": "Maharashtra"
    },
    "400015": {
      "district": "MUMBAI",
      "city": "Sewree",
      "state": "Maharashtra"
    },
    "400043": {
      "district": "MUMBAI",
      "city": "Shivaji Nagar",
      "state": "Maharashtra"
    },
    "400022": {
      "district": "MUMBAI",
      "city": "Sion",
      "state": "Maharashtra"
    },
    "400088": {
      "district": "MUMBAI",
      "city": "T F Deonar",
      "state": "Maharashtra"
    },
    "400083": {
      "district": "MUMBAI",
      "city": "Tagore Nagar",
      "state": "Maharashtra"
    },
    "400033": {
      "district": "MUMBAI",
      "city": "Tank Road",
      "state": "Maharashtra"
    },
    "400089": {
      "district": "MUMBAI",
      "city": "Tilak Nagar",
      "state": "Maharashtra"
    },
    "400034": {
      "district": "MUMBAI",
      "city": "Tulsiwadi",
      "state": "Maharashtra"
    },
    "400079": {
      "district": "MUMBAI",
      "city": "Vikhroli",
      "state": "Maharashtra"
    },
    "400027": {
      "district": "MUMBAI",
      "city": "Vjb Udyan",
      "state": "Maharashtra"
    },
    "400031": {
      "district": "MUMBAI",
      "city": "Wadala",
      "state": "Maharashtra"
    },
    "400076": {
      "district": "MUMBAI",
      "city": "Wai lit",
      "state": "Maharashtra"
    },
    "400018": {
      "district": "MUMBAI",
      "city": "Worli",
      "state": "Maharashtra"
    },
    "400030": {
      "district": "MUMBAI",
      "city": "Worli Colony",
      "state": "Maharashtra"
    },
    "402201": {
      "district": "MUMBAI",
      "city": "Alibag",
      "state": "Maharashtra"
    },
    "415726": {
      "district": "MUMBAI",
      "city": "Abloli",
      "state": "Maharashtra"
    },
    "415705": {
      "district": "MUMBAI",
      "city": "Adur",
      "state": "Maharashtra"
    },
    "415603": {
      "district": "MUMBAI",
      "city": "Alore",
      "state": "Maharashtra"
    },
    "415730": {
      "district": "MUMBAI",
      "city": "Ambavali",
      "state": "Maharashtra"
    },
    "415621": {
      "district": "MUMBAI",
      "city": "Bharane",
      "state": "Maharashtra"
    },
    "415605": {
      "district": "MUMBAI",
      "city": "Chiplun",
      "state": "Maharashtra"
    },
    "415718": {
      "district": "MUMBAI",
      "city": "Dhamnand",
      "state": "Maharashtra"
    },
    "415703": {
      "district": "MUMBAI",
      "city": "Guhagar",
      "state": "Maharashtra"
    },
    "415728": {
      "district": "MUMBAI",
      "city": "Hedvi",
      "state": "Maharashtra"
    },
    "415727": {
      "district": "MUMBAI",
      "city": "Karjee",
      "state": "Maharashtra"
    },
    "415640": {
      "district": "MUMBAI",
      "city": "Khavati",
      "state": "Maharashtra"
    },
    "415709": {
      "district": "MUMBAI",
      "city": "Khed(Rtg)",
      "state": "Maharashtra"
    },
    "415604": {
      "district": "MUMBAI",
      "city": "Kherdi",
      "state": "Maharashtra"
    },
    "415715": {
      "district": "MUMBAI",
      "city": "Khopi",
      "state": "Maharashtra"
    },
    "415708": {
      "district": "MUMBAI",
      "city": "Lavel",
      "state": "Maharashtra"
    },
    "415608": {
      "district": "MUMBAI",
      "city": "Makhjan",
      "state": "Maharashtra"
    },
    "415702": {
      "district": "MUMBAI",
      "city": "Margtamhane",
      "state": "Maharashtra"
    },
    "415607": {
      "district": "MUMBAI",
      "city": "Nandgaon( Cpn)",
      "state": "Maharashtra"
    },
    "415641": {
      "district": "MUMBAI",
      "city": "Niwali(Cpn)",
      "state": "Maharashtra"
    },
    "415601": {
      "district": "MUMBAI",
      "city": "Pophali",
      "state": "Maharashtra"
    },
    "415701": {
      "district": "MUMBAI",
      "city": "Rampur",
      "state": "Maharashtra"
    },
    "415606": {
      "district": "MUMBAI",
      "city": "Sawarda",
      "state": "Maharashtra"
    },
    "415628": {
      "district": "MUMBAI",
      "city": "Shiral",
      "state": "Maharashtra"
    },
    "415602": {
      "district": "MUMBAI",
      "city": "Shirgaon(Cpn)",
      "state": "Maharashtra"
    },
    "415724": {
      "district": "MUMBAI",
      "city": "Shringartali",
      "state": "Maharashtra"
    },
    "415719": {
      "district": "MUMBAI",
      "city": "Talavali",
      "state": "Maharashtra"
    },
    "415729": {
      "district": "MUMBAI",
      "city": "Welneshwar",
      "state": "Maharashtra"
    },
    "415714": {
      "district": "MUMBAI",
      "city": "Anjarla",
      "state": "Maharashtra"
    },
    "415720": {
      "district": "MUMBAI",
      "city": "Burondi",
      "state": "Maharashtra"
    },
    "415706": {
      "district": "MUMBAI",
      "city": "Dabhol",
      "state": "Maharashtra"
    },
    "415712": {
      "district": "MUMBAI",
      "city": "Dapoli",
      "state": "Maharashtra"
    },
    "415710": {
      "district": "MUMBAI",
      "city": "Furus",
      "state": "Maharashtra"
    },
    "415713": {
      "district": "MUMBAI",
      "city": "Hamai",
      "state": "Maharashtra"
    },
    "415717": {
      "district": "MUMBAI",
      "city": "Kelshi",
      "state": "Maharashtra"
    },
    "415202": {
      "district": "MUMBAI",
      "city": "Latwan",
      "state": "Maharashtra"
    },
    "415203": {
      "district": "MUMBAI",
      "city": "Mandangad",
      "state": "Maharashtra"
    },
    "415716": {
      "district": "MUMBAI",
      "city": "Palgad",
      "state": "Maharashtra"
    },
    "415214": {
      "district": "MUMBAI",
      "city": "Panderi",
      "state": "Maharashtra"
    },
    "415711": {
      "district": "MUMBAI",
      "city": "Vakavali",
      "state": "Maharashtra"
    },
    "415208": {
      "district": "MUMBAI",
      "city": "Veshvi",
      "state": "Maharashtra"
    },
    "402101": {
      "district": "MUMBAI",
      "city": "Ambet",
      "state": "Maharashtra"
    },
    "400708": {
      "district": "MUMBAI",
      "city": "Airoli",
      "state": "Maharashtra"
    },
    "400701": {
      "district": "MUMBAI",
      "city": "Ghansoli",
      "state": "Maharashtra"
    },
    "400614": {
      "district": "MUMBAI",
      "city": "Konkan Bhavan",
      "state": "Maharashtra"
    },
    "400709": {
      "district": "MUMBAI",
      "city": "Koper Khairane",
      "state": "Maharashtra"
    },
    "400706": {
      "district": "MUMBAI",
      "city": "Nerul Node Iii",
      "state": "Maharashtra"
    },
    "415722": {
      "district": "MUMBAI",
      "city": "Lote",
      "state": "Maharashtra"
    },
    "402114": {
      "district": "MUMBAI",
      "city": "Bagmandla",
      "state": "Maharashtra"
    },
    "402308": {
      "district": "MUMBAI",
      "city": "Bhira",
      "state": "Maharashtra"
    },
    "107": {
      "district": "MUMBAI",
      "city": "Mira Road 401",
      "state": "Maharashtra"
    },
    "410216": {
      "district": "MUMBAI",
      "city": "Jagdishnagar",
      "state": "Maharashtra"
    },
    "410219": {
      "district": "MUMBAI",
      "city": "Jcie Kamothe",
      "state": "Maharashtra"
    },
    "400707": {
      "district": "MUMBAI",
      "city": "Jnpt Township",
      "state": "Maharashtra"
    },
    "410218": {
      "district": "MUMBAI",
      "city": "Kalamboli",
      "state": "Maharashtra"
    },
    "410201": {
      "district": "MUMBAI",
      "city": "Karjat",
      "state": "Maharashtra"
    },
    "410202": {
      "district": "MUMBAI",
      "city": "Khalapur",
      "state": "Maharashtra"
    },
    "410210": {
      "district": "MUMBAI",
      "city": "Kharghar",
      "state": "Maharashtra"
    },
    "410204": {
      "district": "MUMBAI",
      "city": "Khopoli Power House",
      "state": "Maharashtra"
    },
    "410102": {
      "district": "MUMBAI",
      "city": "Matheran",
      "state": "Maharashtra"
    },
    "410222": {
      "district": "MUMBAI",
      "city": "Mohopada",
      "state": "Maharashtra"
    },
    "400704": {
      "district": "MUMBAI",
      "city": "N.S. Karanja",
      "state": "Maharashtra"
    },
    "410101": {
      "district": "MUMBAI",
      "city": "Neral",
      "state": "Maharashtra"
    },
    "410221": {
      "district": "MUMBAI",
      "city": "Onge Complex",
      "state": "Maharashtra"
    },
    "410206": {
      "district": "MUMBAI",
      "city": "Panvel",
      "state": "Maharashtra"
    },
    "410220": {
      "district": "MUMBAI",
      "city": "Patalganga",
      "state": "Maharashtra"
    },
    "410207": {
      "district": "MUMBAI",
      "city": "Rasayani",
      "state": "Maharashtra"
    },
    "410203": {
      "district": "MUMBAI",
      "city": "Shilphata",
      "state": "Maharashtra"
    },
    "410208": {
      "district": "MUMBAI",
      "city": "Taloja",
      "state": "Maharashtra"
    },
    "400702": {
      "district": "MUMBAI",
      "city": "Uran",
      "state": "Maharashtra"
    },
    "402403": {
      "district": "MUMBAI",
      "city": "Borlipanchatan",
      "state": "Maharashtra"
    },
    "402302": {
      "district": "MUMBAI",
      "city": "Birwadi",
      "state": "Maharashtra"
    },
    "416707": {
      "district": "MUMBAI",
      "city": "Adivare",
      "state": "Maharashtra"
    },
    "415637": {
      "district": "MUMBAI",
      "city": "Ambed Budruk",
      "state": "Maharashtra"
    },
    "416713": {
      "district": "MUMBAI",
      "city": "Bhoo",
      "state": "Maharashtra"
    },
    "415807": {
      "district": "MUMBAI",
      "city": "Devale",
      "state": "Maharashtra"
    },
    "416712": {
      "district": "MUMBAI",
      "city": "Devdhe",
      "state": "Maharashtra"
    },
    "415804": {
      "district": "MUMBAI",
      "city": "Devrukh",
      "state": "Maharashtra"
    },
    "415626": {
      "district": "MUMBAI",
      "city": "Gavkhadi",
      "state": "Maharashtra"
    },
    "415619": {
      "district": "MUMBAI",
      "city": "Hatkhamba",
      "state": "Maharashtra"
    },
    "415614": {
      "district": "MUMBAI",
      "city": "Jaigad",
      "state": "Maharashtra"
    },
    "415805": {
      "district": "MUMBAI",
      "city": "Jaitapur",
      "state": "Maharashtra"
    },
    "415609": {
      "district": "MUMBAI",
      "city": "Kadwai",
      "state": "Maharashtra"
    },
    "415610": {
      "district": "MUMBAI",
      "city": "Kasba",
      "state": "Maharashtra"
    },
    "415620": {
      "district": "MUMBAI",
      "city": "Khalgaon",
      "state": "Maharashtra"
    },
    "415617": {
      "district": "MUMBAI",
      "city": "Kotavada",
      "state": "Maharashtra"
    },
    "416701": {
      "district": "MUMBAI",
      "city": "Lanja",
      "state": "Maharashtra"
    },
    "415615": {
      "district": "MUMBAI",
      "city": "Malgund",
      "state": "Maharashtra"
    },
    "415639": {
      "district": "MUMBAI",
      "city": "Midc(Ratnagiri)",
      "state": "Maharashtra"
    },
    "415806": {
      "district": "MUMBAI",
      "city": "Nata",
      "state": "Maharashtra"
    },
    "416705": {
      "district": "MUMBAI",
      "city": "Oni",
      "state": "Maharashtra"
    },
    "416704": {
      "district": "MUMBAI",
      "city": "Pachal",
      "state": "Maharashtra"
    },
    "415616": {
      "district": "MUMBAI",
      "city": "Pawas",
      "state": "Maharashtra"
    },
    "416702": {
      "district": "MUMBAI",
      "city": "Rajapur",
      "state": "Maharashtra"
    },
    "415612": {
      "district": "MUMBAI",
      "city": "Ratnagiri",
      "state": "Maharashtra"
    },
    "416709": {
      "district": "MUMBAI",
      "city": "Sagave",
      "state": "Maharashtra"
    },
    "415613": {
      "district": "MUMBAI",
      "city": "Saitavada",
      "state": "Maharashtra"
    },
    "415803": {
      "district": "MUMBAI",
      "city": "Pali(Ratnagiri)",
      "state": "Maharashtra"
    },
    "401202": {
      "district": "MUMBAI",
      "city": "Bassein Road",
      "state": "Maharashtra"
    },
    "401101": {
      "district": "MUMBAI",
      "city": "Bhayandar",
      "state": "Maharashtra"
    },
    "415801": {
      "district": "MUMBAI",
      "city": "Sakharpa",
      "state": "Maharashtra"
    },
    "415611": {
      "district": "MUMBAI",
      "city": "Sangmeshwar",
      "state": "Maharashtra"
    },
    "415802": {
      "district": "MUMBAI",
      "city": "Shiposhi",
      "state": "Maharashtra"
    },
    "415629": {
      "district": "MUMBAI",
      "city": "Shirgaon(Rtg)",
      "state": "Maharashtra"
    },
    "415643": {
      "district": "MUMBAI",
      "city": "Watul",
      "state": "Maharashtra"
    },
    "402203": {
      "district": "MUMBAI",
      "city": "Chaul",
      "state": "Maharashtra"
    },
    "415213": {
      "district": "MUMBAI",
      "city": "Chimbhave",
      "state": "Maharashtra"
    },
    "412102": {
      "district": "MUMBAI",
      "city": "Dasgaon",
      "state": "Maharashtra"
    },
    "402402": {
      "district": "MUMBAI",
      "city": "Dighi",
      "state": "Maharashtra"
    },
    "402404": {
      "district": "MUMBAI",
      "city": "Diveagar",
      "state": "Maharashtra"
    },
    "402103": {
      "district": "MUMBAI",
      "city": "Goregaon",
      "state": "Maharashtra"
    },
    "402401": {
      "district": "MUMBAI",
      "city": "Janjira Murud",
      "state": "Maharashtra"
    },
    "402304": {
      "district": "MUMBAI",
      "city": "Kolad",
      "state": "Maharashtra"
    },
    "402209": {
      "district": "MUMBAI",
      "city": "Kurul Ref Colony",
      "state": "Maharashtra"
    },
    "402301": {
      "district": "MUMBAI",
      "city": "Mahad",
      "state": "Maharashtra"
    },
    "402104": {
      "district": "MUMBAI",
      "city": "Mangaon",
      "state": "Maharashtra"
    },
    "402105": {
      "district": "MUMBAI",
      "city": "Mhasla",
      "state": "Maharashtra"
    },
    "402309": {
      "district": "MUMBAI",
      "city": "Midc Mahad",
      "state": "Maharashtra"
    },
    "402117": {
      "district": "MUMBAI",
      "city": "Morba",
      "state": "Maharashtra"
    },
    "402204": {
      "district": "MUMBAI",
      "city": "Nagaon",
      "state": "Maharashtra"
    },
    "402106": {
      "district": "MUMBAI",
      "city": "Nagothane",
      "state": "Maharashtra"
    },
    "402406": {
      "district": "MUMBAI",
      "city": "Nandgaon",
      "state": "Maharashtra"
    },
    "402305": {
      "district": "MUMBAI",
      "city": "Nate",
      "state": "Maharashtra"
    },
    "402120": {
      "district": "MUMBAI",
      "city": "Nizampur",
      "state": "Maharashtra"
    },
    "410205": {
      "district": "MUMBAI",
      "city": "Pali",
      "state": "Maharashtra"
    },
    "402107": {
      "district": "MUMBAI",
      "city": "Pen",
      "state": "Maharashtra"
    },
    "402125": {
      "district": "MUMBAI",
      "city": "Petro Chemical Town Ship",
      "state": "Maharashtra"
    },
    "402126": {
      "district": "MUMBAI",
      "city": "Pipenagar",
      "state": "Maharashtra"
    },
    "402303": {
      "district": "MUMBAI",
      "city": "Poladpur",
      "state": "Maharashtra"
    },
    "402108": {
      "district": "MUMBAI",
      "city": "Poynad",
      "state": "Maharashtra"
    },
    "402405": {
      "district": "MUMBAI",
      "city": "Rajpuri",
      "state": "Maharashtra"
    },
    "402208": {
      "district": "MUMBAI",
      "city": "Ref Thal",
      "state": "Maharashtra"
    },
    "402202": {
      "district": "MUMBAI",
      "city": "Revdanda",
      "state": "Maharashtra"
    },
    "402109": {
      "district": "MUMBAI",
      "city": "Roha",
      "state": "Maharashtra"
    },
    "402116": {
      "district": "MUMBAI",
      "city": "Roha A V",
      "state": "Maharashtra"
    },
    "402122": {
      "district": "MUMBAI",
      "city": "Sai",
      "state": "Maharashtra"
    },
    "402110": {
      "district": "MUMBAI",
      "city": "Shrivardhan",
      "state": "Maharashtra"
    },
    "402111": {
      "district": "MUMBAI",
      "city": "Tala",
      "state": "Maharashtra"
    },
    "402112": {
      "district": "MUMBAI",
      "city": "Talashet",
      "state": "Maharashtra"
    },
    "402207": {
      "district": "MUMBAI",
      "city": "Thal",
      "state": "Maharashtra"
    },
    "402115": {
      "district": "MUMBAI",
      "city": "Upper Tudil",
      "state": "Maharashtra"
    },
    "402306": {
      "district": "MUMBAI",
      "city": "Varandh",
      "state": "Maharashtra"
    },
    "402307": {
      "district": "MUMBAI",
      "city": "Vinhere",
      "state": "Maharashtra"
    },
    "402113": {
      "district": "MUMBAI",
      "city": "Walwati",
      "state": "Maharashtra"
    },
    "402118": {
      "district": "MUMBAI",
      "city": "Washi",
      "state": "Maharashtra"
    },
    "401303": {
      "district": "MUMBAI",
      "city": "Virar",
      "state": "Maharashtra"
    },
    "440003": {
      "district": "NAGPUR",
      "city": "Ajni",
      "state": "Maharashtra"
    },
    "440024": {
      "district": "NAGPUR",
      "city": "Ayodhya Nagar",
      "state": "Maharashtra"
    },
    "440008": {
      "district": "NAGPUR",
      "city": "Bagadganj",
      "state": "Maharashtra"
    },
    "440004": {
      "district": "NAGPUR",
      "city": "Bezonbagh",
      "state": "Maharashtra"
    },
    "440019": {
      "district": "NAGPUR",
      "city": "Crpf",
      "state": "Maharashtra"
    },
    "440017": {
      "district": "NAGPUR",
      "city": "D.A.Marg",
      "state": "Maharashtra"
    },
    "440009": {
      "district": "NAGPUR",
      "city": "Hanumannagar",
      "state": "Maharashtra"
    },
    "440014": {
      "district": "NAGPUR",
      "city": "Jaripatka",
      "state": "Maharashtra"
    },
    "440035": {
      "district": "NAGPUR",
      "city": "Kalmna Mkt. Yard",
      "state": "Maharashtra"
    },
    "440013": {
      "district": "NAGPUR",
      "city": "Kato!Road",
      "state": "Maharashtra"
    },
    "440025": {
      "district": "NAGPUR",
      "city": "Khamla",
      "state": "Maharashtra"
    },
    "440018": {
      "district": "NAGPUR",
      "city": "M.F.Bazar",
      "state": "Maharashtra"
    },
    "440032": {
      "district": "NAGPUR",
      "city": "Mahal",
      "state": "Maharashtra"
    },
    "440030": {
      "district": "NAGPUR",
      "city": "Mankapur",
      "state": "Maharashtra"
    },
    "440034": {
      "district": "NAGPUR",
      "city": "Mhalgi Nagar",
      "state": "Maharashtra"
    },
    "440001": {
      "district": "NAGPUR",
      "city": "Nagpur",
      "state": "Maharashtra"
    },
    "440005": {
      "district": "NAGPUR",
      "city": "Nagpur Airport",
      "state": "Maharashtra"
    },
    "440002": {
      "district": "NAGPUR",
      "city": "Nagpur City",
      "state": "Maharashtra"
    },
    "440020": {
      "district": "NAGPUR",
      "city": "Neeri",
      "state": "Maharashtra"
    },
    "440027": {
      "district": "NAGPUR",
      "city": "Parwati Nagar",
      "state": "Maharashtra"
    },
    "440012": {
      "district": "NAGPUR",
      "city": "Patwardhan Ground",
      "state": "Maharashtra"
    },
    "440022": {
      "district": "NAGPUR",
      "city": "Ranapratap Nagar",
      "state": "Maharashtra"
    },
    "440006": {
      "district": "NAGPUR",
      "city": "Seminary Hills",
      "state": "Maharashtra"
    },
    "440010": {
      "district": "NAGPUR",
      "city": "Shankarnagar",
      "state": "Maharashtra"
    },
    "440033": {
      "district": "NAGPUR",
      "city": "University Campus",
      "state": "Maharashtra"
    },
    "440026": {
      "district": "NAGPUR",
      "city": "Uppalwadi",
      "state": "Maharashtra"
    },
    "440007": {
      "district": "NAGPUR",
      "city": "Vayusena Nagar",
      "state": "Maharashtra"
    },
    "440015": {
      "district": "NAGPUR",
      "city": "Vivekanand Nagar",
      "state": "Maharashtra"
    },
    "444126": {
      "district": "NAGPUR",
      "city": "Adgaon",
      "state": "Maharashtra"
    },
    "444001": {
      "district": "NAGPUR",
      "city": "Akola",
      "state": "Maharashtra"
    },
    "444002": {
      "district": "NAGPUR",
      "city": "Akola City",
      "state": "Maharashtra"
    },
    "444101": {
      "district": "NAGPUR",
      "city": "Akot",
      "state": "Maharashtra"
    },
    "444511": {
      "district": "NAGPUR",
      "city": "Alegaon",
      "state": "Maharashtra"
    },
    "444507": {
      "district": "NAGPUR",
      "city": "Ansing",
      "state": "Maharashtra"
    },
    "444609": {
      "district": "NAGPUR",
      "city": "Assegaon",
      "state": "Maharashtra"
    },
    "444302": {
      "district": "NAGPUR",
      "city": "Balapur",
      "state": "Maharashtra"
    },
    "444401": {
      "district": "NAGPUR",
      "city": "Barshitakli",
      "state": "Maharashtra"
    },
    "444102": {
      "district": "NAGPUR",
      "city": "Borgaon Manju",
      "state": "Maharashtra"
    },
    "444125": {
      "district": "NAGPUR",
      "city": "Chohatta",
      "state": "Maharashtra"
    },
    "444111": {
      "district": "NAGPUR",
      "city": "Dahihanda",
      "state": "Maharashtra"
    },
    "444129": {
      "district": "NAGPUR",
      "city": "Danapur",
      "state": "Maharashtra"
    },
    "444004": {
      "district": "NAGPUR",
      "city": "Gandhinagar",
      "state": "Maharashtra"
    },
    "444103": {
      "district": "NAGPUR",
      "city": "Hiwarkhed Ruprao",
      "state": "Maharashtra"
    },
    "444005": {
      "district": "NAGPUR",
      "city": "Jatharpeth",
      "state": "Maharashtra"
    },
    "444110": {
      "district": "NAGPUR",
      "city": "Kamargaon",
      "state": "Maharashtra"
    },
    "444105": {
      "district": "NAGPUR",
      "city": "Karanja",
      "state": "Maharashtra"
    },
    "444104": {
      "district": "NAGPUR",
      "city": "Krishinagar",
      "state": "Maharashtra"
    },
    "444115": {
      "district": "NAGPUR",
      "city": "Kurum",
      "state": "Maharashtra"
    },
    "444503": {
      "district": "NAGPUR",
      "city": "Malegaon",
      "state": "Maharashtra"
    },
    "444106": {
      "district": "NAGPUR",
      "city": "Mana",
      "state": "Maharashtra"
    },
    "444403": {
      "district": "NAGPUR",
      "city": "Mangrulpir",
      "state": "Maharashtra"
    },
    "444404": {
      "district": "NAGPUR",
      "city": "Manora",
      "state": "Maharashtra"
    },
    "444512": {
      "district": "NAGPUR",
      "city": "Medshi",
      "state": "Maharashtra"
    },
    "444117": {
      "district": "NAGPUR",
      "city": "Mundgaon",
      "state": "Maharashtra"
    },
    "444107": {
      "district": "NAGPUR",
      "city": "Murtizapur",
      "state": "Maharashtra"
    },
    "444311": {
      "district": "NAGPUR",
      "city": "Nimba",
      "state": "Maharashtra"
    },
    "444501": {
      "district": "NAGPUR",
      "city": "Patur",
      "state": "Maharashtra"
    },
    "444407": {
      "district": "NAGPUR",
      "city": "Pinjar",
      "state": "Maharashtra"
    },
    "444506": {
      "district": "NAGPUR",
      "city": "Risod",
      "state": "Maharashtra"
    },
    "444510": {
      "district": "NAGPUR",
      "city": "Rithad",
      "state": "Maharashtra"
    },
    "444402": {
      "district": "NAGPUR",
      "city": "Shelu Bazar",
      "state": "Maharashtra"
    },
    "444003": {
      "district": "NAGPUR",
      "city": "Shivaji Park",
      "state": "Maharashtra"
    },
    "444504": {
      "district": "NAGPUR",
      "city": "Sirpur",
      "state": "Maharashtra"
    },
    "444006": {
      "district": "NAGPUR",
      "city": "Tajnapeth",
      "state": "Maharashtra"
    },
    "444108": {
      "district": "NAGPUR",
      "city": "Telhara",
      "state": "Maharashtra"
    },
    "444122": {
      "district": "NAGPUR",
      "city": "Umbarda Bz",
      "state": "Maharashtra"
    },

    "444502": {
      "district": "NAGPUR",
      "city": "Vadegaon",
      "state": "Maharashtra"
    },
    "444109": {
      "district": "NAGPUR",
      "city": "Vidhyut Nagar",
      "state": "Maharashtra"
    },
    "444505": {
      "district": "NAGPUR",
      "city": "Washim",
      "state": "Maharashtra"
    },
    "444806": {
      "district": "NAGPUR",
      "city": "Achalpur City",
      "state": "Maharashtra"
    },
    "444910": {
      "district": "NAGPUR",
      "city": "Ambada",
      "state": "Maharashtra"
    },
    "444601": {
      "district": "NAGPUR",
      "city": "Amravati",
      "state": "Maharashtra"
    },
    "444602": {
      "district": "NAGPUR",
      "city": "Amravati Camp",
      "state": "Maharashtra"
    },
    "444705": {
      "district": "NAGPUR",
      "city": "Anjangaon",
      "state": "Maharashtra"
    },
    "444727": {
      "district": "NAGPUR",
      "city": "Anjangaon Bori",
      "state": "Maharashtra"
    },
    "444827": {
      "district": "NAGPUR",
      "city": "Asegaon",
      "state": "Maharashtra"
    },
    "444701": {
      "district": "NAGPUR",
      "city": "Badnera",
      "state": "Maharashtra"
    },
    "444718": {
      "district": "NAGPUR",
      "city": "Belora",
      "state": "Maharashtra"
    },
    "444812": {
      "district": "NAGPUR",
      "city": "Benoda",
      "state": "Maharashtra"
    },
    "444720": {
      "district": "NAGPUR",
      "city": "Bramanwada Thadi",
      "state": "Maharashtra"
    },
    "444704": {
      "district": "NAGPUR",
      "city": "Chandur Bazar",
      "state": "Maharashtra"
    },
    "444904": {
      "district": "NAGPUR",
      "city": "Chandur Rly",
      "state": "Maharashtra"
    },

    "444807": {
      "district": "NAGPUR",
      "city": "Chikhaldara",
      "state": "Maharashtra"
    },
    "444814": {
      "district": "NAGPUR",
      "city": "Darapur",
      "state": "Maharashtra"
    },
    "444803": {
      "district": "NAGPUR",
      "city": "Daryapur",
      "state": "Maharashtra"
    },
    "444717": {
      "district": "NAGPUR",
      "city": "Dhamangaon Gadhi",
      "state": "Maharashtra"
    },
    "444709": {
      "district": "NAGPUR",
      "city": "Dhamangaon RS",
      "state": "Maharashtra"
    },

    "444702": {
      "district": "NAGPUR",
      "city": "Dharni",
      "state": "Maharashtra"
    },
    "444902": {
      "district": "NAGPUR",
      "city": "G.K.Ashram",
      "state": "Maharashtra"
    },
    "444605": {
      "district": "NAGPUR",
      "city": "H.V.Nagar",
      "state": "Maharashtra"
    },
    "444914": {
      "district": "NAGPUR",
      "city": "Hiwarkhed",
      "state": "Maharashtra"
    },
    "444908": {
      "district": "NAGPUR",
      "city": "Jarud",
      "state": "Maharashtra"
    },
    "444719": {
      "district": "NAGPUR",
      "city": "Kalarnkhar",
      "state": "Maharashtra"
    },
    "444713": {
      "district": "NAGPUR",
      "city": "Kapustalni",
      "state": "Maharashtra"
    },
    "444809": {
      "district": "NAGPUR",
      "city": "Karajgaon",
      "state": "Maharashtra"
    },
    "444811": {
      "district": "NAGPUR",
      "city": "Khallar",
      "state": "Maharashtra"
    },
    "444802": {
      "district": "NAGPUR",
      "city": "Kholapur",
      "state": "Maharashtra"
    },
    "444818": {
      "district": "NAGPUR",
      "city": "Kokarda",
      "state": "Maharashtra"
    },
    "444909": {
      "district": "NAGPUR",
      "city": "Kunba",
      "state": "Maharashtra"
    },
    "444913": {
      "district": "NAGPUR",
      "city": "Loni",
      "state": "Maharashtra"
    },
    "444711": {
      "district": "NAGPUR",
      "city": "Mangrul Dastagir",
      "state": "Maharashtra"
    },
    "444905": {
      "district": "NAGPUR",
      "city": "Morshi",
      "state": "Maharashtra"
    },
    "444708": {
      "district": "NAGPUR",
      "city": "Nandgaon Kh",
      "state": "Maharashtra"
    },

    "444901": {
      "district": "NAGPUR",
      "city": "Nandgaon Peth",
      "state": "Maharashtra"
    },
    "444707": {
      "district": "NAGPUR",
      "city": "Nerpinglai",
      "state": "Maharashtra"
    },
    "444805": {
      "district": "NAGPUR",
      "city": "Paratwada",
      "state": "Maharashtra"
    },
    "444808": {
      "district": "NAGPUR",
      "city": "Pathrot",
      "state": "Maharashtra"
    },
    "444804": {
      "district": "NAGPUR",
      "city": "Purnanagar",
      "state": "Maharashtra"
    },
    "444911": {
      "district": "NAGPUR",
      "city": "Pusla",
      "state": "Maharashtra"
    },
    "444716": {
      "district": "NAGPUR",
      "city": "Rithpur",
      "state": "Maharashtra"
    },
    "444606": {
      "district": "NAGPUR",
      "city": "Rukharnini Nagar",
      "state": "Maharashtra"
    },
    "444607": {
      "district": "NAGPUR",
      "city": "Sai Nagar",
      "state": "Maharashtra"
    },
    "444813": {
      "district": "NAGPUR",
      "city": "Sernadoh",
      "state": "Maharashtra"
    },
    "444907": {
      "district": "NAGPUR",
      "city": "Shendurjana Ghat",
      "state": "Maharashtra"
    },
    "444921": {
      "district": "NAGPUR",
      "city": "Shirala",
      "state": "Maharashtra"
    },
    "444726": {
      "district": "NAGPUR",
      "city": "Shirkhed",
      "state": "Maharashtra"
    },
    "444603": {
      "district": "NAGPUR",
      "city": "Shivaj i Nagar",
      "state": "Maharashtra"
    },
    "444723": {
      "district": "NAGPUR",
      "city": "Sirajgaon Band",
      "state": "Maharashtra"
    },
    "444810": {
      "district": "NAGPUR",
      "city": "Sirajgaon Kasba",
      "state": "Maharashtra"
    },
    "444728": {
      "district": "NAGPUR",
      "city": "Surji (Anjangaon",
      "state": "Maharashtra"
    },

    "444710": {
      "district": "NAGPUR",
      "city": "Talegaon Dashasur",
      "state": "Maharashtra"
    },
    "444903": {
      "district": "NAGPUR",
      "city": "Tiosa",
      "state": "Maharashtra"
    },
    "444604": {
      "district": "NAGPUR",
      "city": "V.M.V",
      "state": "Maharashtra"
    },

    "444819": {
      "district": "NAGPUR",
      "city": "Wadnergangai",
      "state": "Maharashtra"
    },
    "444801": {
      "district": "NAGPUR",
      "city": "Walgaon",
      "state": "Maharashtra"
    },
    "444906": {
      "district": "NAGPUR",
      "city": "Warud",
      "state": "Maharashtra"
    },
    "444915": {
      "district": "NAGPUR",
      "city": "Yawali",
      "state": "Maharashtra"
    },
    "444706": {
      "district": "NAGPUR",
      "city": "Yeoda",
      "state": "Maharashtra"
    },
    "441904": {
      "district": "NAGPUR",
      "city": "Bhandara Town",
      "state": "Maharashtra"
    },
    "441805": {
      "district": "NAGPUR",
      "city": "Dighori",
      "state": "Maharashtra"
    },
    "441907": {
      "district": "NAGPUR",
      "city": "Gobarwahi",
      "state": "Maharashtra"
    },
    "441908": {
      "district": "NAGPUR",
      "city": "Kondha Kosara",
      "state": "Maharashtra"
    },
    "441803": {
      "district": "NAGPUR",
      "city": "Lakhandur",
      "state": "Maharashtra"
    },
    "441804": {
      "district": "NAGPUR",
      "city": "Lakhani",
      "state": "Maharashtra"
    },
    "441909": {
      "district": "NAGPUR",
      "city": "Mohadi",
      "state": "Maharashtra"
    },
    "441924": {
      "district": "NAGPUR",
      "city": "Pahela",
      "state": "Maharashtra"
    },
    "441811": {
      "district": "NAGPUR",
      "city": "Palandur",
      "state": "Maharashtra"
    },
    "441910": {
      "district": "NAGPUR",
      "city": "Pauni",
      "state": "Maharashtra"
    },
    "441809": {
      "district": "NAGPUR",
      "city": "Pohra",
      "state": "Maharashtra"
    },
    "441802": {
      "district": "NAGPUR",
      "city": "Sakoli",
      "state": "Maharashtra"
    },
    "441915": {
      "district": "NAGPUR",
      "city": "Sihora",
      "state": "Maharashtra"
    },
    "441912": {
      "district": "NAGPUR",
      "city": "Tumsar",
      "state": "Maharashtra"
    },
    "441913": {
      "district": "NAGPUR",
      "city": "Tumsar Road",
      "state": "Maharashtra"
    },
    "441902": {
      "district": "NAGPUR",
      "city": "Amgaon",
      "state": "Maharashtra"
    },
    "441701": {
      "district": "NAGPUR",
      "city": "Arjuni Morgaon",
      "state": "Maharashtra"
    },
    "441901": {
      "district": "NAGPUR",
      "city": "Deori",
      "state": "Maharashtra"
    },
    "441602": {
      "district": "NAGPUR",
      "city": "Gondia",
      "state": "Maharashtra"
    },
    "441614": {
      "district": "NAGPUR",
      "city": "Gondia City",
      "state": "Maharashtra"
    },
    "441801": {
      "district": "NAGPUR",
      "city": "Goregaon",
      "state": "Maharashtra"
    },
    "441702": {
      "district": "NAGPUR",
      "city": "Navegaon Bandh",
      "state": "Maharashtra"
    },
    "441807": {
      "district": "NAGPUR",
      "city": "Sadak Arjuni",
      "state": "Maharashtra"
    },
    "441916": {
      "district": "NAGPUR",
      "city": "Salekasa",
      "state": "Maharashtra"
    },
    "441806": {
      "district": "NAGPUR",
      "city": "Soundad",
      "state": "Maharashtra"
    },
    "441911": {
      "district": "NAGPUR",
      "city": "Tirora",
      "state": "Maharashtra"
    },
    "441903": {
      "district": "NAGPUR",
      "city": "Adyar",
      "state": "Maharashtra"
    },
    "441914": {
      "district": "NAGPUR",
      "city": "Andhalgaon",
      "state": "Maharashtra"
    },
    "441906": {
      "district": "NAGPUR",
      "city": "Bhandara 0.F",
      "state": "Maharashtra"
    },

    "441002": {
      "district": "NAGPUR",
      "city": "Bhivapur",
      "state": "Maharashtra"
    },
    "441301": {
      "district": "NAGPUR",
      "city": "Jalalkheda",
      "state": "Maharashtra"
    },
    "441501": {
      "district": "NAGPUR",
      "city": "Kalmeshwar",
      "state": "Maharashtra"
    },
    "441001": {
      "district": "NAGPUR",
      "city": "Kampthi",
      "state": "Maharashtra"
    },
    "441404": {
      "district": "NAGPUR",
      "city": "Kampthi Colliery",
      "state": "Maharashtra"
    },
    "441401": {
      "district": "NAGPUR",
      "city": "Kanhan Pipri",
      "state": "Maharashtra"
    },
    "441302": {
      "district": "NAGPUR",
      "city": "Katol",
      "state": "Maharashtra"
    },
    "441112": {
      "district": "NAGPUR",
      "city": "Kelod",
      "state": "Maharashtra"
    },
    "441101": {
      "district": "NAGPUR",
      "city": "Khapa",
      "state": "Maharashtra"
    },
    "441102": {
      "district": "NAGPUR",
      "city": "Khaperkheda",
      "state": "Maharashtra"
    },
    "441103": {
      "district": "NAGPUR",
      "city": "Kondhali",
      "state": "Maharashtra"
    },
    "441111": {
      "district": "NAGPUR",
      "city": "Koradi TPS",
      "state": "Maharashtra"
    },
    "441202": {
      "district": "NAGPUR",
      "city": "Kuhi",
      "state": "Maharashtra"
    },
    "441210": {
      "district": "NAGPUR",
      "city": "Mandhal",
      "state": "Maharashtra"
    },
    "441104": {
      "district": "NAGPUR",
      "city": "Mauda",
      "state": "Maharashtra"
    },
    "441502": {
      "district": "NAGPUR",
      "city": "Mohapa",
      "state": "Maharashtra"
    },
    "441303": {
      "district": "NAGPUR",
      "city": "Mowar",
      "state": "Maharashtra"
    },
    "441304": {
      "district": "NAGPUR",
      "city": "Narkher",
      "state": "Maharashtra"
    },
    "441305": {
      "district": "NAGPUR",
      "city": "Paradsinga",
      "state": "Maharashtra"
    },
    "441105": {
      "district": "NAGPUR",
      "city": "Parseoni",
      "state": "Maharashtra"
    },
    "441113": {
      "district": "NAGPUR",
      "city": "Patansawangi",
      "state": "Maharashtra"
    },
    "441106": {
      "district": "NAGPUR",
      "city": "Ramtek",
      "state": "Maharashtra"
    },
    "441107": {
      "district": "NAGPUR",
      "city": "Saoner",
      "state": "Maharashtra"
    },
    "441306": {
      "district": "NAGPUR",
      "city": "Sawargaon",
      "state": "Maharashtra"
    },
    "441109": {
      "district": "NAGPUR",
      "city": "Sillewada Project",
      "state": "Maharashtra"
    },
    "441214": {
      "district": "NAGPUR",
      "city": "Sirsi",
      "state": "Maharashtra"
    },
    "441203": {
      "district": "NAGPUR",
      "city": "Umrer",
      "state": "Maharashtra"
    },
    "441204": {
      "district": "NAGPUR",
      "city": "Umrer Project",
      "state": "Maharashtra"
    },
    "444301": {
      "district": "NAGPUR",
      "city": "Amdapur",
      "state": "Maharashtra"
    },
    "443305": {
      "district": "NAGPUR",
      "city": "Anzani Bk",
      "state": "Maharashtra"
    },
    "443209": {
      "district": "NAGPUR",
      "city": "Bibi",
      "state": "Maharashtra"
    },
    "443001": {
      "district": "NAGPUR",
      "city": "Buldana",
      "state": "Maharashtra"
    },
    "443401": {
      "district": "NAGPUR",
      "city": "Chandur Biswa",
      "state": "Maharashtra"
    },
    "443201": {
      "district": "NAGPUR",
      "city": "Chik",
      "state": "Maharashtra"
    },
    "443206": {
      "district": "NAGPUR",
      "city": "Deolgaon Maha",
      "state": "Maharashtra"
    },
    "443306": {
      "district": "NAGPUR",
      "city": "Deolgaon Mali",
      "state": "Maharashtra"
    },
    "443204": {
      "district": "NAGPUR",
      "city": "Deolgaon Raja",
      "state": "Maharashtra"
    },
    "443105": {
      "district": "NAGPUR",
      "city": "Deolghat",
      "state": "Maharashtra"
    },
    "443104": {
      "district": "NAGPUR",
      "city": "Dhamangaon Badhe",
      "state": "Maharashtra"
    },
    "443112": {
      "district": "NAGPUR",
      "city": "Dharamgaon",
      "state": "Maharashtra"
    },
    "443303": {
      "district": "NAGPUR",
      "city": "Dongaon",
      "state": "Maharashtra"
    },
    "443308": {
      "district": "NAGPUR",
      "city": "Dusarbid",
      "state": "Maharashtra"
    },
    "444312": {
      "district": "NAGPUR",
      "city": "GS.College Khamgaon",
      "state": "Maharashtra"
    },
    "443406": {
      "district": "NAGPUR",
      "city": "Jamod",
      "state": "Maharashtra"
    },
    "443304": {
      "district": "NAGPUR",
      "city": "Janephal",
      "state": "Maharashtra"
    },
    "443402": {
      "district": "NAGPUR",
      "city": "Jaogaon",
      "state": "Maharashtra"
    },
    "444303": {
      "district": "NAGPUR",
      "city": "Khamgaon",
      "state": "Maharashtra"
    },
    "443302": {
      "district": "NAGPUR",
      "city": "Lonar",
      "state": "Maharashtra"
    },
    "443101": {
      "district": "NAGPUR",
      "city": "Malkapur",
      "state": "Maharashtra"
    },
    "444304": {
      "district": "NAGPUR",
      "city": "Matargaon",
      "state": "Maharashtra"
    },
    "443301": {
      "district": "NAGPUR",
      "city": "Mehkar",
      "state": "Maharashtra"
    },
    "443103": {
      "district": "NAGPUR",
      "city": "Motala",
      "state": "Maharashtra"
    },
    "443404": {
      "district": "NAGPUR",
      "city": "Nandura",
      "state": "Maharashtra"
    },
    "444201": {
      "district": "NAGPUR",
      "city": "Paturda",
      "state": "Maharashtra"
    },
    "443403": {
      "district": "NAGPUR",
      "city": "Pimpalgaon  Kale",
      "state": "Maharashtra"
    },
    "443202": {
      "district": "NAGPUR",
      "city": "Savarkheda",
      "state": "Maharashtra"
    },
    "443203": {
      "district": "NAGPUR",
      "city": "Sindkhed Raja",
      "state": "Maharashtra"
    },
    "444204": {
      "district": "NAGPUR",
      "city": "Sonala",
      "state": "Maharashtra"
    },
    "444307": {
      "district": "NAGPUR",
      "city": "Sultapur",
      "state": "Maharashtra"
    },
    "443405": {
      "district": "NAGPUR",
      "city": "Wagner Bholji",
      "state": "Maharashtra"
    },
    "445109": {
      "district": "NAGPUR",
      "city": "Akola Bazar",
      "state": "Maharashtra"
    },
    "445103": {
      "district": "NAGPUR",
      "city": "Arni",
      "state": "Maharashtra"
    },
    "445101": {
      "district": "NAGPUR",
      "city": "Babulgaon",
      "state": "Maharashtra"
    },
    "445201": {
      "district": "NAGPUR",
      "city": "Bori Arab",
      "state": "Maharashtra"
    },
    "445202": {
      "district": "NAGPUR",
      "city": "Darwha",
      "state": "Maharashtra"
    },
    "445207": {
      "district": "NAGPUR",
      "city": "Dhanki",
      "state": "Maharashtra"
    },
    "445203": {
      "district": "NAGPUR",
      "city": "Digras",
      "state": "Maharashtra"
    },
    "445230": {
      "district": "NAGPUR",
      "city": "Fulsawangi",
      "state": "Maharashtra"
    },
    "445301": {
      "district": "NAGPUR",
      "city": "Ghatanji",
      "state": "Maharashtra"
    },
    "445209": {
      "district": "NAGPUR",
      "city": "Isapur",
      "state": "Maharashtra"
    },
    "445105": {
      "district": "NAGPUR",
      "city": "Jaola",
      "state": "Maharashtra"
    },
    "445304": {
      "district": "NAGPUR",
      "city": "Jatra Road Wani",
      "state": "Maharashtra"
    },
    "445401": {
      "district": "NAGPUR",
      "city": "Kalamb",
      "state": "Maharashtra"
    },
    "445210": {
      "district": "NAGPUR",
      "city": "Lohi",
      "state": "Maharashtra"
    },
    "445205": {
      "district": "NAGPUR",
      "city": "Mahagaon",
      "state": "Maharashtra"
    },
    "445110": {
      "district": "NAGPUR",
      "city": "Mahagaon (K",
      "state": "Maharashtra"
    },

    "445303": {
      "district": "NAGPUR",
      "city": "Maregaon Road",
      "state": "Maharashtra"
    },
    "445323": {
      "district": "NAGPUR",
      "city": "Mohada",
      "state": "Maharashtra"
    },
    "445211": {
      "district": "NAGPUR",
      "city": "Mulawa",
      "state": "Maharashtra"
    },
    "445102": {
      "district": "NAGPUR",
      "city": "Nerparsopa nt",
      "state": "Maharashtra"
    },
    "445302": {
      "district": "NAGPUR",
      "city": "Pandharkawada",
      "state": "Maharashtra"
    },
    "445306": {
      "district": "NAGPUR",
      "city": "Parag",
      "state": "Maharashtra"
    },
    "445305": {
      "district": "NAGPUR",
      "city": "Patanbori",
      "state": "Maharashtra"
    },
    "445206": {
      "district": "NAGPUR",
      "city": "Pusad",
      "state": "Maharashtra"
    },
    "445402": {
      "district": "NAGPUR",
      "city": "Ralegaon",
      "state": "Maharashtra"
    },
    "445106": {
      "district": "NAGPUR",
      "city": "Saoli Sadoba",
      "state": "Maharashtra"
    },
    "445307": {
      "district": "NAGPUR",
      "city": "Sindola Mines",
      "state": "Maharashtra"
    },
    "445215": {
      "district": "NAGPUR",
      "city": "Soot Girni Pusad",
      "state": "Maharashtra"
    },
    "445308": {
      "district": "NAGPUR",
      "city": "Wadki",
      "state": "Maharashtra"
    },
    "445001": {
      "district": "NAGPUR",
      "city": "Yeotmal",
      "state": "Maharashtra"
    },
    "422010": {
      "district": "NASHIK",
      "city": "Ambad A.S",
      "state": "Maharashtra"
    },
    "422012": {
      "district": "NASHIK",
      "city": "Ashok Nagar   Nashik",
      "state": "Maharashtra"
    },
    "422301": {
      "district": "NASHIK",
      "city": "B.S.Nagar",
      "state": "Maharashtra"
    },
    "422502": {
      "district": "NASHIK",
      "city": "Bhagur",
      "state": "Maharashtra"
    },
    "422201": {
      "district": "NASHIK",
      "city": "Chandori",
      "state": "Maharashtra"
    },
    "422009": {
      "district": "NASHIK",
      "city": "Cidco Colony Nashik",
      "state": "Maharashtra"
    },
    "422501": {
      "district": "NASHIK",
      "city": "Deolali  Af Stn",
      "state": "Maharashtra"
    },
    "422401": {
      "district": "NASHIK",
      "city": "Deolali I",
      "state": "Maharashtra"
    },
    "422202": {
      "district": "NASHIK",
      "city": "Dindori",
      "state": "Maharashtra"
    },
    "422011": {
      "district": "NASHIK",
      "city": "Dwarka Corner Nashik",
      "state": "Maharashtra"
    },
    "422006": {
      "district": "NASHIK",
      "city": "Gandhinagar  Nashik",
      "state": "Maharashtra"
    },
    "422402": {
      "district": "NASHIK",
      "city": "Ghoti",
      "state": "Maharashtra"
    },
    "422203": {
      "district": "NASHIK",
      "city": "Gimara",
      "state": "Maharashtra"
    },
    "422002": {
      "district": "NASHIK",
      "city": "Goley Colony",
      "state": "Maharashtra"
    },
    "422204": {
      "district": "NASHIK",
      "city": "Harsul",
      "state": "Maharashtra"
    },
    "422005": {
      "district": "NASHIK",
      "city": "Hpt College Nashik",
      "state": "Maharashtra"
    },
    "422403": {
      "district": "NASHIK",
      "city": "Igatpuri",
      "state": "Maharashtra"
    },
    "422007": {
      "district": "NASHIK",
      "city": "Indl Estate Nashik",
      "state": "Maharashtra"
    },
    "422113": {
      "district": "NASHIK",
      "city": "Industrial Estate Malegaon",
      "state": "Maharashtra"
    },
    "422112": {
      "district": "NASHIK",
      "city": "Industrial Estate Musalgaon",
      "state": "Maharashtra"
    },
    "422004": {
      "district": "NASHIK",
      "city": "Meri Colony  Nashik",
      "state": "Maharashtra"
    },
    "422606": {
      "district": "NASHIK",
      "city": "Nandur Shingote",
      "state": "Maharashtra"
    },
    "422001": {
      "district": "NASHIK",
      "city": "Nashik",
      "state": "Maharashtra"
    },
    "422101": {
      "district": "NASHIK",
      "city": "Nashik Road",
      "state": "Maharashtra"
    },
    "422206": {
      "district": "NASHIK",
      "city": "Ojhar",
      "state": "Maharashtra"
    },
    "422221": {
      "district": "NASHIK",
      "city": "Ojhar Airforce Station",
      "state": "Maharashtra"
    },
    "422207": {
      "district": "NASHIK",
      "city": "Ojhar Town Ship",
      "state": "Maharashtra"
    },
    "422003": {
      "district": "NASHIK",
      "city": "Panchavati Nashik",
      "state": "Maharashtra"
    },
    "422208": {
      "district": "NASHIK",
      "city": "Peint",
      "state": "Maharashtra"
    },
    "422013": {
      "district": "NASHIK",
      "city": "Sawarkar Nagar",
      "state": "Maharashtra"
    },
    "422210": {
      "district": "NASHIK",
      "city": "Saykheda",
      "state": "Maharashtra"
    },
    "422103": {
      "district": "NASHIK",
      "city": "Sinner",
      "state": "Maharashtra"
    },
    "422302": {
      "district": "NASHIK",
      "city": "Sukena",
      "state": "Maharashtra"
    },
    "422211": {
      "district": "NASHIK",
      "city": "Surgana",
      "state": "Maharashtra"
    },
    "422105": {
      "district": "NASHIK",
      "city": "T P Station Eklahare",
      "state": "Maharashtra"
    },
    "422212": {
      "district": "NASHIK",
      "city": "Trimbak",
      "state": "Maharashtra"
    },
    "422213": {
      "district": "NASHIK",
      "city": "Trimbak Vidya Mandir",
      "state": "Maharashtra"
    },
    "422008": {
      "district": "NASHIK",
      "city": "Trimurti Chowk   Nashik",
      "state": "Maharashtra"
    },
    "422214": {
      "district": "NASHIK",
      "city": "Vaitrna Nagar",
      "state": "Maharashtra"
    },
    "422215": {
      "district": "NASHIK",
      "city": "Vani",
      "state": "Maharashtra"
    },
    "422104": {
      "district": "NASHIK",
      "city": "Wavi",
      "state": "Maharashtra"
    },
    "422222": {
      "district": "NASHIK",
      "city": "Ycmou Nashik",
      "state": "Maharashtra"
    },
    "423502": {
      "district": "NASHIK",
      "city": "Abhona",
      "state": "Maharashtra"
    },
    "423402": {
      "district": "NASHIK",
      "city": "Andersul",
      "state": "Maharashtra"
    },
    "423101": {
      "district": "NASHIK",
      "city": "Chandwad",
      "state": "Maharashtra"
    },
    "423201": {
      "district": "NASHIK",
      "city": "Dabhadi",
      "state": "Maharashtra"
    },
    "423102": {
      "district": "NASHIK",
      "city": "Deola",
      "state": "Maharashtra"
    },
    "423202": {
      "district": "NASHIK",
      "city": "Gssk (Dabhadi",
      "state": "Maharashtra"
    },
    "423303": {
      "district": "NASHIK",
      "city": "Jaikheda",
      "state": "Maharashtra"
    },
    "422308": {
      "district": "NASHIK",
      "city": "Kakasaheb Nagar",
      "state": "Maharashtra"
    },
    "423501": {
      "district": "NASHIK",
      "city": "Kalwan",
      "state": "Maharashtra"
    },
    "422205": {
      "district": "NASHIK",
      "city": "Khedgaon",
      "state": "Maharashtra"
    },
    "423213": {
      "district": "NASHIK",
      "city": "Lakhmapur",
      "state": "Maharashtra"
    },
    "422306": {
      "district": "NASHIK",
      "city": "Lasalgaon",
      "state": "Maharashtra"
    },
    "423105": {
      "district": "NASHIK",
      "city": "Malegaon Camp",
      "state": "Maharashtra"
    },
    "423203": {
      "district": "NASHIK",
      "city": "Malegaon H",
      "state": "Maharashtra"
    },
    "423104": {
      "district": "NASHIK",
      "city": "Manmad",
      "state": "Maharashtra"
    },
    "423403": {
      "district": "NASHIK",
      "city": "Nagarsul",
      "state": "Maharashtra"
    },
    "423204": {
      "district": "NASHIK",
      "city": "Nampur",
      "state": "Maharashtra"
    },
    "423106": {
      "district": "NASHIK",
      "city": "Nandgaon",
      "state": "Maharashtra"
    },
    "424109": {
      "district": "NASHIK",
      "city": "Naydongri",
      "state": "Maharashtra"
    },
    "423212": {
      "district": "NASHIK",
      "city": "Nimgaon",
      "state": "Maharashtra"
    },
    "422303": {
      "district": "NASHIK",
      "city": "Niphad",
      "state": "Maharashtra"
    },
    "422209": {
      "district": "NASHIK",
      "city": "Pimpalgaon Baswant",
      "state": "Maharashtra"
    },
    "423108": {
      "district": "NASHIK",
      "city": "Rawalgaon",
      "state": "Maharashtra"
    },
    "423301": {
      "district": "NASHIK",
      "city": "Satana",
      "state": "Maharashtra"
    },
    "423208": {
      "district": "NASHIK",
      "city": "Saundana",
      "state": "Maharashtra"
    },
    "423302": {
      "district": "NASHIK",
      "city": "Taharabad",
      "state": "Maharashtra"
    },
    "422304": {
      "district": "NASHIK",
      "city": "Ugaon",
      "state": "Maharashtra"
    },
    "423110": {
      "district": "NASHIK",
      "city": "Umrana",
      "state": "Maharashtra"
    },
    "423117": {
      "district": "NASHIK",
      "city": "Vadalibhoi",
      "state": "Maharashtra"
    },
    "423111": {
      "district": "NASHIK",
      "city": "Vadner Bhairao",
      "state": "Maharashtra"
    },
    "423206": {
      "district": "NASHIK",
      "city": "Vadner Malegaon",
      "state": "Maharashtra"
    },
    "422305": {
      "district": "NASHIK",
      "city": "Vinchur",
      "state": "Maharashtra"
    },
    "423401": {
      "district": "NASHIK",
      "city": "Yeola",
      "state": "Maharashtra"
    },
    "423205": {
      "district": "NASHIK",
      "city": "Zodga",
      "state": "Maharashtra"
    },
    "403801": {
      "district": "PANAJI",
      "city": "A P Dabolim",
      "state": "Maharashtra"
    },
    "403521": {
      "district": "PANAJI",
      "city": "Alto-Porvorim",
      "state": "Maharashtra"
    },
    "403201": {
      "district": "PANAJI",
      "city": "Bambolim Camp",
      "state": "Maharashtra"
    },
    "403202": {
      "district": "PANAJI",
      "city": "Bambolim Complex",
      "state": "Maharashtra"
    },
    "403806": {
      "district": "PANAJI",
      "city": "Bogmalo",
      "state": "Maharashtra"
    },
    "403516": {
      "district": "PANAJI",
      "city": "Calangute",
      "state": "Maharashtra"
    },
    "403002": {
      "district": "PANAJI",
      "city": "Caranzalem",
      "state": "Maharashtra"
    },
    "403206": {
      "district": "PANAJI",
      "city": "Goa University",
      "state": "Maharashtra"
    },
    "403507": {
      "district": "PANAJI",
      "city": "Mapusa",
      "state": "Maharashtra"
    },
    "403803": {
      "district": "PANAJI",
      "city": "Mormugao",
      "state": "Maharashtra"
    },
    "403004": {
      "district": "PANAJI",
      "city": "NIO Donapaula",
      "state": "Maharashtra"
    },
    "403001": {
      "district": "PANAJI",
      "city": "Panaji",
      "state": "Maharashtra"
    },
    "403401": {
      "district": "PANAJI",
      "city": "Ponda",
      "state": "Maharashtra"
    },
    "403006": {
      "district": "PANAJI",
      "city": "Ribander",
      "state": "Maharashtra"
    },
    "403804": {
      "district": "PANAJI",
      "city": "Sada",
      "state": "Maharashtra"
    },
    "403005": {
      "district": "PANAJI",
      "city": "St.Cruz",
      "state": "Maharashtra"
    },
    "403802": {
      "district": "PANAJI",
      "city": "Vasco-Da-Gama",
      "state": "Maharashtra"
    },
    "403726": {
      "district": "PANAJI",
      "city": "Zuarinagar",
      "state": "Maharashtra"
    },
    "416614": {
      "district": "PANAJI",
      "city": "Achara",
      "state": "Maharashtra"
    },
    "416628": {
      "district": "PANAJI",
      "city": "Ambrad",
      "state": "Maharashtra"
    },
    "416613": {
      "district": "PANAJI",
      "city": "Devgad",
      "state": "Maharashtra"
    },
    "416632": {
      "district": "PANAJI",
      "city": "Jambhavde",
      "state": "Maharashtra"
    },
    "416612": {
      "district": "PANAJI",
      "city": "Jamsande",
      "state": "Maharashtra"
    },
    "416620": {
      "district": "PANAJI",
      "city": "Kalsuli",
      "state": "Maharashtra"
    },
    "416602": {
      "district": "PANAJI",
      "city": "Kankavli",
      "state": "Maharashtra"
    },
    "416703": {
      "district": "PANAJI",
      "city": "Kharepatan",
      "state": "Maharashtra"
    },
    "416811": {
      "district": "PANAJI",
      "city": "Phanasgaon",
      "state": "Maharashtra"
    },
    "416601": {
      "district": "PANAJI",
      "city": "Phondaghat",
      "state": "Maharashtra"
    },
    "416616": {
      "district": "PANAJI",
      "city": "Ramgad",
      "state": "Maharashtra"
    },
    "416609": {
      "district": "PANAJI",
      "city": "Sangve",
      "state": "Maharashtra"
    },
    "416610": {
      "district": "PANAJI",
      "city": "Shirgaon",
      "state": "Maharashtra"
    },
    "416611": {
      "district": "PANAJI",
      "city": "Talebazar",
      "state": "Maharashtra"
    },
    "416801": {
      "district": "PANAJI",
      "city": "Talera",
      "state": "Maharashtra"
    },
    "416810": {
      "district": "PANAJI",
      "city": "Vaibhavwadi",
      "state": "Maharashtra"
    },
    "416812": {
      "district": "PANAJI",
      "city": "C C Oros",
      "state": "Maharashtra"
    },
    "416525": {
      "district": "PANAJI",
      "city": "Dewoolwada Nerur",
      "state": "Maharashtra"
    },
    "416528": {
      "district": "PANAJI",
      "city": "I A Pinguli",
      "state": "Maharashtra"
    },
    "416521": {
      "district": "PANAJI",
      "city": "Kadaval",
      "state": "Maharashtra"
    },
    "416603": {
      "district": "PANAJI",
      "city": "Kasal",
      "state": "Maharashtra"
    },
    "416520": {
      "district": "PANAJI",
      "city": "Kudal",
      "state": "Maharashtra"
    },
    "416550": {
      "district": "PANAJI",
      "city": "Kudal A S",
      "state": "Maharashtra"
    },
    "416519": {
      "district": "PANAJI",
      "city": "Mangaon",
      "state": "Maharashtra"
    },
    "416523": {
      "district": "PANAJI",
      "city": "Parula",
      "state": "Maharashtra"
    },
    "416522": {
      "district": "PANAJI",
      "city": "Pat",
      "state": "Maharashtra"
    },
    "416516": {
      "district": "PANAJI",
      "city": "Vengurla",
      "state": "Maharashtra"
    },
    "416524": {
      "district": "PANAJI",
      "city": "Walawal",
      "state": "Maharashtra"
    },
    "416605": {
      "district": "PANAJI",
      "city": "Chowke",
      "state": "Maharashtra"
    },
    "416626": {
      "district": "PANAJI",
      "city": "Hadi",
      "state": "Maharashtra"
    },
    "416604": {
      "district": "PANAJI",
      "city": "Katta",
      "state": "Maharashtra"
    },
    "416606": {
      "district": "PANAJI",
      "city": "Malvan",
      "state": "Maharashtra"
    },
    "416608": {
      "district": "PANAJI",
      "city": "Masura",
      "state": "Maharashtra"
    },
    "416615": {
      "district": "PANAJI",
      "city": "Mithbav",
      "state": "Maharashtra"
    },
    "416623": {
      "district": "PANAJI",
      "city": "Mond",
      "state": "Maharashtra"
    },
    "416803": {
      "district": "PANAJI",
      "city": "Mutat",
      "state": "Maharashtra"
    },
    "416630": {
      "district": "PANAJI",
      "city": "Naringre",
      "state": "Maharashtra"
    },
    "416804": {
      "district": "PANAJI",
      "city": "Padel",
      "state": "Maharashtra"
    },
    "416534": {
      "district": "PANAJI",
      "city": "Sukalwadi",
      "state": "Maharashtra"
    },
    "416807": {
      "district": "PANAJI",
      "city": "Tirlot",
      "state": "Maharashtra"
    },
    "416806": {
      "district": "PANAJI",
      "city": "Vijaydurg",
      "state": "Maharashtra"
    },
    "416805": {
      "district": "PANAJI",
      "city": "Wada",
      "state": "Maharashtra"
    },
    "416401": {
      "district": "PANAJI",
      "city": "Arag",
      "state": "Maharashtra"
    },
    "416303": {
      "district": "PANAJI",
      "city": "Bhilwadi",
      "state": "Maharashtra"
    },
    "416402": {
      "district": "PANAJI",
      "city": "Daphalapur",
      "state": "Maharashtra"
    },
    "416403": {
      "district": "PANAJI",
      "city": "Dhalgaon",
      "state": "Maharashtra"
    },
    "416404": {
      "district": "PANAJI",
      "city": "Jat",
      "state": "Maharashtra"
    },
    "416405": {
      "district": "PANAJI",
      "city": "Kavathe Mahankal",
      "state": "Maharashtra"
    },
    "416407": {
      "district": "PANAJI",
      "city": "Malgaon",
      "state": "Maharashtra"
    },
    "416409": {
      "district": "PANAJI",
      "city": "Mhaisal",
      "state": "Maharashtra"
    },
    "416410": {
      "district": "PANAJI",
      "city": "Miraj",
      "state": "Maharashtra"
    },
    "416420": {
      "district": "PANAJI",
      "city": "Ni",
      "state": "Maharashtra"
    },
    "416411": {
      "district": "PANAJI",
      "city": "Ranjani",
      "state": "Maharashtra"
    },
    "416418": {
      "district": "PANAJI",
      "city": "Salgare",
      "state": "Maharashtra"
    },
    "416412": {
      "district": "PANAJI",
      "city": "Sankh",
      "state": "Maharashtra"
    },
    "416311": {
      "district": "PANAJI",
      "city": "Savlaj",
      "state": "Maharashtra"
    },
    "416419": {
      "district": "PANAJI",
      "city": "Shirdn",
      "state": "Maharashtra"
    },
    "416312": {
      "district": "PANAJI",
      "city": "Tasgaon",
      "state": "Maharashtra"
    },
    "416413": {
      "district": "PANAJI",
      "city": "Umadi",
      "state": "Maharashtra"
    },
    "416314": {
      "district": "PANAJI",
      "city": "Visapur",
      "state": "Maharashtra"
    },
    "416414": {
      "district": "PANAJI",
      "city": "Wanlesswadi",
      "state": "Maharashtra"
    },
    "415401": {
      "district": "PANAJI",
      "city": "Aitwade Bk",
      "state": "Maharashtra"
    },
    "416316": {
      "district": "PANAJI",
      "city": "Ankalkp",
      "state": "Maharashtra"
    },
    "416301": {
      "district": "PANAJI",
      "city": "Ashta",
      "state": "Maharashtra"
    },
    "415301": {
      "district": "PANAJI",
      "city": "Atpadi",
      "state": "Maharashtra"
    },
    "416302": {
      "district": "PANAJI",
      "city": "Bagani",
      "state": "Maharashtra"
    },
    "415302": {
      "district": "PANAJI",
      "city": "Bhavaninagar",
      "state": "Maharashtra"
    },
    "415402": {
      "district": "PANAJI",
      "city": "Bilashi",
      "state": "Maharashtra"
    },
    "415413": {
      "district": "PANAJI",
      "city": "Borgaon",
      "state": "Maharashtra"
    },
    "416304": {
      "district": "PANAJI",
      "city": "Budhagaon",
      "state": "Maharashtra"
    },
    "415412": {
      "district": "PANAJI",
      "city": "Chikurde",
      "state": "Maharashtra"
    },
    "415303": {
      "district": "PANAJI",
      "city": "Devrashtre",
      "state": "Maharashtra"
    },
    "415315": {
      "district": "PANAJI",
      "city": "Dighanchi",
      "state": "Maharashtra"
    },
    "416305": {
      "district": "PANAJI",
      "city": "Digraj Kasaba",
      "state": "Maharashtra"
    },
    "416315": {
      "district": "PANAJI",
      "city": "Dudhgaon",
      "state": "Maharashtra"
    },
    "415304": {
      "district": "PANAJI",
      "city": "Kadegaon",
      "state": "Maharashtra"
    },
    "415305": {
      "district": "PANAJI",
      "city": "Kadepur",
      "state": "Maharashtra"
    },
    "415403": {
      "district": "PANAJI",
      "city": "Kameri",
      "state": "Maharashtra"
    },
    "415306": {
      "district": "PANAJI",
      "city": "Kargani",
      "state": "Maharashtra"
    },
    "415404": {
      "district": "PANAJI",
      "city": "Kasegaon",
      "state": "Maharashtra"
    },
    "416306": {
      "district": "PANAJI",
      "city": "Kavalapur",
      "state": "Maharashtra"
    },
    "416307": {
      "district": "PANAJI",
      "city": "Kavathe Ekand",
      "state": "Maharashtra"
    },
    "416417": {
      "district": "PANAJI",
      "city": "Kavathe Piran",
      "state": "Maharashtra"
    },
    "415307": {
      "district": "PANAJI",
      "city": "Khanapur",
      "state": "Maharashtra"
    },
    "415308": {
      "district": "PANAJI",
      "city": "Kharsundi",
      "state": "Maharashtra"
    },
    "416308": {
      "district": "PANAJI",
      "city": "Kirloskarwadi",
      "state": "Maharashtra"
    },
    "415405": {
      "district": "PANAJI",
      "city": "Kokrud",
      "state": "Maharashtra"
    },
    "416309": {
      "district": "PANAJI",
      "city": "Kundal",
      "state": "Maharashtra"
    },
    "415309": {
      "district": "PANAJI",
      "city": "Lengare",
      "state": "Maharashtra"
    },
    "416406": {
      "district": "PANAJI",
      "city": "Madhavnagar",
      "state": "Maharashtra"
    },
    "415310": {
      "district": "PANAJI",
      "city": "Mahuli",
      "state": "Maharashtra"
    },
    "416408": {
      "district": "PANAJI",
      "city": "Manerjuri",
      "state": "Maharashtra"
    },
    "416436": {
      "district": "PANAJI",
      "city": "Midc Kupwad",
      "state": "Maharashtra"
    },
    "415406": {
      "district": "PANAJI",
      "city": "Nerla",
      "state": "Maharashtra"
    },
    "416310": {
      "district": "PANAJI",
      "city": "Palus",
      "state": "Maharashtra"
    },
    "415407": {
      "district": "PANAJI",
      "city": "Peth",
      "state": "Maharashtra"
    },
    "416416": {
      "district": "PANAJI",
      "city": "Sangli",
      "state": "Maharashtra"
    },
    "415408": {
      "district": "PANAJI",
      "city": "Shirala",
      "state": "Maharashtra"
    },
    "415414": {
      "district": "PANAJI",
      "city": "Ssk Sakharale",
      "state": "Maharashtra"
    },
    "415313": {
      "district": "PANAJI",
      "city": "Takari",
      "state": "Maharashtra"
    },
    "415409": {
      "district": "PANAJI",
      "city": "Uran Islampur",
      "state": "Maharashtra"
    },
    "415311": {
      "district": "PANAJI",
      "city": "Vita",
      "state": "Maharashtra"
    },
    "416415": {
      "district": "PANAJI",
      "city": "W College Sangli",
      "state": "Maharashtra"
    },
    "416313": {
      "district": "PANAJI",
      "city": "Walva",
      "state": "Maharashtra"
    },
    "415415": {
      "district": "PANAJI",
      "city": "Waranavti Vasahat",
      "state": "Maharashtra"
    },
    "415410": {
      "district": "PANAJI",
      "city": "Wategaon",
      "state": "Maharashtra"
    },
    "415411": {
      "district": "PANAJI",
      "city": "Yellur",
      "state": "Maharashtra"
    },
    "416513": {
      "district": "PANAJI",
      "city": "Aronda",
      "state": "Maharashtra"
    },
    "416511": {
      "district": "PANAJI",
      "city": "Banda",
      "state": "Maharashtra"
    },
    "416512": {
      "district": "PANAJI",
      "city": "Dodamarg",
      "state": "Maharashtra"
    },
    "416549": {
      "district": "PANAJI",
      "city": "K K Colony",
      "state": "Maharashtra"
    },
    "416531": {
      "district": "PANAJI",
      "city": "Kalmist",
      "state": "Maharashtra"
    },
    "416514": {
      "district": "PANAJI",
      "city": "Madura",
      "state": "Maharashtra"
    },
    "416517": {
      "district": "PANAJI",
      "city": "Redi",
      "state": "Maharashtra"
    },
    "416510": {
      "district": "PANAJI",
      "city": "Sawantwadi",
      "state": "Maharashtra"
    },
    "416518": {
      "district": "PANAJI",
      "city": "Shiroda",
      "state": "Maharashtra"
    },
    "416529": {
      "district": "PANAJI",
      "city": "Talavade",
      "state": "Maharashtra"
    },
    "416515": {
      "district": "PANAJI",
      "city": "Tulas",
      "state": "Maharashtra"
    },
    "411035": {
      "district": "PUNE",
      "city": "Akurdi",
      "state": "Maharashtra"
    },
    "411051": {
      "district": "PUNE",
      "city": "Anandnagar",
      "state": "Maharashtra"
    },
    "411021": {
      "district": "PUNE",
      "city": "Armament",
      "state": "Maharashtra"
    },
    "411027": {
      "district": "PUNE",
      "city": "Aundh Camp",
      "state": "Maharashtra"
    },
    "411026": {
      "district": "PUNE",
      "city": "Bsari I.E",
      "state": "Maharashtra"
    },
    "411039": {
      "district": "PUNE",
      "city": "Bsarigaon",
      "state": "Maharashtra"
    },
    "411031": {
      "district": "PUNE",
      "city": "C.M.E",
      "state": "Maharashtra"
    },
    "411019": {
      "district": "PUNE",
      "city": "Chinchwad East",
      "state": "Maharashtra"
    },
    "411033": {
      "district": "PUNE",
      "city": "Chinchwadgaon",
      "state": "Maharashtra"
    },
    "411012": {
      "district": "PUNE",
      "city": "Dadi",
      "state": "Maharashtra"
    },
    "411004": {
      "district": "PUNE",
      "city": "Deccan Gymkhana",
      "state": "Maharashtra"
    },
    "411043": {
      "district": "PUNE",
      "city": "Dhankawadi",
      "state": "Maharashtra"
    },
    "411015": {
      "district": "PUNE",
      "city": "Dighi Camp",
      "state": "Maharashtra"
    },
    "411014": {
      "district": "PUNE",
      "city": "Dunkirk Lines",
      "state": "Maharashtra"
    },
    "411038": {
      "district": "PUNE",
      "city": "Ex. Ser. Colony",
      "state": "Maharashtra"
    },
    "411007": {
      "district": "PUNE",
      "city": "Ganeshkhind",
      "state": "Maharashtra"
    },
    "411028": {
      "district": "PUNE",
      "city": "Hadapsar",
      "state": "Maharashtra"
    },
    "411013": {
      "district": "PUNE",
      "city": "Hadapsar I.E",
      "state": "Maharashtra"
    },
    "411032": {
      "district": "PUNE",
      "city": "l.A.F.Stn",
      "state": "Maharashtra"
    },
    "411025": {
      "district": "PUNE",
      "city": "lat",
      "state": "Maharashtra"
    },
    "411057": {
      "district": "PUNE",
      "city": "lnfotech Park",
      "state": "Maharashtra"
    },
    "411034": {
      "district": "PUNE",
      "city": "Kasarwadi",
      "state": "Maharashtra"
    },
    "411011": {
      "district": "PUNE",
      "city": "Kasha Peth",
      "state": "Maharashtra"
    },
    "411046": {
      "district": "PUNE",
      "city": "Katraj",
      "state": "Maharashtra"
    },
    "411024": {
      "district": "PUNE",
      "city": "Khadakwasla R S",
      "state": "Maharashtra"
    },
    "411003": {
      "district": "PUNE",
      "city": "Khadki",
      "state": "Maharashtra"
    },
    "411047": {
      "district": "PUNE",
      "city": "Logaon",
      "state": "Maharashtra"
    },
    "411037": {
      "district": "PUNE",
      "city": "Market Yard",
      "state": "Maharashtra"
    },
    "411016": {
      "district": "PUNE",
      "city": "Model Colony",
      "state": "Maharashtra"
    },
    "411060": {
      "district": "PUNE",
      "city": "Mohamadwadi",
      "state": "Maharashtra"
    },
    "411036": {
      "district": "PUNE",
      "city": "Mundhva AV",
      "state": "Maharashtra"
    },
    "411048": {
      "district": "PUNE",
      "city": "N.I.B.M",
      "state": "Maharashtra"
    },
    "411052": {
      "district": "PUNE",
      "city": "Navsahyadri",
      "state": "Maharashtra"
    },
    "411008": {
      "district": "PUNE",
      "city": "Nd",
      "state": "Maharashtra"
    },
    "411023": {
      "district": "PUNE",
      "city": "Nda Khadakwasla",
      "state": "Maharashtra"
    },
    "411045": {
      "district": "PUNE",
      "city": "Nia",
      "state": "Maharashtra"
    },
    "411044": {
      "district": "PUNE",
      "city": "P.C.N.T",
      "state": "Maharashtra"
    },
    "411009": {
      "district": "PUNE",
      "city": "Parvati",
      "state": "Maharashtra"
    },
    "411017": {
      "district": "PUNE",
      "city": "Pimpri Colony",
      "state": "Maharashtra"
    },
    "411018": {
      "district": "PUNE",
      "city": "Pimpri P.F",
      "state": "Maharashtra"
    },
    "411001": {
      "district": "PUNE",
      "city": "Pune",
      "state": "Maharashtra"
    },
    "411002": {
      "district": "PUNE",
      "city": "Pune City",
      "state": "Maharashtra"
    },
    "411020": {
      "district": "PUNE",
      "city": "Range Hills",
      "state": "Maharashtra"
    },
    "412114": {
      "district": "PUNE",
      "city": "Rupeenagar",
      "state": "Maharashtra"
    },
    "411030": {
      "district": "PUNE",
      "city": "S. P. College",
      "state": "Maharashtra"
    },
    "411022": {
      "district": "PUNE",
      "city": "S.R.P.F",
      "state": "Maharashtra"
    },
    "411005": {
      "district": "PUNE",
      "city": "Shivajinagar",
      "state": "Maharashtra"
    },
    "411042": {
      "district": "PUNE",
      "city": "Swargate",
      "state": "Maharashtra"
    },
    "411041": {
      "district": "PUNE",
      "city": "Vadgaon BK",
      "state": "Maharashtra"
    },
    "411040": {
      "district": "PUNE",
      "city": "Wanowrie",
      "state": "Maharashtra"
    },
    "411058": {
      "district": "PUNE",
      "city": "Warje",
      "state": "Maharashtra"
    },
    "411006": {
      "district": "PUNE",
      "city": "Yervada",
      "state": "Maharashtra"
    },
    "414001": {
      "district": "PUNE",
      "city": "Ahmednagar",
      "state": "Maharashtra"
    },
    "413102": {
      "district": "PUNE",
      "city": "Baramati",
      "state": "Maharashtra"
    },
    "412206": {
      "district": "PUNE",
      "city": "Bhor",
      "state": "Maharashtra"
    },
    "410501": {
      "district": "PUNE",
      "city": "Chakan",
      "state": "Maharashtra"
    },
    "413106": {
      "district": "PUNE",
      "city": "lndapur",
      "state": "Maharashtra"
    },
    "502": {
      "district": "PUNE",
      "city": "Junnar 410",
      "state": "Maharashtra"
    },
    "415110": {
      "district": "PUNE",
      "city": "Karad",
      "state": "Maharashtra"
    },
    "423601": {
      "district": "PUNE",
      "city": "Kopargaon",
      "state": "Maharashtra"
    },
    "410401": {
      "district": "PUNE",
      "city": "Lonavale",
      "state": "Maharashtra"
    },
    "412806": {
      "district": "PUNE",
      "city": "Mahabaleshwar",
      "state": "Maharashtra"
    },
    "413606": {
      "district": "PUNE",
      "city": "Omerga",
      "state": "Maharashtra"
    },
    "413603": {
      "district": "PUNE",
      "city": "Andora",
      "state": "Maharashtra"
    },
    "413506": {
      "district": "PUNE",
      "city": "Bembli",
      "state": "Maharashtra"
    },
    "413504": {
      "district": "PUNE",
      "city": "Bhoom",
      "state": "Maharashtra"
    },
    "413604": {
      "district": "PUNE",
      "city": "Dalimb (B",
      "state": "Maharashtra"
    },
    "413508": {
      "district": "PUNE",
      "city": "Dhoki",
      "state": "Maharashtra"
    },
    "413534": {
      "district": "PUNE",
      "city": "Ieet",
      "state": "Maharashtra"
    },
    "413507": {
      "district": "PUNE",
      "city": "Kalamb",
      "state": "Maharashtra"
    },
    "413624": {
      "district": "PUNE",
      "city": "Kati",
      "state": "Maharashtra"
    },
    "413608": {
      "district": "PUNE",
      "city": "Lohara",
      "state": "Maharashtra"
    },
    "413623": {
      "district": "PUNE",
      "city": "Malumbra",
      "state": "Maharashtra"
    },
    "413605": {
      "district": "PUNE",
      "city": "Murum",
      "state": "Maharashtra"
    },
    "413602": {
      "district": "PUNE",
      "city": "Naldurg",
      "state": "Maharashtra"
    },
    "413501": {
      "district": "PUNE",
      "city": "Osmanabad",
      "state": "Maharashtra"
    },
    "413502": {
      "district": "PUNE",
      "city": "Paranda",
      "state": "Maharashtra"
    },
    "413526": {
      "district": "PUNE",
      "city": "Pargaon",
      "state": "Maharashtra"
    },
    "413528": {
      "district": "PUNE",
      "city": "Shiradhon",
      "state": "Maharashtra"
    },
    "413505": {
      "district": "PUNE",
      "city": "Sonari",
      "state": "Maharashtra"
    },
    "413509": {
      "district": "PUNE",
      "city": "Ter",
      "state": "Maharashtra"
    },
    "413580": {
      "district": "PUNE",
      "city": "Ternanaar",
      "state": "Maharashtra"
    },
    "413503": {
      "district": "PUNE",
      "city": "Vashi",
      "state": "Maharashtra"
    },
    "413405": {
      "district": "PUNE",
      "city": "Yedshi",
      "state": "Maharashtra"
    },
    "413525": {
      "district": "PUNE",
      "city": "Yermala",
      "state": "Maharashtra"
    },
    "412805": {
      "district": "PUNE",
      "city": "Panchgani",
      "state": "Maharashtra"
    },
    "413304": {
      "district": "PUNE",
      "city": "Pandharpur",
      "state": "Maharashtra"
    },
    "410505": {
      "district": "PUNE",
      "city": "Rajgurunagar",
      "state": "Maharashtra"
    },
    "422605": {
      "district": "PUNE",
      "city": "Sangamner",
      "state": "Maharashtra"
    },
    "412301": {
      "district": "PUNE",
      "city": "Saswad",
      "state": "Maharashtra"
    },
    "415001": {
      "district": "PUNE",
      "city": "Satara",
      "state": "Maharashtra"
    },
    "412101": {
      "district": "PUNE",
      "city": "Dehu Road Cantt",
      "state": "Maharashtra"
    },
    "423109": {
      "district": "PUNE",
      "city": "Shirdi",
      "state": "Maharashtra"
    },
    "412411": {
      "district": "PUNE",
      "city": "Ala",
      "state": "Maharashtra"
    },
    "412105": {
      "district": "PUNE",
      "city": "Alandi Devachi",
      "state": "Maharashtra"
    },
    "412401": {
      "district": "PUNE",
      "city": "Arvi",
      "state": "Maharashtra"
    },
    "412406": {
      "district": "PUNE",
      "city": "Avsari Budruk",
      "state": "Maharashtra"
    },
    "412405": {
      "district": "PUNE",
      "city": "Avsari Khurd",
      "state": "Maharashtra"
    },
    "413103": {
      "district": "PUNE",
      "city": "Bawada",
      "state": "Maharashtra"
    },
    "412410": {
      "district": "PUNE",
      "city": "Belha",
      "state": "Maharashtra"
    },
    "413104": {
      "district": "PUNE",
      "city": "Bhavaninagar",
      "state": "Maharashtra"
    },
    "413130": {
      "district": "PUNE",
      "city": "Bhigwan",
      "state": "Maharashtra"
    },
    "413105": {
      "district": "PUNE",
      "city": "Bhigwan RS",
      "state": "Maharashtra"
    },
    "410513": {
      "district": "PUNE",
      "city": "Chas",
      "state": "Maharashtra"
    },
    "413801": {
      "district": "PUNE",
      "city": "Daund",
      "state": "Maharashtra"
    },
    "412109": {
      "district": "PUNE",
      "city": "Dehu",
      "state": "Maharashtra"
    },
    "410508": {
      "district": "PUNE",
      "city": "Dhamani",
      "state": "Maharashtra"
    },
    "410509": {
      "district": "PUNE",
      "city": "Dimbhe Colony",
      "state": "Maharashtra"
    },
    "412408": {
      "district": "PUNE",
      "city": "Gdegaon",
      "state": "Maharashtra"
    },
    "410402": {
      "district": "PUNE",
      "city": "Ins Shivaji Lonavala",
      "state": "Maharashtra"
    },
    "412303": {
      "district": "PUNE",
      "city": "Jejuri",
      "state": "Maharashtra"
    },
    "412404": {
      "district": "PUNE",
      "city": "Kadus",
      "state": "Maharashtra"
    },
    "410403": {
      "district": "PUNE",
      "city": "Kaivalyadharn  (Lonavala)",
      "state": "Maharashtra"
    },
    "410515": {
      "district": "PUNE",
      "city": "Kalamb",
      "state": "Maharashtra"
    },
    "412203": {
      "district": "PUNE",
      "city": "Kgaon",
      "state": "Maharashtra"
    },
    "412205": {
      "district": "PUNE",
      "city": "Kh Shivapur Baug",
      "state": "Maharashtra"
    },
    "410301": {
      "district": "PUNE",
      "city": "Khandala(Pune",
      "state": "Maharashtra"
    },
    "412216": {
      "district": "PUNE",
      "city": "Koregaon Bhirna",
      "state": "Maharashtra"
    },
    "410510": {
      "district": "PUNE",
      "city": "Loni Dhamni",
      "state": "Maharashtra"
    },
    "412201": {
      "district": "PUNE",
      "city": "Lonikalbr",
      "state": "Maharashtra"
    },
    "412219": {
      "district": "PUNE",
      "city": "Madhukarnagar Patas",
      "state": "Maharashtra"
    },
    "413115": {
      "district": "PUNE",
      "city": "Malegaon Bk",
      "state": "Maharashtra"
    },
    "412218": {
      "district": "PUNE",
      "city": "Malthan",
      "state": "Maharashtra"
    },
    "410503": {
      "district": "PUNE",
      "city": "Manchar",
      "state": "Maharashtra"
    },
    "412307": {
      "district": "PUNE",
      "city": "Manjari Farm",
      "state": "Maharashtra"
    },
    "412306": {
      "district": "PUNE",
      "city": "Meshwarnagar",
      "state": "Maharashtra"
    },
    "413133": {
      "district": "PUNE",
      "city": "Midc Baramati",
      "state": "Maharashtra"
    },
    "413802": {
      "district": "PUNE",
      "city": "Midc Kurkumbh",
      "state": "Maharashtra"
    },
    "412220": {
      "district": "PUNE",
      "city": "Midc Ranjangaon Ganapati",
      "state": "Maharashtra"
    },
    "412304": {
      "district": "PUNE",
      "city": "Morgaon",
      "state": "Maharashtra"
    },
    "410504": {
      "district": "PUNE",
      "city": "Narayanga on",
      "state": "Maharashtra"
    },
    "412213": {
      "district": "PUNE",
      "city": "Nasrapur",
      "state": "Maharashtra"
    },
    "412211": {
      "district": "PUNE",
      "city": "Nhavare",
      "state": "Maharashtra"
    },
    "413120": {
      "district": "PUNE",
      "city": "Nimgaon Ketki",
      "state": "Maharashtra"
    },
    "412409": {
      "district": "PUNE",
      "city": "Otur",
      "state": "Maharashtra"
    },
    "412403": {
      "district": "PUNE",
      "city": "Pabal",
      "state": "Maharashtra"
    },
    "413132": {
      "district": "PUNE",
      "city": "Palasdeo",
      "state": "Maharashtra"
    },
    "413110": {
      "district": "PUNE",
      "city": "Pandare",
      "state": "Maharashtra"
    },
    "412107": {
      "district": "PUNE",
      "city": "Panshet",
      "state": "Maharashtra"
    },
    "412311": {
      "district": "PUNE",
      "city": "Parinche",
      "state": "Maharashtra"
    },
    "412108": {
      "district": "PUNE",
      "city": "Paud",
      "state": "Maharashtra"
    },
    "410512": {
      "district": "PUNE",
      "city": "Peth",
      "state": "Maharashtra"
    },
    "412308": {
      "district": "PUNE",
      "city": "Phursungi",
      "state": "Maharashtra"
    },
    "412412": {
      "district": "PUNE",
      "city": "Pimpalwandi",
      "state": "Maharashtra"
    },
    "410302": {
      "district": "PUNE",
      "city": "R.P.T.S. Khandala",
      "state": "Maharashtra"
    },
    "412104": {
      "district": "PUNE",
      "city": "Rajewadi",
      "state": "Maharashtra"
    },
    "412209": {
      "district": "PUNE",
      "city": "Ranjangaon Ganapati",
      "state": "Maharashtra"
    },
    "410516": {
      "district": "PUNE",
      "city": "Shinoli",
      "state": "Maharashtra"
    },
    "410511": {
      "district": "PUNE",
      "city": "Shiroli Bk",
      "state": "Maharashtra"
    },
    "412210": {
      "district": "PUNE",
      "city": "Shirur",
      "state": "Maharashtra"
    },
    "413116": {
      "district": "PUNE",
      "city": "Shivnagar",
      "state": "Maharashtra"
    },
    "412204": {
      "district": "PUNE",
      "city": "Supa",
      "state": "Maharashtra"
    },
    "410506": {
      "district": "PUNE",
      "city": "Talegaon Dabhade",
      "state": "Maharashtra"
    },
    "412208": {
      "district": "PUNE",
      "city": "Talegaon Dhamdhere",
      "state": "Maharashtra"
    },
    "410507": {
      "district": "PUNE",
      "city": "Talegaon General Spital",
      "state": "Maharashtra"
    },
    "412110": {
      "district": "PUNE",
      "city": "Theur",
      "state": "Maharashtra"
    },
    "412202": {
      "district": "PUNE",
      "city": "Uruli Kanchan",
      "state": "Maharashtra"
    },
    "412402": {
      "district": "PUNE",
      "city": "Vada (Pune",
      "state": "Maharashtra"
    },
    "412103": {
      "district": "PUNE",
      "city": "Vadgaon Nimbalkar",
      "state": "Maharashtra"
    },
    "412207": {
      "district": "PUNE",
      "city": "Vagli",
      "state": "Maharashtra"
    },
    "412305": {
      "district": "PUNE",
      "city": "Valha",
      "state": "Maharashtra"
    },
    "412215": {
      "district": "PUNE",
      "city": "Varand",
      "state": "Maharashtra"
    },
    "412312": {
      "district": "PUNE",
      "city": "Veer",
      "state": "Maharashtra"
    },
    "412212": {
      "district": "PUNE",
      "city": "Velhe",
      "state": "Maharashtra"
    },
    "413114": {
      "district": "PUNE",
      "city": "Walchandnagar",
      "state": "Maharashtra"
    },
    "412214": {
      "district": "PUNE",
      "city": "Yavat",
      "state": "Maharashtra"
    },
    "413709": {
      "district": "PUNE",
      "city": "Shrirampur",
      "state": "Maharashtra"
    },
    "413001": {
      "district": "PUNE",
      "city": "Solapur",
      "state": "Maharashtra"
    },
    "413601": {
      "district": "PUNE",
      "city": "Tuljapur",
      "state": "Maharashtra"
    },
    "106": {
      "district": "PUNE",
      "city": "Vadgaon 412",
      "state": "Maharashtra"
    },
    "400601": {
      "district": "THANE",
      "city": "Thane",
      "state": "Maharashtra"
    },
    "400610": {
      "district": "THANE",
      "city": "Apna Bazar",
      "state": "Maharashtra"
    },
    "400608": {
      "district": "THANE",
      "city": "Balkum",
      "state": "Maharashtra"
    },
    "400606": {
      "district": "THANE",
      "city": "Jekegram",
      "state": "Maharashtra"
    },
    "400605": {
      "district": "THANE",
      "city": "Kalwa",
      "state": "Maharashtra"
    },
    "400612": {
      "district": "THANE",
      "city": "Mumbra",
      "state": "Maharashtra"
    },
    "400602": {
      "district": "THANE",
      "city": "Naupada",
      "state": "Maharashtra"
    },
    "400607": {
      "district": "THANE",
      "city": "Sandozbaugh",
      "state": "Maharashtra"
    },
    "400603": {
      "district": "THANE",
      "city": "Thane East",
      "state": "Maharashtra"
    },
    "421201": {
      "district": "THANE",
      "city": "Tilaknagar",
      "state": "Maharashtra"
    },
    "421202": {
      "district": "THANE",
      "city": "Vishnunagar",
      "state": "Maharashtra"
    },
    "400604": {
      "district": "THANE",
      "city": "Wagle Estate",
      "state": "Maharashtra"
    },
    "403601": {
      "district": "VASCO DA GAMA",
      "city": "Margao",
      "state": "Maharashtra"
    },
    "400710": {
      "district": "VASHI NSPCC",
      "city": "Millenium Business Park",
      "state": "Maharashtra"
    },
    "400705": {
      "district": "VASHI NSPCC",
      "city": "Sanpada",
      "state": "Maharashtra"
    },
    "400703": {
      "district": "VASHI NSPCC",
      "city": "Vashi",
      "state": "Maharashtra"
    },
    "442304": {
      "district": "WARDHA",
      "city": "Allipur",
      "state": "Maharashtra"
    },
    "442201": {
      "district": "WARDHA",
      "city": "Arvi",
      "state": "Maharashtra"
    },
    "442202": {
      "district": "WARDHA",
      "city": "Ashti",
      "state": "Maharashtra"
    },
    "442001": {
      "district": "WARDHA",
      "city": "Audyogik Shetra Wardha",
      "state": "Maharashtra"
    },
    "442101": {
      "district": "WARDHA",
      "city": "Deoli",
      "state": "Maharashtra"
    },
    "442301": {
      "district": "WARDHA",
      "city": "Hinganghat",
      "state": "Maharashtra"
    },
    "442203": {
      "district": "WARDHA",
      "city": "Karanja",
      "state": "Maharashtra"
    },
    "442106": {
      "district": "WARDHA",
      "city": "Kharangana",
      "state": "Maharashtra"
    },
    "442306": {
      "district": "WARDHA",
      "city": "Nachangaon",
      "state": "Maharashtra"
    },
    "442111": {
      "district": "WARDHA",
      "city": "Pavnar",
      "state": "Maharashtra"
    },
    "442302": {
      "district": "WARDHA",
      "city": "Pulgaon",
      "state": "Maharashtra"
    },
    "442303": {
      "district": "WARDHA",
      "city": "Pulgaon Camp",
      "state": "Maharashtra"
    },
    "442305": {
      "district": "WARDHA",
      "city": "Samudrapur",
      "state": "Maharashtra"
    },
    "442104": {
      "district": "WARDHA",
      "city": "Seloo",
      "state": "Maharashtra"
    },
    "442102": {
      "district": "WARDHA",
      "city": "Sevagram",
      "state": "Maharashtra"
    },
    "442105": {
      "district": "WARDHA",
      "city": "Sindhi Shahar",
      "state": "Maharashtra"
    },
    "442307": {
      "district": "WARDHA",
      "city": "Wadner",
      "state": "Maharashtra"
    },
    "442605": {
      "district": "WARDHA",
      "city": "Gadchiroli",
      "state": "Maharashtra"
    }
  }
  addressDetails: boolean;
  cartDetails: boolean;
  @HostListener('document:click', ['$event']) clickout(event) {
    this.isSearchSuggestion = false;
  }


  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public sharedService: SharedServiceService,
  ) {
    // this.searchForTheCustomer();
    var currentDate = new Date()
    this.currentYear = currentDate.getFullYear();
    this.minDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
  }

  get a() { return this.addAddressForm.controls; }
  get b() { return this.createNewUserForm.controls; }
  get c() { return this.createNewUserFormAfterVerify.controls; }

  // getAddress() {

  // }
  dateFilter = (d: Date) => {
    var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
    var abc = date.toString();
    if (typeof (this.objectNew[d.getMonth() + 1]) !== "undefined") {
      return this.objectNew[d.getMonth() + 1].indexOf(date.toString()) != -1;
    } else {
      return false;
    }
  };

  noDontCreate() {
    this.showThisUserNotAvailable = false;
    $('#searching_customer_details').val("");
    document.getElementById('searching_customer_details').removeAttribute('readonly');
  }
  generateOTPForverify() {
    this.addnewUserSubmitted = true;
    this.loader = true;
    if (this.createNewUserForm.invalid) {
      this.loader = false;
      return
    }
    console.log(this.createNewUserForm.value);
    var req = {
      "param": {
        "phone": this.b.phone.value
      }
    }
    console.log(req);
    this.sharedService.userCreationGetOTP(req).subscribe(getOtpres => {
      console.log(getOtpres);
      this.sentOtp = getOtpres;
      if (this.sentOtp[0].status === true) {
        this.loader = false;
        this.showMsgOtpsentsuccess = true;
        $('#verifyOTP_id').css("display", "block");
        $('#generateOTP_id').css("display", "none");
      } else {
        this.showMsgOtpsentsuccess = false;
        this.loader = false;
        $.notify({
          icon: "add_alert",
          message: this.sentOtp[0].message
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
      }
    }, err => {
      this.loader = false;
      this.showMsgOtpsentsuccess = false;
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
  createUserVerifyOTP() {
    this.addnewUserSubmittedAfterVerify = true;
    this.loader = true;
    if (this.createNewUserFormAfterVerify.invalid) {
      this.loader = false;
      return
    }
    console.log(this.createNewUserFormAfterVerify.value);
    console.log(this.createNewUserForm.value);
    var reqBody = {
      "param": {
        "firstname": this.b.firstName.value,
        "lastname": this.b.lastName.value,
        "email": this.b.email.value,
        "phone": this.b.phone.value,
        "password": this.c.password.value,
        "otp": this.c.otp.value,
        "point_of_registration": "customer_care"
      }
    }
    console.log(reqBody);
    this.sharedService.userCreationVerifyOTP(reqBody).subscribe(verifyOTPRES => {
      console.log(verifyOTPRES);
      this.VerifyOTPFinalRES = verifyOTPRES;
      if (this.VerifyOTPFinalRES[0].status === true) {
        this.showOTPInvalid = true;
        $("#addNewUser").modal("hide");
        this.showThisUserNotAvailable = false;
        this.createNewUserForm.reset();
        this.addnewUserSubmitted = false;
        this.createNewUserFormAfterVerify.reset();
        this.addnewUserSubmittedAfterVerify = false;
        // $('#searching_customer_details').val(this.b.phone.value);
        // this.searchForTheCustomer();
        console.log(this.VerifyOTPFinalRES[0].data.email);
        console.log(this.VerifyOTPFinalRES[0].data.token);
        var useThisToken = "Bearer" + ' ' + this.VerifyOTPFinalRES[0].data.token;
        localStorage.setItem('token', useThisToken);
        localStorage.setItem('email', this.VerifyOTPFinalRES[0].data.email);
        // this.getCart();
        this.sharedService.GetCustomerDetails(this.inputReq).subscribe(custerRes => {
          console.log(custerRes);
          this.finalCusterMerSearchRes = custerRes[0];
          if (this.finalCusterMerSearchRes.status === true) {
            this.showThisOnlySuccess = true;
            this.showThisUserNotAvailable = false;
            var Settoken = "Bearer" + ' ' + this.finalCusterMerSearchRes.token;
            console.log(Settoken);
            localStorage.setItem('token', Settoken);
            localStorage.setItem('email', this.finalCusterMerSearchRes.email);
            // this.getCart();
            // this.loader = true;
            this.sharedService.getCustomerAddress().subscribe(res => {
              console.log(res);
              if (res === null) {
                this.addressList = [];
                this.showThisOnlyAddressSuccess = true;
                this.showThisSlotSelection = true;
                this.showNewAddAddress = true;
                this.addressDetails = true;
                // $('#checkout_perpos').css("display", "none");
                this.loader = false;
              } else {
                this.addressList = res[0].addresses;
                console.log(this.addressList);
                this.showThisOnlyAddressSuccess = true;
                this.showThisSlotSelection = true;
                this.showNewAddAddress = true;
                this.addressDetails = true;
                // $('#checkout_perpos').css("display", "none");
                this.loader = false;
              }
            }, err => {
              console.log(err);
              $('#checkout_perpos').css("display", "none");
              this.loader = false;
              this.showThisSlotSelection = false;
              this.showThisOnlyAddressSuccess = false;
              this.addressList = [];
              this.showNewAddAddress = true;
              this.addressDetails = true;
              this.loader = false;
            });
          } else {
            this.loader = false;
            this.showThisOnlySuccess = false;
            this.showThisUserNotAvailable = true;
            // $.notify({
            //   icon: "add_alert",
            //   message: this.finalCusterMerSearchRes.message
            // }, {
            //   type: 'info',
            //   timer: 1000,
            //   placement: {
            //     from: 'top',
            //     align: 'center'
            //   }
            // });
          }
        }, err => {
          console.log(err);
          this.loader = false;
        });
        $.notify({
          icon: "add_alert",
          message: this.VerifyOTPFinalRES[0].message
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
        this.showOTPInvalid = true;
        this.msg = this.VerifyOTPFinalRES[0].message;
        this.loader = false;
      }
    }, err => {
      this.loader = false;
      $("#addNewUser").modal("hide");
      this.createNewUserForm.reset();
      this.addnewUserSubmitted = false;
      this.createNewUserFormAfterVerify.reset();
      this.addnewUserSubmittedAfterVerify = false;
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
  onResetUserCreation() {
    $('#verifyOTP_id').css("display", "none");
    $('#generateOTP_id').css("display", "block");
    this.createNewUserForm.reset();
    this.addnewUserSubmitted = false;
    this.createNewUserFormAfterVerify.reset();
    this.addnewUserSubmittedAfterVerify = false;
    this.showOTPInvalid = false;
    this.showMsgOtpsentsuccess = false;
  }
  closeGeneratOTPPart() {
    $("#addNewUser").modal("hide");
    this.createNewUserForm.reset();
    this.addnewUserSubmitted = false;
    this.createNewUserFormAfterVerify.reset();
    this.addnewUserSubmittedAfterVerify = false;
    this.showOTPInvalid = false;
    this.showMsgOtpsentsuccess = false;
  }
  createUserVerifyOTPClear() {
    $('#verifyOTP_id').css("display", "none");
    $('#generateOTP_id').css("display", "block");
    this.createNewUserFormAfterVerify.reset();
    this.addnewUserSubmittedAfterVerify = false;
    this.showOTPInvalid = false;
  }
  // editAddressFormData(firstname, lastname, mobile, line1, street, city, state, country, pincode, addressId) {
  //   this.addAddressForm.get('firstName').setValue(firstname);
  //   this.addAddressForm.get('lastName').setValue(lastname);
  //   this.addAddressForm.get('phoneNumber').setValue(mobile);
  //   this.addAddressForm.get('line1').setValue(line1);
  //   this.addAddressForm.get('street').setValue(street);
  //   this.addAddressForm.get('city').setValue(city);
  //   this.addAddressForm.get('state').setValue(state);
  //   this.addAddressForm.get('country').setValue(country);
  //   this.addAddressForm.get('pincode').setValue(pincode);
  //   this.editAddressId = addressId;
  // }
  // editAddress() {
  //   this.addressSubmitted = true;

  //   let requestBody = {
  //     "first_name": this.a.firstName.value,
  //     "last_name": this.a.lastName.value,
  //     "email": localStorage.getItem('email'),
  //     "mobile": this.a.phoneNumber.value,
  //     "line_1": this.a.line1.value,
  //     "street": this.a.street.value,
  //     "city": this.a.city.value,
  //     "state": this.a.state.value,
  //     "country": this.a.country.value,
  //     "is_billing": "True",
  //     "is_shipping": "True",
  //     "pincode": this.a.pincode.value,
  //     "is_default": 'False'
  //   }
  //   console.log(requestBody);
  //   console.log(this.editAddressId);

  //   this.sharedService.updateCustAddress(this.editAddressId, requestBody).subscribe(customerUpdatedAddressres => {
  //     console.log(customerUpdatedAddressres);
  //     this.updatedCustomerAddressFinalRES = customerUpdatedAddressres;
  //     document.getElementById("addAddressClose").click();
  //     this.searchForTheCustomer();
  //     this.navigateCheckoutAddress();
  //     this.addressSubmitted = false;

  //     this.loader = false;
  //     $.notify({
  //       icon: "add_alert",
  //       message: this.updatedCustomerAddressFinalRES.message
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
  //     this.loader = false;
  //     $.notify({
  //       icon: "add_alert",
  //       message: err.error.error_desc
  //     }, {
  //       type: 'info',
  //       timer: 1000,
  //       placement: {
  //         from: 'top',
  //         align: 'center'
  //       }
  //     });
  //   });

  // }
  // addAddress() {
  //   this.loader = true;
  //   this.addressSubmitted = true;
  //   if (this.addAddressForm.invalid) {
  //     this.loader = false;
  //     return
  //   }
  //   let requestBody = {
  //     "first_name": this.a.firstName.value,
  //     "last_name": this.a.lastName.value,
  //     "email": localStorage.getItem('email'),
  //     "mobile": this.a.phoneNumber.value,
  //     "line_1": this.a.line1.value,
  //     "street": this.a.street.value,
  //     "city": this.a.city.value,
  //     "state": this.a.state.value,
  //     "country": this.a.country.value,
  //     "is_billing": "False",
  //     "is_shipping": "True",
  //     "pincode": this.a.pincode.value,
  //     "is_default": this.a.defaultAddress.value,
  //     "latitude": this.a.latitude.value,
  //     "longitude": this.a.longitude.value,
  //     "landmark": this.a.landmark.value
  //   }
  //   console.log(requestBody);
  //   console.log(this.a.defaultAddress.value);

  //   this.sharedService.addNewAddress(requestBody).subscribe(res => {
  //     console.log(res);
  //     this.AddressAddedRes = res;
  //     document.getElementById("addAddressClose").click();
  //     this.searchForTheCustomer();
  //     this.navigateCheckoutAddress();
  //     this.addressSubmitted = false;
  //     this.loader = false;
  //     $.notify({
  //       icon: "add_alert",
  //       message: this.AddressAddedRes.message
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
  //     this.loader = false;
  //     $.notify({
  //       icon: "add_alert",
  //       message: err.error.error_desc
  //     }, {
  //       type: 'info',
  //       timer: 1000,
  //       placement: {
  //         from: 'top',
  //         align: 'center'
  //       }
  //     });
  //   });
  // }



  editAddressFormData(firstname, lastname, mobile, line1, street, city, state, country, pincode, addressId, landMark, lat, long) {
    this.addAddressForm.get('firstName').setValue(firstname);
    this.addAddressForm.get('lastName').setValue(lastname);
    this.addAddressForm.get('phoneNumber').setValue(mobile);
    this.addAddressForm.get('line1').setValue(line1);
    this.addAddressForm.get('street').setValue(street);
    this.addAddressForm.get('city').setValue(city);
    this.addAddressForm.get('state').setValue(state);
    this.addAddressForm.get('country').setValue(country);
    this.addAddressForm.get('pincode').setValue(pincode);
    this.addAddressForm.get('landmark').setValue(landMark);
    this.addAddressForm.get('latitude').setValue(lat);
    this.addAddressForm.get('longitude').setValue(long);
    this.editAddressId = addressId;
    console.log(lat);
    console.log(long);
  }
  addAddress() {
    this.loader = true;
    this.addressSubmitted = true;
    if (this.addAddressForm.invalid) {
      this.loader = false;
      return
    }
    if (this.a.landmarkPincode.value && this.a.pincode.value != this.a.landmarkPincode.value) {
      this.showThisForLandmark = true;
      this.loader = false;
      return
    }
    let requestBody = {
      "first_name": this.a.firstName.value,
      "last_name": this.a.lastName.value,
      "email": localStorage.getItem('email'),
      "mobile": this.a.phoneNumber.value,
      "line_1": this.a.line1.value,
      "street": this.a.street.value,
      "city": this.a.city.value,
      "state": this.a.state.value,
      "country": this.a.country.value,
      "is_billing": "True",
      "is_shipping": "True",
      "pincode": this.a.pincode.value,
      "is_default": null,
      "latitude": this.a.latitude.value,
      "longitude": this.a.longitude.value,
      "landmark": this.a.landmark.value,
    }
    console.log(requestBody);
    this.sharedService.addNewAddress(requestBody).subscribe(res => {
      console.log(res);
      this.AddressAddedRes = res;
      document.getElementById("addAddressClose").click();
      $('#searchTextAddressField').val("");
      this.addAddressForm.reset();
      this.searchForTheCustomer();
      this.addressSubmitted = false;
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.AddressAddedRes.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.cartDetails = false;
      this.proceesdNext = false;
      this.proceedToSelectPayment = false;
      $('#hide_this_proceed').css("display", "block");
    }, err => {
      console.log(err);
      this.cartDetails = false;
      this.proceesdNext = false;
      this.proceedToSelectPayment = false;
      $('#hide_this_proceed').css("display", "block");
      this.loader = false;
      document.getElementById("addAddressClose").click();
      $('#searchTextAddressField').val("");
      this.addAddressForm.reset();
      this.addressSubmitted = false;
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
  editAddress() {
    this.addressSubmitted = true;
    this.loader = true;
    if (this.addAddressForm.invalid) {
      this.loader = false;
      return
    }
    if (this.a.landmarkPincode.value && this.a.pincode.value != this.a.landmarkPincode.value) {

      this.showThisForLandmark = true;
      this.loader = false;
      return
    }
    let requestBodyE = {
      "first_name": this.a.firstName.value,
      "last_name": this.a.lastName.value,
      "email": localStorage.getItem('email'),
      "mobile": this.a.phoneNumber.value,
      "line_1": this.a.line1.value,
      "street": this.a.street.value,
      "city": this.a.city.value,
      "state": this.a.state.value,
      "country": this.a.country.value,
      "is_billing": "True",
      "is_shipping": "True",
      "pincode": this.a.pincode.value,
      "is_default": null,
      "latitude": this.a.latitude.value,
      "longitude": this.a.longitude.value,
      "landmark": this.a.landmark.value
    }
    console.log(requestBodyE);
    this.sharedService.updateCustAddress(this.editAddressId, requestBodyE).subscribe(customerUpdatedAddressres => {
      console.log(customerUpdatedAddressres);
      this.updatedCustomerAddressFinalRES = customerUpdatedAddressres;
      document.getElementById("addAddressClose").click();
      this.searchForTheCustomer();
      this.addressSubmitted = false;
      $('#searchTextAddressField').val("");
      this.addAddressForm.reset();
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.updatedCustomerAddressFinalRES.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.cartDetails = false;
      this.proceesdNext = false;
      this.proceedToSelectPayment = false;
      $('#hide_this_proceed').css("display", "block");
    }, err => {
      console.log(err);
      this.cartDetails = false;
      this.proceesdNext = false;
      this.proceedToSelectPayment = false;
      $('#hide_this_proceed').css("display", "block");
      this.loader = false;
      document.getElementById("addAddressClose").click();
      $('#searchTextAddressField').val("");
      this.addAddressForm.reset();
      this.addressSubmitted = false;
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

  deleteAddress(addressId) {
    console.log(addressId);
    this.loader = true;
    this.sharedService.deleteAddress(addressId).subscribe(res => {
      console.log(res);
      this.AddressDeleteRes = res;
      // this.navigateCheckoutAddress();
      this.sharedService.getCustomerAddress().subscribe(res => {
        console.log(res);
        if (res === null) {
          this.addressList = [];
          this.showThisOnlyAddressSuccess = true;
          this.showNewAddAddress = true;
          this.proceesdNext = false;
          this.proceedToSelectPayment = false;
          this.cartDetails = false;
          $('#checkout_perpos').css("display", "none");
          $('#hide_this_proceed').css("display", "block");
          this.loader = false;
          // this.navigateCheckoutAddress();
          // this.getCart();
        } else {
          this.proceesdNext = true;
          this.addressList = res[0].addresses
          this.loader = false;
        }
        // this.addressList = res[0].addresses;
        // this.loader = false;
        // this.searchForTheCustomer();
        // this.getCart();
      }, err => {
        this.loader = false;
        this.showNewAddAddress = true;
        this.showThisOnlyAddressSuccess = false;
      });
      $.notify({
        icon: "add_alert",
        message: this.AddressDeleteRes.message
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

  public onReset() {
    this.addAddressForm.reset();
    $('#searchTextAddressField').val("");
    this.addressSubmitted = false;
    this.showThisForLandmark = false;
    this.addAddressForm.get('country').setValue("India");
  }



  ngOnInit() {
    this.getPackagingTypes();
    // this.getCart();
    this.addAddressForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$')]],
      line1: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: [{ value: 'India', disabled: true }],
      pincode: ['', Validators.required],
      landmark: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      defaultAddress: [''],
      landmarkPincode: ['']
    });
    // this.getAddress();
    this.createNewUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      //  Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$')]],
    });
    this.createNewUserFormAfterVerify = this.formBuilder.group({
      otp: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.geocoder = new google.maps.Geocoder;
    google.maps.event.addDomListener(window, 'load', this.initialize());

  }
  initialize() {
    var input = document.getElementById('searchTextAddressField');
    console.log("test");
    var options = {
      componentRestrictions: { country: "IN" }
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    var place = autocomplete.getPlace();
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // document.getElementById("googleMapLoader").style.display = "none";
      $('#googleMapLoader').css("display", "none");
      var place = autocomplete.getPlace();
      // if (place.formatted_address) {
      this.landmarkStatus = true;
      this.addAddressForm.get('landmark').setValue(place.formatted_address);
      // if (!this.detectLocationStatus) {
      this.addAddressForm.get('latitude').setValue(place.geometry.location.lat());
      this.addAddressForm.get('longitude').setValue(place.geometry.location.lng());
      this.addAddressForm.get('landmarkPincode').setValue(this.getAddrComponent(place, { postal_code: 'short_name' }));
      console.log('land', place.geometry.location.lat(), place.geometry.location.lng())
      // }
      // }
    });
  }
  public getAddrComponent(place, componentTemplate) {
    let result;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  // public getAddrComponent(place, componentTemplate) {
  //   let result;
  //   for (let i = 0; i < place.address_components.length; i++) {
  //     const addressType = place.address_components[i].types[0];
  //     if (componentTemplate[addressType]) {
  //       result = place.address_components[i][componentTemplate[addressType]];
  //       return result;
  //     }
  //   }
  //   return;
  // }

  ngAfterViewInit() {

  }
  clearThesearch() {
    this.ngOnInit();
    this.showThisOnlySuccess = false;
    this.showThisUserNotAvailable = false;
    this.showThisOnlyAddressSuccess = false;
    this.showNewAddAddress = false;
    document.getElementById('searching_customer_details').removeAttribute('readonly');
    $('#searching_customer_details').val("");
    $('#selectedSlotDetails').val("");
    this.addressList = [];
    this.getCartData.items = [];
    this.showThisSlotSelection = false;
    this.proceesdNext = false;
    this.selectSlotStatus = false;
    this.proceedToSelectPayment = false;
    this.addressDetails = false;
    this.cartDetails = false;
    this.selectedDateTimeSlots = [];
    this.selectedSlotDates = '';
    this.selectedSlotStartTime = '';
    this.selectedSlotEndTime = '';
  }
  searchForTheCustomer() {
    this.loader = true;
    var customer_search_val = $('#searching_customer_details').val();
    console.log(customer_search_val);
    if (customer_search_val === "" || customer_search_val === undefined || customer_search_val === null) {
      this.showcustomerSearchErrormsg = true;
      this.loader = false;
      this.showThisOnlySuccess = false;
    } else {
      $('#searching_customer_details').attr("readonly", "true");
      this.showcustomerSearchErrormsg = false;
      var check = customer_search_val.includes("@");
      if (check === true) {
        this.inputReq = {
          "param": { "email": customer_search_val }
        }
      } else {
        this.inputReq = {
          "param": { "phone": customer_search_val }
        }
      }
      console.log(this.inputReq);

      this.sharedService.GetCustomerDetails(this.inputReq).subscribe(custerRes => {
        console.log(custerRes);
        this.finalCusterMerSearchRes = custerRes[0];
        if (this.finalCusterMerSearchRes.status === true) {
          this.showThisOnlySuccess = true;
          this.showThisUserNotAvailable = false;
          var Settoken = "Bearer" + ' ' + this.finalCusterMerSearchRes.token;
          console.log(Settoken);
          localStorage.setItem('token', Settoken);
          localStorage.setItem('email', this.finalCusterMerSearchRes.email);
          // this.getCart();
          // this.loader = true;
          this.sharedService.getCustomerAddress().subscribe(res => {
            console.log(res);
            if (res === null) {
              this.addressList = [];
              this.showThisOnlyAddressSuccess = true;
              this.showThisSlotSelection = true;
              this.showNewAddAddress = true;
              this.addressDetails = true;
              // $('#checkout_perpos').css("display", "none");
              this.loader = false;
            } else {
              this.addressList = res[0].addresses;
              console.log(this.addressList);
              this.showThisOnlyAddressSuccess = true;
              this.showThisSlotSelection = true;
              this.showNewAddAddress = true;
              this.addressDetails = true;
              // $('#checkout_perpos').css("display", "none");
              this.loader = false;
            }
          }, err => {
            console.log(err);
            $('#checkout_perpos').css("display", "none");
            this.loader = false;
            this.showThisSlotSelection = false;
            this.showThisOnlyAddressSuccess = false;
            this.addressList = [];
            this.showNewAddAddress = true;
            this.addressDetails = true;
            this.loader = false;
          });
        } else {
          this.loader = false;
          this.showThisOnlySuccess = false;
          this.showThisUserNotAvailable = true;
          // $.notify({
          //   icon: "add_alert",
          //   message: this.finalCusterMerSearchRes.message
          // }, {
          //   type: 'info',
          //   timer: 1000,
          //   placement: {
          //     from: 'top',
          //     align: 'center'
          //   }
          // });
        }
      }, err => {
        console.log(err);
        this.loader = false;
      });
    }
  }
  userSelectedThisAddress(i, address) {
    console.log(address);
    if ($('#checkThe_address_is_selected' + i).prop("checked") === true) {
      $('#checkThe_address_is_billing_and_shipping' + i).prop('disabled', false);
      $('#checkThe_address_is_billing' + i).prop('disabled', false);
      $('#checkThe_address_is_shipping' + i).prop('disabled', false);
    } else {
      $('#checkThe_address_is_billing_and_shipping' + i).prop('checked', false);
      $('#checkThe_address_is_billing' + i).prop('checked', false);
      $('#checkThe_address_is_shipping' + i).prop('checked', false);
      $('#checkThe_address_is_billing_and_shipping' + i).prop('disabled', true);
      $('#checkThe_address_is_billing' + i).prop('disabled', true);
      $('#checkThe_address_is_shipping' + i).prop('disabled', true);
      $('#hide_this_proceed').css("display", "block");
      this.proceesdNext = false;
      this.proceedToSelectPayment = false;
      this.cartDetails = false;
    }
    this.userSelectedOneCheckBox_So_Address_Validations_no = true;
    this.userSelectedOneCheckBox_So_Address_Validations_billing = true;
    this.userSelectedOneCheckBox_So_Address_Validations_Shipping = true;
    this.userSelectedOneCheckBox_So_Address_Validations_both = true;
    this.userSelectedOneCheckBox_So_Address_Validations_1 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_2 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_3 = true;
  }
  userSelectedThisAddressForShiping_and_billing(billing_shipping) {
    console.log(billing_shipping);
    this.userSelectedOneCheckBox_So_Address_Validations_no = true;
    this.userSelectedOneCheckBox_So_Address_Validations_billing = true;
    this.userSelectedOneCheckBox_So_Address_Validations_Shipping = true;
    this.userSelectedOneCheckBox_So_Address_Validations_both = true;
    this.userSelectedOneCheckBox_So_Address_Validations_1 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_2 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_3 = true;
  }
  userSelectedThisAddressFor_billing(billing) {
    console.log(billing);
    this.userSelectedOneCheckBox_So_Address_Validations_no = true;
    this.userSelectedOneCheckBox_So_Address_Validations_billing = true;
    this.userSelectedOneCheckBox_So_Address_Validations_Shipping = true;
    this.userSelectedOneCheckBox_So_Address_Validations_both = true;
    this.userSelectedOneCheckBox_So_Address_Validations_1 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_2 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_3 = true;
  }
  userSelectedThisAddressFor_Shiping(shipping) {
    console.log(shipping);
    this.userSelectedOneCheckBox_So_Address_Validations_no = true;
    this.userSelectedOneCheckBox_So_Address_Validations_billing = true;
    this.userSelectedOneCheckBox_So_Address_Validations_Shipping = true;
    this.userSelectedOneCheckBox_So_Address_Validations_both = true;
    this.userSelectedOneCheckBox_So_Address_Validations_1 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_2 = true;
    this.userSelectedOneCheckBox_So_Address_Validations_3 = true;
  }

  handleAsideClick(event: Event) {
    event.stopPropagation();
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
      // "store_id":
      "param": {
        "type": "search",//search or category
        "productName": searchText,// only if search
        // "store_id": localStorage.getItem('storeId'),
        "store_id": localStorage.getItem('plant_code'),
        "categoryId": "",
        "sort_by": '',
        "pageNumber": "",
        "pageCount": "",
        "filters": {
        }
      }
    }
    console.log(localStorage.getItem('storeId'));
    console.log(requestBody);
    this.sharedService.productSearch(requestBody).subscribe(data => {
      console.log(data);
      this.searchLoader = false;
      this.searchedProducts = data[0].products;
      this.isSearchSuggestion = true;
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    })


  }
  public updatePackagingType(event) {
    this.loader = true;
    let requestBody = {
      "packaging_type": event.target.value
    }
    this.sharedService.updatePackagingType(requestBody).subscribe(data => {
      console.log(requestBody);
      this.getCart();
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    })
  }
  public deleteCart() {
    this.loader = true;
    this.sharedService.deleteCart().subscribe(data => {
      this.getCart();
      this.loader = false;
      // this.cartStatus = false;
      // this.showThisOnlyAddressSuccess = false;
      // this.showNewAddAddress = false;
      this.proceedToSelectPayment = false;
      this.proceesdNext = false;
    }, err => {
      this.proceesdNext = true;
      this.proceedToSelectPayment = true;
      // this.showNewAddAddress = true;
      // this.showThisOnlyAddressSuccess = true;
      console.log(err);
      this.loader = false;
    })
  }

  public deleteCartProduct(productId, index) {
    this.loader = true;
    if (index == 1) {
      this.loader = false;
      this.deleteCart();
      return
    }
    this.sharedService.deleteCartProduct(productId).subscribe(data => {
      this.loader = false;
      this.getCart()
    }, err => {
      this.loader = false;
    })
  }

  public updateCart(productId, quantity, index = 1, inventory) {
    this.loader = true;
    if (quantity < 1) {
      this.deleteCartProduct(productId, index);
      return
    }
    console.log(quantity);
    console.log(inventory);

    if (quantity > inventory) {
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
    }

    let requestBody = {
      "items": [
        {
          "item_id": productId,
          "quantity": parseInt(quantity),
          "store_id": localStorage.getItem('plant_code')
        }
      ]
    }
    console.log(requestBody);
    this.sharedService.addtoCart(requestBody).subscribe(data => {
      console.log(data);
      this.cartInfo = data;
      this.loader = false;
      $.notify({
        icon: "add_alert",
        message: this.cartInfo.message
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.getCart();
    }, err => {
      console.log(err);
      this.loader = false;
    });
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
  getCart() {
    // this.getPackagingTypes();
    this.loader = true;
    this.sharedService.getCartDetails().subscribe(cartData => {
      console.log(cartData);
      this.getCartData = cartData[0];
      if (this.getCartData.items.length === 0) {
        this.cartStatus = true;
      }
      else {
        this.cartStatus = false;
      }
      this.loader = false;
    }, err => {
      console.log(err);
      this.errStatus = err;
      if (this.errStatus.status === 404) {
        this.cartStatus = true;
        this.showThisOnlySuccess = true;
      } else {
        this.cartStatus = false;
        this.showThisOnlySuccess = false;
      }
      this.loader = false;
    });
  }
  public getPackagingTypes() {
    this.loader = true;
    this.sharedService.getPackagingTypes().subscribe(data => {
      this.packagingTypes = data[0].packaging_types
      console.log(this.packagingTypes);
      this.loader = false;
    }, err => {
      this.loader = false;
    })
  }
  navigateCheckoutAddress() {
    // this.getCart();
    if (parseFloat(this.getCartData.min_order_value) <= parseFloat(this.getCartData.sub_total)) {
      console.log($('#PackageTypeValue').val());
      if ($('#PackageTypeValue').val() === "" || $('#PackageTypeValue').val() === undefined || $('#PackageTypeValue').val() === null) {
        console.log("please this.check Package Type");
        $.notify({
          icon: "add_alert",
          message: "please Select the Packing Type"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        this.proceedToSelectPayment = false;
        this.proceesdNext = false;
      } else {
        this.proceesdNext = true;
        $('#checkout_perpos').css("display", "none");
        this.proceedToSelectPayment = true;
        this.sharedService.getSlots().subscribe(data => {
          console.log(data);
          this.selectedSlots = data;
          var date = new Date();
          var currentMonth = date.getMonth() + 1;
          var currentYear = date.getFullYear();
          this.selectedSlots.slots.forEach((element1) => {
            if (currentMonth > element1.month) {
              var incrementYear = currentYear + 1;
            } else {
              incrementYear = currentYear;
            }
            this.objectNew[element1.month] = [];
            element1.day_slots.forEach((element2) => {
              var date = element2.day + '-' + element1.month + '-' + incrementYear
              this.objectNew[element1.month].push(date);
            });
            incrementYear = currentYear;
          });
        }, err => {

        });

      }
    } else {
      $.notify({
        icon: "add_alert",
        message: "Minimum Order Value Should Be ₹" + this.getCartData.min_order_value
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

  slotSelect(slotId, slotStartTime, slotEndTime) {
    console.log(slotId);
    console.log(slotStartTime);
    console.log(slotEndTime);
    this.selectedDateTimeSlots = '';
    this.selectedSlotStartTime = slotStartTime;
    this.selectedSlotEndTime = slotEndTime;
    this.selectSlotStatus = true;
    localStorage.setItem('slotId', slotId);
    this.proceedToSelectPayment = true;
  }
  OnDateChange(pickedDate): void {
    console.log(pickedDate);
    this.selectedSlotDates = pickedDate;
    localStorage.setItem('slotDate', pickedDate.getDate() + '/' + (pickedDate.getMonth() + 1) + '/' + pickedDate.getFullYear());
    var selectedSlotMonth
    var selectedSlotDate
    console.log(this.selectedSlots);
    selectedSlotMonth = this.selectedSlots.slots.find(data => data.month == (pickedDate.getMonth() + 1)).day_slots;
    selectedSlotDate = selectedSlotMonth.find(data => data.day == pickedDate.getDate());
    this.selectedDateTimeSlots = selectedSlotDate.time_slots;
    console.log(this.selectedDateTimeSlots);
  }

  selectTheSlotCheck() {
    this.loader = true;
    console.log(this.addressList);
    this.check = [];
    for (var i = 0; i < this.addressList.length; i++) {
      if ($('#checkThe_address_is_selected' + i).prop("checked") === true) {
        var checkedData = {
          "address_id": this.addressList[i].address_id,
          "first_name": this.addressList[i].first_name,
          "last_name": this.addressList[i].last_name,
          "email": this.addressList[i].email,
          "mobile": this.addressList[i].mobile,
          "line_1": this.addressList[i].line_1,
          "line_2": this.addressList[i].line_2,
          "street": this.addressList[i].street,
          "city": this.addressList[i].city,
          "state": this.addressList[i].state,
          "country": this.addressList[i].country,
          "is_billing": this.addressList[i].is_billing,
          "is_shipping": this.addressList[i].is_shipping,
          "pincode": this.addressList[i].pincode,
          "is_default": this.addressList[i].is_default
        }
        this.check.push(checkedData);
        if ($('#checkThe_address_is_billing_and_shipping' + i).prop("checked") === true) {
          checkedData["final_billing_shipping_same"] = true;
        } else {
          checkedData["final_billing_shipping_same"] = false;
        }
        if ($('#checkThe_address_is_billing' + i).prop("checked") === true) {
          checkedData["final_for_billing"] = true;
        } else {
          checkedData["final_for_billing"] = false;
        }
        if ($('#checkThe_address_is_shipping' + i).prop("checked") === true) {
          checkedData["final_for_shipping"] = true;
        } else {
          checkedData["final_for_shipping"] = false;
        }
      } else {

      }
    }
    console.log(this.check);

    if (this.check.length <= 2) {
      if (this.check.length === 0) {
        console.log("1");
        this.userSelectedOneCheckBox_So_Address_Validations_no = false;
        $.notify({
          icon: "add_alert",
          message: "Please Select the Address"
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
        this.userSelectedOneCheckBox_So_Address_Validations_no = true;
      }
      if (this.check.length === 1) {
        if ((this.check[0].final_billing_shipping_same === false && this.check[0].final_for_billing === false && this.check[0].final_for_shipping === false)) {
          this.userSelectedOneCheckBox_So_Address_Validations_both = false;
          console.log("2");
          $.notify({
            icon: "add_alert",
            message: "Please choose Your Seleted Address is Shipping/Billing/Billing & Shipping Address are Same"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }
        else {
          this.userSelectedOneCheckBox_So_Address_Validations_both = true;
        }

        if ((this.check[0].final_billing_shipping_same === false && this.check[0].final_for_billing === true && this.check[0].final_for_shipping === false)) {
          this.userSelectedOneCheckBox_So_Address_Validations_Shipping = false;
          console.log("3");
          $.notify({
            icon: "add_alert",
            message: "Please choose Your Shipping Address"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }
        else {
          this.userSelectedOneCheckBox_So_Address_Validations_Shipping = true;
        }
        if ((this.check[0].final_billing_shipping_same === false && this.check[0].final_for_billing === false && this.check[0].final_for_shipping === true)) {
          this.userSelectedOneCheckBox_So_Address_Validations_billing = false;
          console.log("4");
          $.notify({
            icon: "add_alert",
            message: "Please choose Your Billing Address"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }
        else {
          this.userSelectedOneCheckBox_So_Address_Validations_billing = true;
        }


        if (this.check[0].final_for_billing === true) {
          this.userSelectedBilling = true;
        } else {
          this.userSelectedBilling = false;
        }
        if (this.check[0].final_for_shipping === true) {
          this.userSelectedShipping = true;

        } else {
          this.userSelectedShipping = false;
        }
      }
      if (this.check.length === 2) {
        if ((this.check[0].final_billing_shipping_same === true && this.check[1].final_billing_shipping_same === true) || (this.check[0].final_for_billing === true && this.check[1].final_for_billing === true) || (this.check[0].final_for_shipping === true && this.check[1].final_for_shipping === true)) {
          this.userSelectedOneCheckBox_So_Address_Validations_1 = false;
          console.log("5");
          $.notify({
            icon: "add_alert",
            message: "Please choose Your Billing & Shipping Address Correctly"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }

        if ((this.check[0].final_billing_shipping_same === false && this.check[0].final_for_billing === false && this.check[0].final_for_shipping === false) || (this.check[1].final_billing_shipping_same === false && this.check[1].final_for_billing === false && this.check[1].final_for_shipping === false) || (this.check[0].final_billing_shipping_same === true && this.check[1].final_for_billing === true && this.check[1].final_for_shipping === false) || (this.check[0].final_billing_shipping_same === true && this.check[1].final_for_billing === false && this.check[1].final_for_shipping === true) || (this.check[1].final_billing_shipping_same === true && this.check[0].final_for_billing === true && this.check[0].final_for_shipping === false) || (this.check[1].final_billing_shipping_same === true && this.check[0].final_for_billing === false && this.check[0].final_for_shipping === true)) {
          this.userSelectedOneCheckBox_So_Address_Validations_2 = false;
          console.log("6");
          $.notify({
            icon: "add_alert",
            message: "Please choose Your Billing & Shipping Address Correctly"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });
          this.loader = false;
        }
      }
    } else {
      this.userSelectedOneCheckBox_So_Address_Validations_3 = false;
      console.log("7");
      $.notify({
        icon: "add_alert",
        message: "Please choose Your Billing & Shipping Address Correctly"
      }, {
        type: 'info',
        timer: 1000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
      this.loader = false;
    }



    console.log(this.userSelectedOneCheckBox_So_Address_Validations_no);
    console.log(this.userSelectedOneCheckBox_So_Address_Validations_billing);
    console.log(this.userSelectedOneCheckBox_So_Address_Validations_Shipping);
    console.log(this.userSelectedOneCheckBox_So_Address_Validations_both);

    console.log(this.userSelectedOneCheckBox_So_Address_Validations_1);
    console.log(this.userSelectedOneCheckBox_So_Address_Validations_2);
    console.log(this.userSelectedOneCheckBox_So_Address_Validations_3);

    if (this.userSelectedOneCheckBox_So_Address_Validations_no === true && this.userSelectedOneCheckBox_So_Address_Validations_billing === true && this.userSelectedOneCheckBox_So_Address_Validations_Shipping === true && this.userSelectedOneCheckBox_So_Address_Validations_both === true && this.userSelectedOneCheckBox_So_Address_Validations_1 === true && this.userSelectedOneCheckBox_So_Address_Validations_2 === true && this.userSelectedOneCheckBox_So_Address_Validations_3 === true) {
      // this.proceesdNext = true;
      // var billing_address_id;
      // var shipping_address_id;
      var BcheckServiceblePincode;
      var ScheckServiceblePincode;

      if (this.check.length === 1) {
        this.billing_address_id = this.check[0].address_id;
        ScheckServiceblePincode = this.check[0].pincode;
        this.shipping_address_id = this.check[0].address_id;
      } else {
        if (this.check[0].final_for_billing === true) {
          this.billing_address_id = this.check[0].address_id;
          BcheckServiceblePincode = this.check[0].pincode;
          this.shipping_address_id = this.check[1].address_id;
          ScheckServiceblePincode = this.check[1].pincode;
        } else {
          this.billing_address_id = this.check[1].address_id;
          BcheckServiceblePincode = this.check[1].pincode;
          this.shipping_address_id = this.check[0].address_id;
          ScheckServiceblePincode = this.check[0].pincode;
        }
      }
      console.log(ScheckServiceblePincode);
      var reqsercheck = {
        "pincode": ScheckServiceblePincode,
        "lat_longs": null
      }
      console.log(reqsercheck);

      this.sharedService.OmsServiceblityCheck(reqsercheck).subscribe(resboth => {
        console.log(resboth);
        this.shippingAddresCheckB = resboth;
        if (this.shippingAddresCheckB.is_serviceable === false) {
          this.servicebleAddressboth = false;
          // this.proceesdNext = false;
          this.cartDetails = false;
          $.notify({
            icon: "add_alert",
            message: "Your Shipping Address is not a Serviceable, Please select the Serviceable Address"
          }, {
            type: 'info',
            timer: 1000,
            placement: {
              from: 'top',
              align: 'center'
            }
          });

        } else {
          // this.proceedToSelectPayment = true;
          this.servicebleAddressboth = true;
          // this.proceesdNext = true;
          this.cartDetails = true;
          $('#hide_this_proceed').css("display", "none");
          console.log(this.addressList);
          for (var i = 0; i < this.addressList.length; i++) {
            $('#checkThe_address_is_selected' + i).prop('disabled', true);
            $('#checkThe_address_is_billing_and_shipping' + i).prop('disabled', true);
            $('#checkThe_address_is_billing' + i).prop('disabled', true);
            $('#checkThe_address_is_shipping' + i).prop('disabled', true);
          }
          $('#editIcones').css("display", "block");
          localStorage.setItem("storeId", this.shippingAddresCheckB.store_id);
          localStorage.setItem("plant_code", this.shippingAddresCheckB.plant_code);
          // localStorage.setItem("addressId", addressId);
          this.getCart();
        }
        this.loader = false;
      }, err => {
        console.log(err);
        this.loader = false;
      });
    } else {
      this.proceesdNext = false;
    }


  }
  enableAddress() {
    for (var i = 0; i < this.addressList.length; i++) {
      // checkThe_address_is_selected{{i}}
      $('#checkThe_address_is_selected' + i).prop('disabled', false);
      $('#checkThe_address_is_billing_and_shipping' + i).prop('disabled', false);
      $('#checkThe_address_is_billing' + i).prop('disabled', false);
      $('#checkThe_address_is_shipping' + i).prop('disabled', false);
    }
    $('#editIcones').css("display", "none");
    $('#hide_this_proceed').css("display", "block");
    this.cartDetails = false;
    this.proceesdNext = false;
    this.proceedToSelectPayment = false;
  }
  autofill(value) {
    var pincodeDetail = this.pincodeList[value];
    if (value.length == 6 && pincodeDetail !== undefined) {
      this.addAddressForm.get('city').setValue(pincodeDetail.city + ", " + pincodeDetail.district);
      this.addAddressForm.get('state').setValue(pincodeDetail.state);
      this.a.city.disable();
      this.a.state.disable();
    } else {
      this.addAddressForm.get('city').setValue('');
      this.addAddressForm.get('state').setValue('');
      this.a.city.enable();
      this.a.state.enable();
    }
  }



  checkTheAddress() {


    if ($('#cash_on_delivery').prop("checked") === true) {
      this.cashOnDelivery = true;
    } else {
      this.cashOnDelivery = false;
    }
    // if ($('#card_on_delivery').prop("checked") === true) {
    //   this.cardOnDelivery = true;
    // } else {
    //   this.cardOnDelivery = false;
    // }

    console.log(this.cashOnDelivery);
    console.log(this.cardOnDelivery);
    console.log(this.proceedToSelectPayment);
    if (this.proceesdNext === true) {
      // && this.cardOnDelivery === false
      if (this.cashOnDelivery === false) {
        $.notify({
          icon: "add_alert",
          message: "Please Select the Payment Type"
        }, {
          type: 'info',
          timer: 1000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
        // this.loader = false;
        this.loader = false;
      } else {
        this.sharedService.getCartDetails().subscribe(cartData => {
          console.log(cartData);
          this.getCartData_new = cartData[0];
          if (this.getCartData.items.length === 0) {
            this.cartStatus = true;
            this.loader = false;
          }
          else {
            this.loader = true;
            this.cartStatus = false;
            if (parseFloat(this.getCartData_new.min_order_value) <= parseFloat(this.getCartData_new.sub_total)) {
              console.log(this.check);
              console.log(this.getCartData_new);
              // var billing_address_id;
              // var shipping_address_id;
              // var checkServiceblePincode;
              // var BcheckServiceblePincode;
              // var ScheckServiceblePincode;

              // console.log(billing_address_id);
              // console.log(shipping_address_id);


              console.log(this.servicebleAddressboth);
              // if (this.servicebleAddressboth === false) {
              //   $.notify({
              //     icon: "add_alert",
              //     message: "Your Shipping Address is not a Serviceable, Please select the Serviceable Address"
              //   }, {
              //     type: 'info',
              //     timer: 1000,
              //     placement: {
              //       from: 'top',
              //       align: 'center'
              //     }
              //   });
              // } else {
              console.log(this.selectedSlotDates);
              console.log(this.selectedSlotStartTime);
              console.log(this.selectedSlotEndTime);
              if (this.selectedSlotDates === "" || this.selectedSlotDates === undefined || this.selectedSlotDates === null || this.selectedSlotStartTime === "" || this.selectedSlotStartTime === undefined || this.selectedSlotStartTime === null || this.selectedSlotEndTime === "" || this.selectedSlotEndTime === undefined || this.selectedSlotEndTime === null) {
                console.log("slotsRequired");
                $.notify({
                  icon: "add_alert",
                  message: "Please Select the Time Slots"
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
                console.log("slotsGiven");
                if (localStorage.getItem('forCRMTEAM') === 'true') {
                  var channel_id = "7135d22e-557a-11eb-9b48-47de3ed79aee"; // CRM DEV
                  // var channel_id = "0b2c77dc-5564-11eb-954b-73d89e99fb84"; // CRM PROD 
                } else {
                  var channel_id = "194cb776-50b6-11eb-9b48-abda6d59f27e"; // DEV
                  // var channel_id = "ef91ec12-4cc8-11eb-9604-8b2bfad536c6"; //PROD 
                }
                var body = {
                  "cart_id": this.getCartData_new.cart_id,
                  "billing_address_id": this.billing_address_id,
                  "shipping_address_id": this.shipping_address_id,
                  "channel_id": channel_id,
                  // "channel_id": "194cb776-50b6-11eb-9b48-abda6d59f27e", //DEV
                  // "channel_id": "ef91ec12-4cc8-11eb-9604-8b2bfad536c6", //PROD
                  "is_cash_od": this.cashOnDelivery,
                  // "is_card_od": this.cardOnDelivery,
                  "is_card_od": false,
                  "is_online_payment": false,
                  "time_slot_id": localStorage.getItem("slotId"),
                  "order_type_code": "SFS",
                  "fulfilment_id": null,
                  "store_id": localStorage.getItem('storeId'),
                  "slot_date": localStorage.getItem('slotDate')
                  // localStorage.getItem('storeId')
                  // localStorage.getItem('slotDate')
                }
                console.log(body);
                this.sharedService.placeAnOrder(body).subscribe(OrderPlaceRes => {
                  console.log(OrderPlaceRes);
                  this.finalOrderPalced = OrderPlaceRes;
                  $.notify({
                    icon: "add_alert",
                    message: "Order has been Placed Successfully"
                  }, {
                    type: 'info',
                    timer: 1000,
                    placement: {
                      from: 'top',
                      align: 'center'
                    }
                  });
                  this.sharedService.getPaymentStatus(this.finalOrderPalced.order_id).subscribe(data => {
                  });
                  this.router.navigate(['/orders']);
                  localStorage.removeItem('token');
                  localStorage.removeItem('email');
                  localStorage.removeItem('slotId');
                  localStorage.removeItem('storeId');
                  localStorage.removeItem('plant_code');
                  $('#checkout_perpos').css("display", "block");
                  document.getElementById('searching_customer_details').removeAttribute('readonly');

                  this.loader = false;
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
                  this.loader = false;
                });
              }
              // }
            } else {
              $.notify({
                icon: "add_alert",
                message: "Minimum Order Value Should Be ₹" + this.getCartData_new.min_order_value
              }, {
                type: 'info',
                timer: 1000,
                placement: {
                  from: 'top',
                  align: 'center'
                }
              });
              this.loader = false;
            }
          }
          this.loader = false;
        }, err => {
          console.log(err);
          this.errStatus = err;
          if (this.errStatus.status === 404) {
            this.cartStatus = true;
          } else {
            this.cartStatus = false;
          }
          this.loader = false;
        });
      }
    }
  }
}

