import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatientDetails, IOptions } from '../Interfaces/ipatient-request';
import { NgForm } from '@angular/forms';
import { NavigationService } from '../../Services/navigation.service';
import { IMedicineDetails } from '../Interfaces/imedicine-details';
import { actionType, loginRoutes, statusCodes } from '../../global.variables';

@Component({
  selector: 'app-patient-request',
  templateUrl: './patient-request.component.html',
  styleUrls: ['./patient-request.component.css']
})
export class PatientRequestComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _service: NavigationService) {
  }

  @ViewChild('formControl')
  public getFormControl: NgForm;

  private _email: string;
  private _placeholder: string;
  autoComp: boolean = false;
  looping: any[];
  numberPattern: string = "^[0-9]*$"
  request: IPatientDetails = {
    PatientId: null,
    PatientName: null,
    PatientAge: null,
    PatientGender: null,
    PatientConcern: null,
    PatientHeight: null,
    PatientWeight: null,
    Status: "Requested",
    Email: null,
    Comments: null,
    MedicineName: '',
    Delivery: '',
    Dob: null
  }
  role: string;
  medicineTable: boolean = false;
  medicineList: IMedicineDetails[];
  patientId: string;
  patientStatusOptions: IOptions[];
  search: string;
  pageSize: string = "5";

  ngOnInit() {
    if (localStorage.getItem('m-role') != null) {
      this.role = localStorage.getItem('m-role').toLowerCase();
      this._service.getPatientStatusOptions().subscribe((result) => this.patientStatusOptions = result, (error) => console.log(error));
    }
    this._email = localStorage.getItem('m-email');
    this.patientId = this._activatedRoute.snapshot.paramMap.get('patientId');
    if (this.patientId != null) {
      this._service.singleRequest(this.patientId)
        .subscribe((response) => {
          if (response != null) {
            response.PatientGender = response.PatientGender.toLowerCase();
            response.PatientId = this.patientId;
            switch (response.Status.toLowerCase()) {
              case "requested":
                response.MedicineName = '';
                response.Delivery = '';
                this.request = response;
                break;
              case 'approved by doctor':
                response.Delivery = '';
                this.request = response;
                break;
              case 'approved':
                this.request = response;
                break;
            }
          }
        },
          (error) => {
            console.error(error);
          });
    }
  }

  captureMedicine(medName: string) {
    (this.request.MedicineName == null || this.request.MedicineName == "") && this.request.MedicineName.toLowerCase() != medName.toLowerCase()
      ? this.request.MedicineName = medName : this.request.MedicineName = null; this.request.MedicineName = medName;
  }

  getMedicine() {
    this.medicineTable = this.medicineTable ? false : true;
    if (this.medicineTable) {
      this._service.getMedicines().subscribe((result) => this.medicineList = result,
        (error) => console.log(error));
    }
  }

  statusTrigger() {
    if (this.role == 'doctor') {
      this.request.Comments != null ? this.request.Status = 'Approved by Doctor' : this.request.Status = 'Requested';
    }
    if (this.role == 'pharmacist') {
      this.request.Delivery != '' && this.request.Delivery != null ? this.request.Status = 'Approved' : this.request.Status = 'Approved by Doctor';
    }
  }

  submitDetails(formContrl: NgForm, newRequest: IPatientDetails) {
    if (formContrl.valid) {
      if (this._email != null) {
        newRequest.Email = this._email;
        this.patientId != null ? newRequest.PatientId = this.patientId : newRequest.PatientId = null;
        if ((this.role == 'patient') && (newRequest.Email != null)) {
          this.actionMethod(newRequest, actionType.insert, statusCodes.Created, loginRoutes.patientLogin + '/requested');
        }
        if (this.role == 'doctor' && newRequest.Comments != null) {
          this.actionMethod(newRequest, actionType.doc, statusCodes.Ok, loginRoutes.doctorLogin);
        }
        if (this.role == 'pharmacist' && newRequest.Delivery != null) {
          this.actionMethod(newRequest, actionType.delivery, statusCodes.Ok, loginRoutes.pharmacistLogin);
        }
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

  private actionMethod(request: IPatientDetails, action: actionType, returnStatus: string, navigation: string): void {
    let response: string;
    this._service.insertUpdatePatientDetail(request, action)
      .subscribe((result) => {
        response = result;
      },
        (error) => {
          console.log(error);
        },
        () => {
          if (response != null && response == returnStatus) {
            this.getFormControl.reset();
            this._router.navigate([navigation]);
          }
        })
  }

  cancelForm(formData: NgForm) {
    this.autoComp = false;
    if (formData.enabled) {
      formData.form.removeControl('state');
      formData.form.reset();
    }
  }

  getWords(event: KeyboardEvent, userData: string) {
    this.autoComp = false;
    let splitlength = userData.trim().split(" ").length;
    if (event.keyCode == 32 && userData.trim() != "") {
      this._service.insertUpdateUserWords(event.keyCode, userData.split(" ")[splitlength - 1], this._email).subscribe();
    }
    if (event.keyCode !== 32 && event.keyCode !== 8 && userData.trim() != "") {
      let val = userData.includes(" ") ? userData.split(" ")[splitlength - 1].trim() : userData;
      this._service.insertUpdateUserWords(event.keyCode, val, this._email).subscribe((result) => {
        if (result.trim().toLocaleLowerCase() == "no data") {
          this.looping = [];
          this.autoComp = false;
        }
        else {
          this.looping = result.split('|')
          this.autoComp = true;
        }
      });
    }
  }

  appendData(item: string) {
    if (item != "" && item) {
      let currentItem = this._placeholder
      if (currentItem && !currentItem.trim().includes(" ")) {
        this.request.PatientConcern = item + " ";
      }
      else if (currentItem && currentItem.trim().includes(" ")) {
        this.request.PatientConcern = currentItem.substring(0, currentItem.lastIndexOf(" ")) + " " + item + " ";
      }
      else {
        this.request.PatientConcern = item + " ";
      }
      this.autoComp = false;
    }
  }

  hoverEvent(event: Event, curntItem?: string) {
    switch (event.type) {
      case "mouseover":
        this._placeholder = this.request.PatientConcern;
        if (this._placeholder && !this._placeholder.trim().includes(" ")) {
          this.request.PatientConcern = curntItem + " ";
        }
        if (this._placeholder && this._placeholder.trim().includes(" ")) {
          this.request.PatientConcern = this._placeholder.substring(0, this._placeholder.lastIndexOf(" ")) + " " + curntItem + " ";
        }
        break;
      case "mouseout":
        this.request.PatientConcern = this._placeholder;
        break;
    }
  }
}
