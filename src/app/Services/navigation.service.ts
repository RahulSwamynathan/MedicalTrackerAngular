import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IPatientDetails, IOptions } from '../navigationComponents/Interfaces/ipatient-request';
import { IMedicineDetails } from '../navigationComponents/Interfaces/imedicine-details';
import { IMedicalDetails } from '../navigationComponents/Interfaces/imedical-details';
import { CommonService } from '../Services/common.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/toPromise';
import * as globalVariable from '../global.variables';

@Injectable()
export class NavigationService {

    constructor(private _http: Http,
        private _commonService: CommonService) {

    }

    getPatientStatusOptions(): Observable<IOptions[]> {
        let URL = globalVariable.apiBaseUrl + globalVariable.getStatusOptionsURL;
        return this._http.get(URL, { headers: this._commonService.getHeaders() })
            .map((response: Response) => <IOptions[]>JSON.parse(response.json()))
            .catch(this._commonService.handleError);
    }

    insertUpdatePatientDetail(patientDetail: IPatientDetails, action: globalVariable.actionType): Observable<string> {
        let URL = globalVariable.apiBaseUrl;
        switch (action) {
            case globalVariable.actionType.insert:
                URL += globalVariable.insertPatientDetailURL;
                break;
            case globalVariable.actionType.doc:
                URL += globalVariable.updateDoctorStatusURL;
                break;
            case globalVariable.actionType.delivery:
                URL += globalVariable.updateDeliveryStatusURL;
                break;
        }
        return this._commonService.responseStatusAsString(this._http.post(URL, patientDetail, { headers: this._commonService.getHeaders() }));
    }

    singleRequest(id: string): Observable<IPatientDetails> {
        let URL = globalVariable.apiBaseUrl + globalVariable.getPatientdetailURL;
        return this._http.post(URL, id, { headers: this._commonService.getHeaders() })
            .map((response: Response) => <IPatientDetails>response.json())
            .catch(this._commonService.handleError)
    }

    requestByStatus(email: string, status: string, sortColum?: string, pageNo?: number, pageSize?: number): Observable<any[]> {
        if (status.toLowerCase() === 'allrequest') {
            let URL = `${globalVariable.apiBaseUrl + globalVariable.allRequestURL + email}&sortColumn=${sortColum}&pageNo=${pageNo}&pageSize=${pageSize}`; 
            return this._http.get(URL, { headers: this._commonService.getHeaders() })
                .map((response: Response) => {
                    return <any[]>response.json();
                })
                .catch(this._commonService.handleError);
        }
        let postObj = {
            Email: email,
            Status: status
        }
        let URL = globalVariable.apiBaseUrl + globalVariable.getPatientDetailStatusURL;
        return this._http.post(URL, postObj, { headers: this._commonService.getHeaders() })
            .map((response: Response) => <IPatientDetails[]>response.json())
            .catch(this._commonService.handleError);
    }

    getMedicalDetails(email: string): Observable<IMedicalDetails[]> {
        let URL = globalVariable.apiBaseUrl + globalVariable.getPatientMedicalDetailsURL;
        return this._http.post(URL, JSON.stringify(email), { headers: this._commonService.getHeaders() })
            .map((res: Response) => <IMedicalDetails[]>res.json())
            .catch(this._commonService.handleError);
    }

    deletePatientDetail(id: string): Promise<string> {
        let URL = globalVariable.apiBaseUrl + globalVariable.deletePatientMedicalDetailsURL + id;
        return this._http.delete(URL, { headers: this._commonService.getHeaders() })
            .map((response: Response) => response.status.toString())
            .catch(this._commonService.handleError)
            .toPromise();
    }

    undoPatientDetail(id: string): Promise<string> {
        let URL = globalVariable.apiBaseUrl + globalVariable.undoPatientMedicalDetailsURL + id;
        return this._http.get(URL, { headers: this._commonService.getHeaders() })
            .map((response: Response) => response.status.toString())
            .catch(this._commonService.handleError)
            .toPromise();
    }

    getMedicines(): Observable<IMedicineDetails[]> {
        let URL = globalVariable.apiBaseUrl + globalVariable.getMedicineDetailsURL;
        return this._http.get(URL, { headers: this._commonService.getHeaders() })
            .map((response: Response) => <IMedicineDetails[]>response.json())
            .catch(this._commonService.handleError);
    }

    insertMedicines(value: IMedicineDetails): Observable<string> {
        let URL = globalVariable.apiBaseUrl + globalVariable.insertMedicineDetailsURL;
        
        return this._commonService.responseStatusAsString(this._http.post(URL, value, { headers: this._commonService.getHeaders() }));
    }

    insertUpdateUserWords(id: number, value: string, email: string){
        let URL = globalVariable.apiBaseUrl + globalVariable.insertUpdateUsersDataURL + email + "&eventType=" + id;
        return this._commonService.responseReaderAsString(this._http.post(URL, JSON.stringify(value), { headers: this._commonService.getHeaders() }));
    }
}
