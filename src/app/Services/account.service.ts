import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from './common.service';
import { Iregistration } from '../userRegistrationComponents/interfaces/iregistration';
import { IReset } from '../userRegistrationComponents/interfaces/iforget';
import * as globalVariables from '../global.variables';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AccountService {

  constructor(private _http: Http,
    private _common: CommonService) {

  }

  loginValidation(loginCrenditials: object): Observable<Iregistration> {
    let URL = globalVariables.apiBaseUrl + globalVariables.loginURL;
    return this._http.post(URL, loginCrenditials, { headers: this._common.getHeaders() })
      .map((response: Response) => <Iregistration>response.json())
      .catch(this._common.handleError);
  }

  newRegistaration(detail: object): Observable<string> {
    let URL = globalVariables.apiBaseUrl + globalVariables.registerURL;
    return this._common.responseReaderAsString(this._http.post(URL, detail, { headers: this._common.getHeaders() }));
  }

  resetPassword(details: object): Observable<string> {
    let URL = globalVariables.apiBaseUrl + globalVariables.resetPasswordURL;
    return this._common.responseReaderAsString(this._http.post(URL, details, { headers: this._common.getHeaders() }));
  }

  emailValidation(email: string): Observable<string> {
    let URL = globalVariables.apiBaseUrl + globalVariables.emailValidationURL + email;
    return this._common.responseReaderAsString(this._http.get(URL, { headers: this._common.getHeaders() }));
  }

  getPassword(email: string): Observable<string>{
    let URL = globalVariables.apiBaseUrl + globalVariables.getPasswordURL + email;
    return this._common.responseReaderAsString(this._http.get(URL, { headers: this._common.getHeaders() }));
  }

  passwordEmailTrigger(detail : IReset): Observable<string>{
    let URL = globalVariables.apiBaseUrl + globalVariables.emailTriggerURL;
    return this._common.responseReaderAsString(this._http.post(URL, detail, { headers: this._common.getHeaders() }));
  }
}
