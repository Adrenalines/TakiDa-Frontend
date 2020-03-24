import { Pipe, PipeTransform } from '@angular/core';
import { Category, Item, ItemsResponse } from '../types/types';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getItems'
})
export class GetItemsPipe implements PipeTransform {
  constructor(private apiService: ApiService) {
  }

  transform(categories: Category[], limit: number, offset: number): Category[] {
    if (!categories || !Array.isArray(categories)) {
      return;
    } else {
      categories.forEach(category => {
        const items: Observable<ItemsResponse> = this.apiService.getItems(category.id, limit, offset);
        category.items = items;
        category.limit = window.screen.width < 930 ? 4 : 4;
      });
      return categories;
    }
  }

}
