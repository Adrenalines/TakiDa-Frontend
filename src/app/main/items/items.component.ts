import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Item } from '../../shared/types/types';
import { ScrollService } from '../../core/services/scroll.service';
import { ApiService } from '../../core/services/api.service';
import { CategoryService } from '../../core/services/category.service';
import { WindowRefService } from '../../core/services/window-ref.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: [ './items.component.less' ]
})
export class ItemsComponent implements OnInit {
  public categories: Observable<Category[]>;
  public item: Item;
  public loadingError = new Subject<boolean>();
  public limit = 100;
  private anchors: HTMLCollectionOf<Element>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private location: Location,
    private windowRefService: WindowRefService,
    private apiService: ApiService,
    private categoryService: CategoryService,
    private scrollService: ScrollService
  ) {
    this.router.routeReuseStrategy.shouldDetach(undefined);
  }

  ngOnInit(): void {
    this.scrollService.delay = 1000;
    this.categories = isPlatformBrowser(this.platformId) ? this.categoryService.categories.pipe(
      catchError((error) => {
        console.error('Error loading categories and items', error);
        this.loadingError.next(true);
        return of(error);
      })
    )
    : null;

    this.anchors = this.document.getElementsByClassName('anchor');
  }

  public showPopup(event: MouseEvent, item: Item) {
    this.location.replaceState('/item/' + item.name.split(' ').join('_'));
    event.preventDefault();
    event.stopPropagation();
    this.item = item;
  }

  public closePopup() {
    this.item = null;
    this.location.replaceState('/');
  }

  @HostListener('window:scroll', [ '$event' ])
  private handleOutsideClick() {
    if (this.anchors && !this.anchors.length) {
      return;
    }
    for (let i = 1; i < this.anchors.length; i++) {
      if (isPlatformBrowser(this.platformId)) {
        if (this.windowRefService.nativeWindow.scrollY + this.windowRefService.nativeWindow.innerHeight / 3
          < (this.anchors[i] as HTMLElement).offsetTop &&
          this.windowRefService.nativeWindow.scrollY + this.windowRefService.nativeWindow.innerHeight / 3
          > (this.anchors[i - 1] as HTMLElement).offsetTop) {
          this.scrollService.activeItemsCategory.next(this.anchors[i - 1].id.split(' ').join('_'));
        }
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      if (this.windowRefService.nativeWindow.scrollY + this.windowRefService.nativeWindow.innerHeight / 3
        > (this.anchors[this.anchors.length - 1] as HTMLElement).offsetTop) {
        this.scrollService.activeItemsCategory.next(this.anchors[this.anchors.length - 1].id.split(' ').join('_'));
      }
    }
  }

}
