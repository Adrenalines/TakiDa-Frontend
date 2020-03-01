import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/types/types';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Observable<Category[]>;

  constructor(private apiService: ApiService) {
    this.categories = this.apiService.getCategories();
  }
}
