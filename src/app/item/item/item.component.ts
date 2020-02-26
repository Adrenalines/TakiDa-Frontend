import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Category, Item } from '../../shared/types/types';
import { ApiService } from '../../shared/services/api.service';
import { CategoryService } from '../../main/services/category.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit, OnDestroy {
  public item: Item;
  public categoryName = '';

  private categoriesSub: SubscriptionLike;
  private itemsSubs: SubscriptionLike[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    const name = this.route.snapshot.params.name;
    this.categoriesSub = this.categoryService.categories.subscribe((categories: Category[]) => {
      categories.forEach(category => this.itemsSubs.push(this.apiService.getItems(category.id)
        .subscribe((items: Item[]) => {
          items.forEach(item => {
            if (item.name.split(' ').join('_') === name) {
              this.item = item;
              this.categoryName = category.name;
            }
          });
        })));
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    this.itemsSubs.forEach(itemSub => {
      if (itemSub) {
        itemSub.unsubscribe();
      }
    });
  }


}
