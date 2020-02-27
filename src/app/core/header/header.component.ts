import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style } from '@angular/animations';
import { TELEPHONES } from '../../shared/data/telephones';
import { defaultLocale, LANGUAGES } from '../../shared/data/languages';
import { BasketService } from '../../shared/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @ViewChild('basketElement') basketElement: ElementRef;
  public languages = LANGUAGES;
  public defaultLocale = defaultLocale;
  public telephones = TELEPHONES;
  public mobileNav = false;
  public itemsCount = 0;
  public itemsCountPlural = 1;

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    // Listen to changes of items in basket
    this.basketService.itemsCount$.subscribe(itemsCount => {
      this.itemsCount = itemsCount;
      this.itemsCountPlural = this.num2word(itemsCount);

      // Animation of basket button
      this.basketElement.nativeElement.classList.add('header__basket_animate');
      setTimeout(() => {
        this.basketElement.nativeElement.classList.remove('header__basket_animate');
      }, 300);
    });
  }

  private num2word(num): 1 | 2 | 3 {
    let preparedNum = num % 100;
    if (preparedNum > 19) {
      preparedNum = preparedNum % 10;
    }
    switch (preparedNum) {
      case 1: {
        return 1;
      }
      case 2: case 3: case 4: {
        return 2;
      }
      default: {
        return 3;
      }
    }
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
