import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/types/types';
import { ApiService } from '../../main/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  public categories: Observable<Category[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.categories = this.apiService.getCategories();
  }

}
