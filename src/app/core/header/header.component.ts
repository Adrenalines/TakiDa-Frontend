import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';
import { LANGUAGES } from '../../shared/data/languages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public languages = LANGUAGES;
  public telephones = TELEPHONES;
  public mobileNav = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleMobileNav(show: boolean) {
    this.mobileNav = show;
  }
}
