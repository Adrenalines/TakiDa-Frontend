import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { defaultLocale } from '../config/languages';
import { TITLES } from '../config/titles';
import { DESCRIPTIONS } from '../config/meta-descriptions';
import { KEYWORDS } from '../config/meta-keywords';


@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private defaultLocale: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta
  ) { }

  public setSEO(page: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.defaultLocale = localStorage.getItem('language') || defaultLocale;
    }
    this.titleService.setTitle(TITLES[page][this.defaultLocale]);
    this.metaService.updateTag({ name: 'description', content: DESCRIPTIONS[page][this.defaultLocale] });
    this.metaService.updateTag({ name: 'keywords', content: KEYWORDS[page][this.defaultLocale] });
  }

}
