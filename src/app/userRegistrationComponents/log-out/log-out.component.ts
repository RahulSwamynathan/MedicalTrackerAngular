import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-log-out',
    templateUrl: './log-out.component.html',
    styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

    constructor(private _router: Router) {

    }

    storageClear: boolean = false;

    ngOnInit() {
        if (localStorage.getItem('m-role') != null) {
            localStorage.removeItem('m-role');
            this.storageClear = true;
        }
        if (localStorage.getItem('m-email') != null) {
            localStorage.removeItem('m-email');
            this.storageClear = true;
        }
        if (this.storageClear) {
            localStorage.clear();
            setTimeout(() => {
                this._router.navigate(['/Layout/login']);
            }, 2000);
        }
    }
}
