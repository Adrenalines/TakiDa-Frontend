import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/types/types';
import { ApiService } from '../../core/services/api.service';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Observable<Category[]>;

  constructor(private apiService: ApiService) {
    this.categories = this.apiService.getCategories().pipe(
      map(categories => {
        return [
          categories[3], // Nigiri
          categories[4], // Rolls
          categories[1], // Hot rolls
          categories[6], // Sets
          categories[0], // Wok
          categories[7], // Soups
          categories[5], // Salads
          categories[2]  // Beverages
        ];
      }),
      shareReplay()
    );
  }
}
