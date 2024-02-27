
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class ReservationEmployeeFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    term = term.toLowerCase();

    return items.filter((item) =>
      item.clientId.firstName.toLowerCase().includes(term) ||
      item.clientId.lastName.toLowerCase().includes(term) 
    );
  }
}
