import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.less']
})
export class ItemCardComponent implements OnInit {
  @Input() itemCard: string;

  item: number;

  constructor() {
  }

  ngOnInit(): void {
    this.item = +this.itemCard;
    console.log(this.item);
  }

}
