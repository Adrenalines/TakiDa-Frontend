import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
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
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });

    this.scrollService.activeItemsCategory.pipe(debounceTime(50)).subscribe(category => {
      if (category === null) {
        this.fragment = '';
      } else {
        this.fragment = category;
      }
    });
  }

  public forceScroll(category: Category) {
    this.fragment = category.name.split(' ').join('_');
    setTimeout(() => {
      document.querySelector('#' + this.fragment).scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}
