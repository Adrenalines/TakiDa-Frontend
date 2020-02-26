import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/types/types';
import { ApiService } from '../../shared/services/api.service';
import { CategoryService } from '../../main/services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  public categories: Observable<Category[]>;

  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.categories;
  }

  ngOnInit(): void {

  }

}
