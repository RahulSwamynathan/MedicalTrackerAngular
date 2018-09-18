import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IReset } from '../interfaces/iforget';
import { AccountService } from '../../Services/account.service';
import { emailTriggers } from '../../global.variables';

@Component({
    selector: 'app-forget-component',
    templateUrl: './forget-component.component.html',
    styleUrls: ['./forget-component.component.css']
})
export class ForgetComponent implements OnInit {

    showAlertFail: boolean = false;
    showAlertSuccess: boolean = false;
    dismissible: boolean = true;
    emailDetails: IReset = {
        smtpHost: emailTriggers.smtpHost,
        fromAddress: emailTriggers.fromAddress,
        fromAddressPassword: emailTriggers.fromAddressPassword,
        toAddress: null,
        subject: emailTriggers.subject,
        bodyContent: emailTriggers.bodyContent
    }

    constructor(private _accountService: AccountService) {
    }

    ngOnInit() {
    }

    forgetPassword(formContrl :NgForm, detail:IReset) {
        if(formContrl.valid){
            if(detail.toAddress != null){
                this._accountService.getPassword(detail.toAddress).subscribe((result)=> {
                    if(result != null){
                        detail.bodyContent = detail.bodyContent.replace("{password}", result);
                        this._accountService.passwordEmailTrigger(detail).subscribe((res) => {
                            if(Boolean(res)){
                                formContrl.form.reset();
                                this.showAlertSuccess = true
                             }
                             else{ 
                                 this.showAlertFail = true;
                                }
                        }, (error) => { 
                            console.log(error); 
                            this.showAlertFail = true;
                        });
                    }
                }, (error) => console.log(error));
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

    emailValidation(emailCtrl: NgForm, email:string) {
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
