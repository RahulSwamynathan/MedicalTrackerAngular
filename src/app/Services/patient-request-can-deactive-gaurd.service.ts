import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PatientRequestComponent } from '../navigationComponents/patient-request/patient-request.component';

@Injectable()
export class PatientRequestCanDeactiveGaurdService implements CanDeactivate<PatientRequestComponent> {

  constructor() { }

  canDeactivate(component: PatientRequestComponent): boolean{
    if(component.getFormControl.dirty){
      return confirm("Are you sure do you want leave the form");
    }
    return true;
  }
}
