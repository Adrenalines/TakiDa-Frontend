import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TELEPHONES } from '../../shared/data/telephones';
import { defaultLocale, LANGUAGES } from '../../shared/data/languages';
import { SOCIALS } from '../../shared/data/socials';
import { BasketService } from '../../shared/services/basket.service';
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.less' ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('basketElement') basketElement: ElementRef;
  @ViewChild('callDialogElement') callDialogElement: ElementRef;
  @ViewChild('callDialogButtonElement') callDialogButtonElement: ElementRef;
  @ViewChild('callDialogButtonMobileElement') callDialogButtonMobileElement: ElementRef;
  public languages = LANGUAGES;
  public defaultLocale = defaultLocale;
  public telephones = TELEPHONES;
  public mobileNav = false;
  public itemsCount = 0;
  public itemsCountPlural = 1;
  public socials = SOCIALS;
  public callDialogShow = false;
  public callDialogResponseText = '';

  public callDialogForm = new FormGroup({
    clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
    phone: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
  });

  constructor(
    private apiService: ApiService,
    private basketService: BasketService
  ) {
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
      case 2:
      case 3:
      case 4: {
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

  public toggleCallback() {
    this.callDialogShow = !this.callDialogShow;
  }

  @HostListener('document:click', [ '$event' ])
  @HostListener('document:touchstart', [ '$event' ])
  private handleOutsideClick(event) {
    if (this.callDialogElement &&
      !this.callDialogElement.nativeElement.contains(event.target) &&
      !(this.callDialogButtonElement.nativeElement.contains(event.target) ||
        this.callDialogButtonMobileElement.nativeElement.contains(event.target))) {
      this.toggleCallback();
    }
  }

  public submitCallback() {
    this.callDialogResponseText = 'pending';
    this.apiService.callBack(this.callDialogForm.value).subscribe((response: boolean) => {
        this.callDialogResponseText = response ? 'success' : 'error';
      },
      error => {
        this.callDialogResponseText = 'error';
        console.log('Submit callback error: ', error);
      }
    ).add(() => {
      this.callDialogForm.reset();
      setTimeout(() => {
        this.callDialogShow = false;
        this.callDialogResponseText = '';
      }, 2000);
    });

  }

}
