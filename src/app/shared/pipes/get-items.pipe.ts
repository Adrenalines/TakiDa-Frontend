import { Pipe, PipeTransform } from '@angular/core';
import { Category, Item } from '../types/types';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getItems'
})
export class GetItemsPipe implements PipeTransform {
  constructor(private apiService: ApiService) {
  }

  transform(categories: Category[]): Category[] {
    if (!categories) {
      return;
    }
    categories.forEach(category => {
      const items: Observable<Item[]> = this.apiService.getItems(category.id);
      category.items = items;
    });
    return categories;
  }

}
