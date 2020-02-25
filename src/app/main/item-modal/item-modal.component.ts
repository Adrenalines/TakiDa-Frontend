import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.less']
})
export class ItemModalComponent implements OnInit {
  @Input() itemCard: string;
  @Output() closedPopup: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.itemCard);
  }

  closePopup() {
    this.closedPopup.emit();
  }
}
