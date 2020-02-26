import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() categoryName: string;
  @Input() itemName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
