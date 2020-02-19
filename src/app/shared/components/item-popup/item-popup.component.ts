import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-popup',
  templateUrl: './item-popup.component.html',
  styleUrls: ['./item-popup.component.less']
})
export class ItemPopupComponent implements OnInit {
  @Input() itemCard: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.itemCard);
  }

}
