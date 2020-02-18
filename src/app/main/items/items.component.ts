import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  public rolls: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  public sets: string[] = ['9', '10', '11', '12', '13', '14', '15', '16'];

  constructor() { }

  ngOnInit(): void {
  }

  public showPopup() {

  }
}
