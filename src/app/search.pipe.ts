import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      // Customize this logic based on your object structure
      // In this example, we assume the object has a 'name' property to search in
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
