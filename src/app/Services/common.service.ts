import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/Observable/throw';
import * as globalVariables from '../global.variables';

@Injectable()
export class CommonService {

    constructor() {

    }

    validateEmail(email: string): boolean {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return new RegExp(re).test(email);
    }
    
    /**
     * Returns the response as a string of response
     * @param response 
     */
    responseReaderAsString(response: Observable<Response>): Observable<string> {
        return response.map((res: Response) => <string>res.json())
            .catch(this.handleError);
    }

    /**
     * Status of the response will be retruned as a string of response
     * @param response 
     */
    responseStatusAsString(response: Observable<Response>): Observable<string> {
        return response.map((response: Response) => response.status.toString())
            .catch(this.handleError);
    }

    /**
     * Retrun the headers with content-type and authorization 
     */
    getHeaders(): Headers {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", globalVariables.apiAuth);
        return headers;
    }

    /**
     * Just throws the error
     * @param error 
     */
    errorHandle(error: Response) {
        throw error;
    }

    /**
     * Throws the error Observable
     * @param error 
     */
    handleError(error: Response) {
        return Observable.throw(error);
    }

    setCookiee(cookieeName: string, cookieeValue: string, expiryDays?: any): void {
        if (expiryDays != null) {
            var date = new Date();
            date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + date.toUTCString();
            document.cookie = cookieeName + "=" + cookieeValue + ";" + expires + ";path=/";
        }
        else {
            document.cookie = cookieeName + "=" + cookieeValue + "path=/";
        }
    }

    getCookiee(cookieeName: string): string {
        var name = cookieeName + "=";
        var currentCookiee = document.cookie.split(';');
        for (var i = 0; i < currentCookiee.length; i++) {
            var c = currentCookiee[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    deleteCookiee(cookieeName: string): void {
        document.cookie = cookieeName + "=" + null + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /** 
     * Creates a timestamp for the authorziation header
    */
    private timeStamp(): string {
        return globalVariables.apiAuth.concat(new Date(Date.now()).toLocaleDateString().replace('/', '-').replace("/", "-"));
    }
}
