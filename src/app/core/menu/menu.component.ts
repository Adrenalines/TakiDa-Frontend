import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subject, SubscriptionLike } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { Category } from '../types/types';
import { ScrollService } from '../services/scroll.service';
import { ApiService } from '../services/api.service';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit, OnDestroy {
  public categories: Observable<Category[]>;
  public loadingError = new Subject<boolean>();
  public fragment: string;
  private routerSub: SubscriptionLike;
  private scrollSub: SubscriptionLike;

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService,
    private categoryService: CategoryService,
    private scrollService: ScrollService
  ) {
    this.categories = isPlatformBrowser(this.platformId) ? this.categoryService.categories.pipe(
      catchError((error) => {
        console.error('Error loading categories and items', error);
        this.loadingError.next(true);
        return of(error);
      })
    )
    : null;
  }

  ngOnInit(): void {
    this.routerSub = this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });

    this.scrollSub = this.scrollService.activeItemsCategory.pipe(
      debounceTime(50)
    ).subscribe(category => {
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

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }
}
