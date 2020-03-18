import { Component, HostListener, OnInit } from '@angular/core';
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
  private anchors: HTMLCollectionOf<Element>;

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

    this.anchors = document.getElementsByClassName('anchor');
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

  @HostListener('window:scroll', [ '$event' ])
  private handleOutsideClick(event) {
    setTimeout(() => {
      for (let i = 1; i < this.anchors.length; i++) {
        if (window.scrollY + window.innerHeight / 3 < (this.anchors[i] as HTMLElement).offsetTop &&
          window.scrollY + window.innerHeight / 3 > (this.anchors[i - 1] as HTMLElement).offsetTop) {
          this.scrollService.activeItemsCategory.next(this.anchors[i - 1].id.split(' ').join('_'));
        }
      }
      if (window.scrollY + window.innerHeight / 3 > (this.anchors[this.anchors.length - 1] as HTMLElement).offsetTop) {
        this.scrollService.activeItemsCategory.next(this.anchors[this.anchors.length - 1].id.split(' ').join('_'));
      }
    }, 10);

  }
}
