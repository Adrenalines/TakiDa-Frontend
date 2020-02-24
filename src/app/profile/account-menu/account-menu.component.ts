import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.less']
})
export class AccountMenuComponent implements OnInit {
  @Output() profileInfoType = new EventEmitter();
  public profileInfo: 'registration' | 'address' | 'history' = 'registration';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleProfileInfoType(profileInfo: 'registration' | 'address' | 'history' = 'registration') {
    this.profileInfo = profileInfo;
    this.profileInfoType.emit(profileInfo);
  }
}
