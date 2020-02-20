import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  public rolls: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  public sets: string[] = ['9', '10', '11', '12', '13', '14', '15', '16'];
  public item: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public showPopup(event: MouseEvent, item: string) {
    this.location.replaceState( '/item/' + item);
    event.preventDefault();
    event.stopPropagation();
    this.item = item;
  }

  public closePopup() {
    this.item = '';
    this.location.replaceState( '/');
  }
}
