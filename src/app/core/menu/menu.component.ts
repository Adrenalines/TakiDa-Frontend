import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, pipe, Subject } from 'rxjs';
import { catchError, debounce, debounceTime, delay, last, takeLast } from 'rxjs/operators';
import { Category } from '../../shared/types/types';
import { ApiService } from '../services/api.service';
import { CategoryService } from '../../main/services/category.service';
import { ScrollService } from '../services/scroll.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  public categories: Observable<Category[]>;
  public loadingError = new Subject<boolean>();
  public fragment: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private categoryService: CategoryService,
    private scrollService: ScrollService
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

    this.scrollService.activeItemsCategory.pipe(debounceTime(50)).subscribe(category => {
      if (category === null) {
        this.fragment = '';
      } else {
        this.fragment = category.id;
      }
    });
  }

}
