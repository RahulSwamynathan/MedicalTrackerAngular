import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchText: string): any[] | null {
    if (value != null && value.length > 0) {
        if (searchText != null) {
            let res: any[] = [];
            let index: number = 0;
            for (let i in value) {
                let result = value[i];
                if (JSON.stringify(result).toLowerCase().includes(searchText.toLowerCase())) {
                    res[index] = result;
                    index++;
                }
            }
            return res != null && res.length > 0 ? res : null
        }
        return value;
    }
    return null
}
}
