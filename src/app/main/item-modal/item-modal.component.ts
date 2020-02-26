import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../shared/types/types';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.less']
})
export class ItemModalComponent implements OnInit {
  @Input() item: Item;
  @Output() closedPopup: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.closedPopup.emit();
  }
}
