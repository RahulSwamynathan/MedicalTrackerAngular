import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(value: any[], propName: string, orderType: boolean): any | null  {
    if(value != null){
      if(propName != null){
        return value.sort(this.compare(propName, orderType));
      }
      return value;
    }
    return null;
  }

  compare(attr: string, value: boolean){
    if(value){
      return function(a,b){
        var x = (a[attr] === null) ? "" : "" + a[attr],
        y = (b[attr] === null) ? "" : "" + b[attr];
        return x < y ? -1 :(x > y ? 1 : 0)
      }
    }
    else {
      return function(a,b){
        var x = (a[attr] === null) ? "" : "" + a[attr],
        y = (b[attr] === null) ? "" : "" + b[attr];
        return x < y ? 1 :(x > y ? -1 : 0)
      }
    }
  }
}
