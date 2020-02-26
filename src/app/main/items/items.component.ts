import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Category, Item } from '../../shared/types/types';
import { ApiService } from '../../shared/services/api.service';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  public categories: Observable<Category[]>;
  public item: Item;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.categories;
  }

  ngOnInit(): void {
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
