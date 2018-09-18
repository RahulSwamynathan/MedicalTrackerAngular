import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCompareValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareValidatorDirective,
    multi: true
  }]
})
export class CompareValidatorDirective implements Validator {

  @Input('appCompareValidator') valueToCompare;
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const cmpCtrl = control.parent.get(this.valueToCompare);
    if (cmpCtrl.value != null && cmpCtrl.value != "" && cmpCtrl.value != control.value) {
      return { "compare": true }
    }
    return null;
  }

}
