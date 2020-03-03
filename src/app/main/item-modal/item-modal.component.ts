import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../shared/types/types';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.less'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ])
  ]
})
export class ItemModalComponent implements OnInit {
  @Input() item: Item;
  @Output() closedPopup: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public closePopup() {
    this.closedPopup.emit();
  }
}
