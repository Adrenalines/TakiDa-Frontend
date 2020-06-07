import { Component, OnInit } from '@angular/core';
import { ProfileInfoType } from '../../core/types/types';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  public profileInfo: ProfileInfoType = 'registration';

  constructor() { }

  ngOnInit(): void {
  }

}
