import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout-component',
  templateUrl: './main-layout-component.component.html',
  styleUrls: ['./main-layout-component.component.css']
})
export class MainLayoutComponent implements OnInit {

    role: string;
    user: string;

    constructor(private _route: Router) {
        this.user = localStorage.getItem('m-userName');
    }

    ngOnInit() {
        if (localStorage.getItem('m-role') != null) {
            this.role = localStorage.getItem('m-role').toLowerCase();
        }
        else {
            this._route.navigate(['/Layout/login']);
        }
    }
}
