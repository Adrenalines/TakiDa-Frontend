import { Component, OnInit } from '@angular/core';
import { Languages } from '../../shared/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  languages = Object.keys(Languages).filter(k => typeof Languages[k as any] === 'number');

  constructor() { }

  ngOnInit(): void {
  }

}
