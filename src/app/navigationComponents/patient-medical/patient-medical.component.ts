import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationService } from "../../Services/navigation.service";
import { IMedicalDetails } from "../Interfaces/imedical-details";

@Component({
  selector: 'app-patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.css']
})
export class PatientMedicalComponent implements OnInit {

  constructor(private _route: Router,
    private _service: NavigationService) {

  }

  patientMedicalDetail: IMedicalDetails[];
  search: string;
  pageSize: string = "10";

  ngOnInit() {
    if (localStorage.getItem('m-role') != null) {
      let email = localStorage.getItem('m-email');
      this._service.getMedicalDetails(email)
        .subscribe((result) => this.patientMedicalDetail = result, (error) => console.error(error));
    }
  }
}
