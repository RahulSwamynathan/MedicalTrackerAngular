import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitRange'
})
export class PageLimitPipe implements PipeTransform {

  transform(value: any[], count: string): any[] | null {
    if (value != null && value.length > 0 && parseInt(count) != 0) {
        if (value.length > parseInt(count)) {
            let array: any[] = [];
            for (let i = 0; i < parseInt(count); i++) {
                array[i] = value[i];
            }
            return array != null && array.length > 0 ? array : null;
        }
        return value;
    }
    return null;
}

}
