import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.less']
})
export class DeliveryInfoComponent implements OnInit {
  public telephones = TELEPHONES;

  constructor() { }

  ngOnInit(): void {
  }

}
