import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Item } from '../../shared/types/types';
import { CategoryService } from '../services/category.service';
import { ScrollService } from '../../core/services/scroll.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  public categories: Observable<Category[]>;
  public item: Item;
  public loadingError = new Subject<boolean>();

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.scrollService.delay = 1000;
    this.categories = this.categoryService.categories.pipe(
      catchError((error) => {
        console.error('Error loading categories and items', error);
        this.loadingError.next(true);
        return of(error);
      })
    );
  }

  public showPopup(event: MouseEvent, item: Item) {
    this.location.replaceState( '/item/' + item.name.split(' ').join('_'));
    event.preventDefault();
    event.stopPropagation();
    this.item = item;
  }

  public closePopup() {
    this.item = null;
    this.location.replaceState( '/');
  }
}
