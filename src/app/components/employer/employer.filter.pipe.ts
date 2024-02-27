import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    term = term.toLowerCase();

    return items.filter((item) =>
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.contact.toLowerCase().includes(term)
    );
  }
}
