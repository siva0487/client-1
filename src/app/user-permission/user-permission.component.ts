import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'app/_services/shared-service.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {
  listOfRolesInfo: any;
  loader: boolean;
  finalArray = [];
  headingsForScreens: any;
  dict = {};
  dict1 = {};
  dict2 = {};
  allScreens: { screens: { screen_id: string; screen_name: string; is_active: boolean; }[]; }[];
  finalModifiedArray = [];
  constructor(private service: SharedServiceService) {
    this.allcurrentRoles();
  }

  ngOnInit(): void {
  }
  public allcurrentRoles() {
    this.loader = true;
    this.service.getAllRoles().subscribe(res => {
      // console.log(res);
      this.loader = false;
      this.listOfRolesInfo = res[0].roles;
      // console.log(this.listOfRolesInfo);

      this.allScreens = [
        {
          "screens": [
            {
              "screen_id": "f44b7f4c-1538-11eb-bbea-5f81c1b416d2",
              "screen_name": "Dashboard",
              "is_active": true
            },
            {
              "screen_id": "f44b7f4d-1538-11eb-bbea-97c148e2290b",
              "screen_name": "Orders",
              "is_active": true
            },
            {
              "screen_id": "f44b7f4f-1538-11eb-bbea-fbaeba45ca68",
              "screen_name": "Stores Management",
              "is_active": true
            },
            {
              "screen_id": "f44b7f50-1538-11eb-bbea-1b6a91ebb497",
              "screen_name": "Order Rating and Review",
              "is_active": true
            },
            {
              "screen_id": "f44b7f51-1538-11eb-bbea-47631b7cd91e",
              "screen_name": "Returns and Refunds",
              "is_active": true
            },
            {
              "screen_id": "f44b7f52-1538-11eb-bbea-abf7847b5c97",
              "screen_name": "Subscription",
              "is_active": true
            },
            {
              "screen_id": "f44b7f53-1538-11eb-bbea-f355dc24995a",
              "screen_name": "Configurations",
              "is_active": true
            },
            {
              "screen_id": "f44b7f54-1538-11eb-bbea-9bd490cb4cf6",
              "screen_name": "User Management",
              "is_active": true
            },
            {
              "screen_id": "f44b7f4e-1538-11eb-bbea-dfdd175efc68",
              "screen_name": "Customers",
              "is_active": true
            },
            {
              "screen_id": "b54a9840-1539-11eb-bbea-17bb3419d2cd",
              "screen_name": "carts",
              "is_active": true
            }
          ]
        }
      ]
      // console.log(this.allScreens[0].screens);

      for (var i = 0; i < this.allScreens[0].screens.length; i++) {
        var final = {
          "screen_id": this.allScreens[0].screens[i].screen_id,
          "screen_name": this.allScreens[0].screens[i].screen_name,
          "is_read": false,
          "is_write": false,
          "is_active": this.allScreens[0].screens[i].is_active
        }
        this.finalModifiedArray.push(final);
      }
      // console.log(this.finalModifiedArray);



      for (var i = 0; i < this.listOfRolesInfo.length; i++) {
        var modified = {
          "role_name": this.listOfRolesInfo[i].role_name,
          "role_id": this.listOfRolesInfo[i].role_id,
          "screens": this.finalModifiedArray
        }
        this.finalArray.push(modified);
      }
      // console.log(this.finalArray);
      this.headingsForScreens = this.finalArray[0].screens;
      // // console.log(this.finalArray[0].screens);
    }, err => {
      this.loader = false;
      // console.log(err);
    })
  }

  public checkingRead(index, index2, item, screenslist) {
    // console.log(index);
    // console.log(index2);
    // console.log(item);
    // console.log(screenslist);

    if ($("#checked_new" + index).prop('checked') == true) {
      // console.log("checked");
    } else {
      // console.log("Un_checked");
    }

    // var indexs = {
    //   "val": index
    // }
    // if (this.dict.hasOwnProperty(index)) {
    //   delete this.dict[index];
    // } else {
    //   this.dict[index] = indexs;
    // }
    // var indexForROW = [];
    // for (var key in this.dict) {
    //   indexForROW.push(this.dict[key]);
    // }
    // // console.log(indexForROW);
    var rolesInfo = {
      "role": item
    }
    if (this.dict1.hasOwnProperty(index)) {
      delete this.dict1[index];
    } else {
      this.dict1[index] = rolesInfo;
    }
    var rolesInformation = [];
    for (var key in this.dict1) {
      rolesInformation.push(this.dict1[key]);
    }
    // console.log(rolesInformation);

    var screenInfo = {
      "screen": screenslist
    }
    if (this.dict2.hasOwnProperty(index)) {
      delete this.dict2[index];
    } else {
      this.dict2[index] = screenInfo;
    }
    var screenInformation = [];
    for (var key in this.dict2) {
      screenInformation.push(this.dict2[key]);
    }
    // console.log(screenInformation);


  }
  public checkingWrite(index, item, screenslist) {
    // console.log(item);
    // console.log(screenslist);
  }

  // public checkThis(index, role, screen, readpermission, val) {
  //   // console.log(index, role, screen, readpermission, val);
  //   var indexs = {
  //     "val": index
  //   }
  //   if (this.dict.hasOwnProperty(index)) {
  //     delete this.dict[index];
  //   } else {
  //     this.dict[index] = indexs;
  //   }
  //   var indexForROW = [];
  //   for (var key in this.dict) {
  //     indexForROW.push(this.dict[key]);
  //   }
  //   // console.log(indexForROW);

  //   var rolesInfo = {
  //     "role": role
  //   }
  //   if (this.dict1.hasOwnProperty(index)) {
  //     delete this.dict1[index];
  //   } else {
  //     this.dict1[index] = rolesInfo;
  //   }
  //   var rolesInformation = [];
  //   for (var key in this.dict1) {
  //     rolesInformation.push(this.dict1[key]);
  //   }
  //   // console.log(rolesInformation);

  //   var screenInfo = {
  //     "screen": screen
  //   }
  //   if (this.dict2.hasOwnProperty(index)) {
  //     delete this.dict2[index];
  //   } else {
  //     this.dict2[index] = screenInfo;
  //   }
  //   var screenInformation = [];
  //   for (var key in this.dict2) {
  //     screenInformation.push(this.dict2[key]);
  //   }
  //   // console.log(screenInformation);



  // }
  // public checkThis1(index, role, screen, readpermission, val) {
  //   // console.log(index, role, screen, readpermission, val);
  //   var changedValues = {
  //     "role": "",
  //     "screen_name": "User Management",
  //     "read_permission": "read",
  //     "write_permission": "write"
  //   }
  // }
  public createNewPermission() {
    // console.log(this.finalArray);
  }

}
