import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatientDetails, IOptions } from '../Interfaces/ipatient-request';
import { NavigationService } from '../../Services/navigation.service';
import { statusCodes } from '../../global.variables';

@Component({
  selector: 'app-request-by-status',
  templateUrl: './request-by-status.component.html',
  styleUrls: ['./request-by-status.component.css']
})
export class RequestByStatusComponent implements OnInit {

    private patientDetails: IPatientDetails[];
    private email: string;

    patientStatusOptions: IOptions[];
    status: string = "Requested";
    listOfDetails: IPatientDetails[];
    getPatientId: number;
    pageSize: string = "10";
    getpageNumber:  number = 1;
    getSortColumn: string = 'patientname asc'
    getPageSize: number = Number(this.pageSize);
    startIndex: number = 0;
    search: string;
    requestType: string;
    role: string;
    listCount: number = 0;
    pageCount: number[];
    dismissible: boolean = true;
    showAlert: boolean = false;

    prevCount: number = 0;
    btnOne: number = 1;
    btnTwo: number = 2;
    btnThree: number = 3;
    nextCount: number = 2;

    startEntry: number = 1;
    lastEntry: number = this.getPageSize;

    getPageNo: number;
    sortType: boolean = true;
    colName: string = 'PatientName';

    constructor(private _activateRoute: ActivatedRoute,
      private _service: NavigationService) {

    }

    ngOnInit() {
      if (localStorage.getItem('m-role') != null) {
        this._service.getPatientStatusOptions().subscribe((result) => this.patientStatusOptions = result, (error) => console.log(error));
        this.role = localStorage.getItem('m-role').toLowerCase();
        this.email = localStorage.getItem('m-email');
        let request = this._activateRoute.snapshot.routeConfig.path;
        switch (request) {
          case "requested":
            this.status = "Requested";
            break;
          case "approvedRequest":
            this.status = "Approved";
            break;
          case "approvedDoctor":
            this.status = "Approved by Doctor";
            break;
        }
        this.requestType = request != 'allRequest' ? this.status : 'allRequest';
        if (this.requestType != null) {
          this._service.requestByStatus(this.email, this.requestType, this.getSortColumn, this.getpageNumber, this.getPageSize)
            .subscribe((res) => {
              this.listOfDetails = JSON.parse(res[0]);
              if (this.listOfDetails != null) {
                this.listCount = JSON.parse(res[1])[0].RecordsCount;
                this.getingNoOfPages();
                this.getPageNo = 1;
                this.loopingPageNo(this.getPageNo);
              }
            },
              (error) => {
                console.error(error);
              })
        }

      }
    }

    /**
     * Geting page numbers as an array
     */
    getingNoOfPages() {
      if (this.listCount > 0) {
        let paginationOn = Math.floor((this.listCount + parseInt(this.pageSize) - 1) / parseInt(this.pageSize));
        this.pageCount = [];
        for (let i = 0; i < paginationOn; i++) {
          this.pageCount[i] = i + 1;
        }
      }
    }
    
    /**
     * Pagination Event triggering
     * @param pageNo
     */
    pagination(pageNo: number, action: string) {
      this.getPageNo = pageNo;
      switch (action.toLowerCase()) {
        case 'nex':
          this.incNdDecBtn(true);
          break;
        case 'pre':
          this.incNdDecBtn(false);
          break;
      }
      this.loopingPageNo(pageNo);
      let pageCount = (pageNo - 1) * parseInt(this.pageSize);
      // this.lastEntry = pageCount != 0 ? pageCount + parseInt(this.pageSize) : this.getPageSize;
      // this.startEntry = (this.lastEntry - parseInt(this.pageSize)) + 1;
      this._service.requestByStatus(this.email, this.requestType)
        .subscribe((res) => {
          if (res != null && res.length > 0 && pageCount != 0) {
            let result: any[] = [];
            let index: number = 0;
            for (let ar = pageCount; ar < res.length; ar++) {
              result[index] = res[ar];
              index++
            }
            this.listOfDetails = result;
          }
          else {
            this.listOfDetails = res;
          }
        },
          (error) => {
            console.error(error);
          })
    }

