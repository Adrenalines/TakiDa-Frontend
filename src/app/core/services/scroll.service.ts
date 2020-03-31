import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public delay = 1000;
  public activeItemsCategory: Subject<string>;

  constructor() {
    this.activeItemsCategory = new Subject<string>();
  }
}
