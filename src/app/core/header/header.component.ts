import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TELEPHONES } from '../../shared/data/telephones';
import { defaultLocale, LANGUAGES } from '../../shared/data/languages';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public languages = LANGUAGES;
  public defaultLocale = defaultLocale;
  public telephones = TELEPHONES;
  public mobileNav = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleMobileNav(show: boolean) {
    this.mobileNav = show;
  }

  public useLanguage(language: string) {
    localStorage.setItem('language', language);
    if (window.location.hash) {
      window.location.hash = '';
    }
    window.location.reload();
  }

  public returnZero() {
    return 0;
  }
}
