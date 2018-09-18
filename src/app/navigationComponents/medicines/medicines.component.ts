import { Component, OnInit } from '@angular/core';
import { NavigationService } from "../../Services/navigation.service";
import { IMedicineDetails } from "../Interfaces/imedicine-details";

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  constructor(private _service: NavigationService) {

  }

  medicineList: IMedicineDetails[];
  search: string;
  pageSize: string = "10";

  ngOnInit() {
    if (localStorage.getItem('m-role') != null) {
      this._service.getMedicines().subscribe((result) => this.medicineList = result,
        (error) => console.log(error));
    }
  }
}
