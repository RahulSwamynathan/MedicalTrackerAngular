import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, AbstractControl } from '@angular/forms';
import { Iforget } from '../interfaces/iforget'
import { AccountService } from '../../Services/account.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    valid: string;
    resetPasswordModel: Iforget = {
        password: '',
        confirmPassword: null,
        email: null
    }

    constructor(private _accountService: AccountService,
        private _router: Router) {

    }

    ngOnInit() {
    }

    resetPassword(formContrl: NgForm, resetPassword: Iforget) {
        if (formContrl.valid) {
            if (resetPassword.password != null && resetPassword.email != null) {
                this._accountService.resetPassword(resetPassword)
                    .subscribe(
                        (data) => {
                            if (Boolean(data)) {
                                this._router.navigate(['/Layout/login']);
                            }
                        },
                        (error) => {
                            this.valid = "Email address is not valid";
                        }
                    );
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

    cancelAction(resetForm: NgForm) {
        resetForm.resetForm();
    }

    emailValidation(emailCtrl: NgForm, email: string) {
        if (emailCtrl.controls['email'].errors == null && email != null) {
            this._accountService.emailValidation(email)
                .subscribe((result) => {
                    if (!Boolean(result)) {
                        emailCtrl.controls['email'].setErrors({ 'validation': true });
                    }
                }, (error) => {
                    console.error(error);
                });
        }
    }
}
