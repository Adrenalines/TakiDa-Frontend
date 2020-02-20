import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-popup',
  templateUrl: './item-popup.component.html',
  styleUrls: ['./item-popup.component.less']
})
export class ItemPopupComponent implements OnInit {
  @Input() itemCard: string;
  @Output() closedPopup = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.itemCard);
  }

  closePopup() {
    this.closedPopup.emit();
  }
}
