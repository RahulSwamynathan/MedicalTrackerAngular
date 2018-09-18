import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailvalidatorDirective,
    multi:true 
  }]
})
export class EmailvalidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new RegExp(re).test(control.value) == false ? { 'invalidEmail': true } : null;
  }

}
