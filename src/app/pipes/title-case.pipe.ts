import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'changetotitlecase'
})
export class TitleCasePipe implements PipeTransform {

    transform(value: string): string | null {
        if (value != null) {
            if (value.includes(" ")) {
                let data = value.split(" ");
                let findString = "";
                for (let split in data) {
                    findString += data[split].toLowerCase().charAt(0).toUpperCase() +
                        data[split].toLowerCase().slice(1, data[split].toLowerCase().length) + " ";
                }
                return findString.trim();
            }
            return value.toLowerCase().charAt(0).toUpperCase() +
                value.toLowerCase().slice(1, value.toLowerCase().length).trim();
        }
        return null;
    }
}
