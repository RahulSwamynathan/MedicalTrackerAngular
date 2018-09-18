import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from '../../Services/account.service';
import { Ilogin } from '../Interfaces/ILogin';
import { Iregistration } from '../interfaces/iregistration';
import { NgForm } from '@angular/forms';
import { loginRoutes } from '../../global.variables';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'app-login-component',
    templateUrl: './login-component.component.html',
    styleUrls: ['./login-component.component.css'],
})
export class LoginComponent implements OnInit {

    result: Iregistration;
    valid: string;

    loginDetails: Ilogin = {
        email: null,
        password: null,
        rememberMe: false
    }

    constructor(private _loginService: AccountService,
        private _router: Router) {
    }

    ngOnInit() {
        if (localStorage.getItem('m-role') != null) {
            localStorage.removeItem('m-role');
        }
        if (localStorage.getItem('m-email') != null) {
            localStorage.removeItem('m-email');
        }
    }

    submitAction(formContrl: NgForm, userDetail: Ilogin) {
        if (formContrl.valid) {
            if (userDetail.email != null && userDetail.password != null) {
                this._loginService.loginValidation(userDetail)
                    .retryWhen((er) => {
                        return er.scan((acc, index) => {
                            acc += 1;
                            if (acc < 5) {
                                this.valid = "Service is not avaialble.. Retrying the request attempt #" + acc;
                            }
                            else {
                                throw (er);
                            }
                        }, 0).delay(1000);
                    })
                    .subscribe((results) => {
                        this.result = results;
                    },
                        (error) => {
                            this.valid = "Your email id or password is incorrect";
                        },
                        () => {
                            if (this.result != null) {
                                if (this.result.Password == userDetail.password) {
                                    localStorage.setItem("m-role", this.result.Roles);
                                    localStorage.setItem("m-email", this.result.Email);
                                    localStorage.setItem("m-userName", this.result.UserName);
                                    switch (localStorage.getItem('m-role').toString().toLowerCase()) {
                                        case "patient":
                                            this._router.navigate([loginRoutes.patientLogin]);
                                            break;
                                        case "doctor":
                                            this._router.navigate([loginRoutes.doctorLogin]);
                                            break;
                                        case "pharmacist":
                                            this._router.navigate([loginRoutes.pharmacistLogin]);
                                            break;
                                    }
                                }
                                else {
                                    this.valid = "Your email id or password is incorrect"
                                }
                            }
                        });
            }
        }
        else {
            let control = formContrl.form.controls;
            for (let item in control) {
                let ctrl = control[item];
                if (ctrl.invalid) {
                    ctrl.markAsTouched();
                    ctrl.markAsDirty();
                }
            }
        }
    }

    cancelAction(formValue: NgForm) {
        formValue.form.reset();
    }
}
