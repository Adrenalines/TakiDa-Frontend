import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.less']
})
export class DeliveryComponent implements OnInit {
  telephones = TELEPHONES;

  constructor() { }

  ngOnInit(): void {
  }

}