    private incNdDecBtn(value: boolean) {
      if (value && this.btnOne != this.nextCount && this.btnTwo != this.nextCount &&
        this.btnThree != this.nextCount) {
        this.prevCount = this.btnOne;
        this.btnOne += 1;
        this.btnTwo += 1;
        this.btnThree += 1;

      }
      else if (!value && this.btnOne != this.prevCount && this.btnTwo != this.prevCount &&
        this.btnThree != this.prevCount) {
        this.nextCount = this.btnThree;
        this.btnOne -= 1;
        this.btnTwo -= 1;
        this.btnThree -= 1;
      }
    }

    loopingPageNo(pageNo: number) {
      let nextBool: boolean = false;
      if (pageNo > this.nextCount && !nextBool) {
        this.nextCount = pageNo + this.nextCount;
        nextBool = true;
      }
      if (pageNo == this.nextCount && !nextBool) {
        this.nextCount = this.nextCount + 1;
        nextBool = true;
      }
      if (this.nextCount > pageNo && pageNo != this.nextCount && !nextBool) {
        this.nextCount = (this.nextCount + pageNo) - (this.nextCount - 1);
        nextBool = true;
      }

      let prevBool: boolean = false;
      if (pageNo > this.prevCount && !prevBool) {
        this.prevCount = pageNo - 1;
        prevBool = true;
      }
      if (pageNo == this.prevCount && !prevBool) {
        this.prevCount = this.prevCount - 1;
        prevBool = true;
      }
      if (this.prevCount > pageNo && pageNo != this.prevCount && !prevBool) {
        let value = (this.prevCount - 1) + pageNo;
        this.prevCount = value - this.prevCount;
        prevBool = true;
      }
    }

    /**
     * Seraching the list data
     * @param value 
     */
    serachFunctionality(value: string) {
      if (value != null) {
        this.getPatientDetails();
        if (this.patientDetails != null && this.patientDetails.length > 0 && value != null) {
          let result: any[] = [];
          let index: number = 0;
          this.patientDetails.forEach(function(element, i){
            if (JSON.stringify(element).toLowerCase().includes(value.toLowerCase())) {
              result[index] = element;
              index++;
            }
          })
          this.listCount = result.length;
          this.listOfDetails = result;
          this.getingNoOfPages();
          this.getPageNo = 1;
          this.loopingPageNo(this.getPageNo);
        }
        else {
          this.listOfDetails = this.patientDetails;
        }
      }
      else {
        this.ngOnInit();
      }
    }

    /** 
     * Getting patient details and appending to patientDetails property
    */
    getPatientDetails() {
      this._service.requestByStatus(this.email, this.requestType)
        .subscribe((res) => {
          this.patientDetails = res;
        },
          (error) => {
            console.error(error);
          })
    }

    requestChange() {
      this.requestType = this.status;
      if (this.requestType != null) {
        this._service.requestByStatus(this.email, this.requestType)
          .subscribe((res) => {
            this.listOfDetails = res;
            if (this.listOfDetails != null) {
              this.listCount = this.listOfDetails.length;
              this.getingNoOfPages();
            }
          },
            (error) => {
              console.error(error);
            })
      }
    }

    deleteRequest(patientId: number) {
      if (patientId != 0 && patientId > 0) {
        this.getPatientId = patientId;
        this.deletePatientDetail(patientId.toString());
      }
      this.showAlert = false;
    }

    undoPatientRequest(id: number) {
      if (id != 0 && id > 0) {
        this._service.undoPatientDetail(id.toString()).then((result) => {
          if (result == statusCodes.Ok) {
            this.showAlert = false;
            this.ngOnInit();
          }
        }).catch((error) => console.log(error));
      }
    }

    sortingPatientDetails(value: string) {
      this.sortType = this.colName.toLowerCase() === value.toLowerCase() ? !this.sortType : false;
      this.colName = value;
    }

    private deletePatientDetail(id: string) {
      if (id != null) {
        this._service.deletePatientDetail(id).then((result) => {
          if (result == statusCodes.Ok) {
            this.showAlert = true;
            this.ngOnInit();
          }
        }).catch((error) => console.log(error));
      }
    }
}
