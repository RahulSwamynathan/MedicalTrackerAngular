import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { Iregistration } from '../Interfaces/IRegistration'
import { AccountService } from "../../Services/account.service";

@Component({
    selector: 'app-register-component',
    templateUrl: './register-component.component.html',
    styleUrls: ['./register-component.component.css']
})
export class RegisterComponent implements OnInit {

    valid: string;
    registerUser: Iregistration = {
        UserName: null,
        Password: '',
        ConfirmPassword: null,
        Email: null,
        Roles: null
    }

    constructor(private _service: AccountService,
        private _router: Router) {

    }

    ngOnInit() {
    }

    register(formContrl: NgForm, userDetail: Iregistration) {
        if (formContrl.valid){
            if (userDetail.UserName != null && userDetail.Email != null && userDetail.Password != null && userDetail.Roles != null) {
                this._service.newRegistaration(userDetail)
                    .subscribe((result) => {
                        if (Boolean(result)) {
                            this._router.navigate(['/Layout/login']);
                        }
                    }, (error) => {
                            this.valid = "Unable to process the registration - Please check your Email";
                    });
            }
        }
        else{
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

    cancelAction(formData: NgForm) {
        formData.form.reset();
    }

    emailValidation(emailCtrl: NgForm, email: string) {
        if (emailCtrl.controls['emailAddress'].errors == null && email != null) {
            this._service.emailValidation(email)
                .subscribe((result) => {
                    if (Boolean(result)) {
                      emailCtrl.controls['emailAddress'].setErrors({'validation': true});
                    }
                },(error) => {
                        console.error(error);
            });
        }
    }
}
