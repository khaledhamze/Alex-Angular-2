import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(data: any, searchTerm: string, key: string): any {

    if (!data || !searchTerm) {
      return data;
    }

    return data.filter(d => d[key].toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
