import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../shared/types/types';
import { ApiService } from '../services/api.service';
import { CategoryService } from '../../main/services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  public categories: Observable<Category[]>;
  public loadingError = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.categories.pipe(
      catchError((error) => {
        console.error('Error loading categories and items', error);
        this.loadingError.next(true);
        return of(error);
      })
    );
  }

  ngOnInit(): void {

  }

}
