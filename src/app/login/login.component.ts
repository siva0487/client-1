

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from 'app/_services/shared-service.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  mess: any;
  loader: boolean;
  screensListForLogedinUser: any;
  constructor(private formBuilder: FormBuilder, private service: SharedServiceService, private router: Router,) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loader = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loader = false;
      return;
    }
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(loginRes => {
      console.log(loginRes);
      this.mess = loginRes;
      if (this.mess.role_name === null) {
        // this.router.navigate(['/admin-layout']);
        $.notify({
          icon: "add_alert",
          message: this.mess.message,
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
        // this.router.navigate(['/dashboard']);
        // this.loader = false;
        this.service.selectedUserPermissions(this.mess.role_id).subscribe(res => {
          console.log(res);
          // if (this.mess.role_id === "bd738efc-0fa1-11eb-bbea-effe9765a6b1") {
          //   if (this.mess.user_status === "true") {
          //     this.screensListForLogedinUser = res;
          //     localStorage.setItem('role', this.mess.role_name);
          //     localStorage.setItem('role_id', this.mess.role_id);
          //     localStorage.setItem("screensList", JSON.stringify(this.screensListForLogedinUser[0]));
          //     var test = this.mess.role_name.includes("crm" || "CRM");
          //     console.log(test);
          //     this.router.navigate(['/dashboard']);
          //     this.loader = false;
          //     $.notify({
          //       icon: "add_alert",
          //       message: this.mess.message,
          //     }, {
          //       type: 'info',
          //       timer: 1000,
          //       placement: {
          //         from: 'top',
          //         align: 'center'
          //       }
          //     });
          //   } else {
          //     this.loader = false;
          //     $.notify({
          //       icon: "add_alert",
          //       message: "Account is in Inactive, Please Contact Admin",
          //     }, {
          //       type: 'info',
          //       timer: 1000,
          //       placement: {
          //         from: 'top',
          //         align: 'center'
          //       }
          //     });
          //   }
          // }
          // if (this.mess.role_id != "bd738efc-0fa1-11eb-bbea-effe9765a6b1") {
          if (this.mess.user_status === "true" && this.mess.store_status === "true") {
            this.screensListForLogedinUser = res;
            localStorage.setItem('role', this.mess.role_name);
            localStorage.setItem('role_id', this.mess.role_id);
            localStorage.setItem("screensList", JSON.stringify(this.screensListForLogedinUser[0]));
            var test = this.mess.role_name.toUpperCase().includes("CRM");
            console.log(this.mess.role_name.toUpperCase());
            console.log(test);
            if (test === true) {
              this.router.navigate(['/orders']);
              localStorage.setItem('dashboard', "true");
              localStorage.setItem('forCRMTEAM',"true");
            } else {
              this.router.navigate(['/dashboard']);
              localStorage.setItem('dashboard', "false");
              localStorage.setItem('forCRMTEAM',"false");
            }
            this.loader = false;
            $.notify({
              icon: "add_alert",
              message: this.mess.message,
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
              message: "Account is in Inactive, Please Contact Admin",
            }, {
              type: 'info',
              timer: 1000,
              placement: {
                from: 'top',
                align: 'center'
              }
            });
          }

          // }

          // this.router.navigate(['/dashboard']);
          // this.loader = false;
          // $.notify({
          //   icon: "add_alert",
          //   message: this.mess.message,
          // }, {
          //   type: 'info',
          //   timer: 1000,
          //   placement: {
          //     from: 'top',
          //     align: 'center'
          //   }
          // });
        }, err => {
          console.log(err);
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
    }, err => {
      this.loader = false;
      console.log(err);
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