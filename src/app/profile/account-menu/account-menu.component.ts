import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileInfoType } from '../../core/types/types';


@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.less']
})
export class AccountMenuComponent implements OnInit {
  @Output() profileInfoType: EventEmitter<ProfileInfoType> = new EventEmitter<ProfileInfoType>();
  public profileInfo: ProfileInfoType = 'registration';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleProfileInfoType(profileInfo: ProfileInfoType = 'registration') {
    this.profileInfo = profileInfo;
    this.profileInfoType.emit(profileInfo);
  }
}
