import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../../shared/types/types';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Observable<Category[]>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService
  ) {
    this.categories = isPlatformBrowser(this.platformId) ? this.apiService.getCategories().pipe(
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
    )
    : null;
  }
}
