import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TELEPHONES } from '../../shared/data/telephones';
import { defaultLocale, LANGUAGES } from '../../shared/data/languages';
import { SOCIALS } from '../../shared/data/socials';
import { BasketService } from '../services/basket.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.less' ],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0, transform: 'translateY(100%)' }))
      ])
    ])

  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('basketElement') basketElement: ElementRef;
  @ViewChild('callDialogElement') callDialogElement: ElementRef;
  @ViewChild('callDialogButtonElement') callDialogButtonElement: ElementRef;
  @ViewChild('callDialogButtonMobileElement') callDialogButtonMobileElement: ElementRef;
  @ViewChild('callDialogButtonMobileMainElement') callDialogButtonMobileMainElement: ElementRef;
  @ViewChild('accountDialogElement') accountDialogElement: ElementRef;
  @ViewChild('accountDialogButtonElement') accountDialogButtonElement: ElementRef;
  @ViewChild('accountDialogButtonMobileElement') accountDialogButtonMobileElement: ElementRef;
  public languages = LANGUAGES;
  public defaultLocale = defaultLocale;
  public telephones = TELEPHONES;
  public callDialogForm: FormGroup;
  public accountDialogForm: FormGroup;
  public mobileNav = false;
  public itemsCount = 0;
  public itemsCountPlural = 1;
  public socials = SOCIALS;
  public callDialogShow = false;
  public callDialogResponseText = '';
  public accountDialogShow = false;
  public accountDialogResponseText = '';
  public routeHasParams = false;
  public callBackFromMain = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private basketService: BasketService
  ) {
    this.callDialogForm = new FormGroup({
      clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
    });
    this.accountDialogForm = new FormGroup({
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    });
  }

  ngOnInit(): void {
    // Listen to changes of items in basket
    this.basketService.itemsCount$.subscribe(itemsCount => {
      this.itemsCount = itemsCount;
      this.itemsCountPlural = this.num2word(itemsCount);

      // Animation of basket button
      if (this.basketElement) {
        this.basketElement.nativeElement.classList.add('header__basket_animate');
        setTimeout(() => {
          this.basketElement.nativeElement.classList.remove('header__basket_animate');
        }, 300);
      }
    });

    setInterval(() => {
      this.routeHasParams = !!this.location.path();
    }, 200);
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

  public toggleMobileNav(show: boolean) {
    this.mobileNav = show;
  }

  public toggleCallback(fromMain?: boolean) {
    this.callBackFromMain = fromMain;
    this.callDialogShow = !this.callDialogShow;
  }

  public toggleAccount(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.accountDialogShow = !this.accountDialogShow;
  }

  @HostListener('document:click', [ '$event' ])
  @HostListener('document:touchstart', [ '$event' ])
  private handleOutsideClick(event) {
    if (this.callDialogElement &&
      !this.callDialogElement.nativeElement.contains(event.target) &&
      !(this.callDialogButtonElement.nativeElement.contains(event.target) ||
        this.callDialogButtonMobileElement.nativeElement.contains(event.target) ||
        this.callDialogButtonMobileMainElement.nativeElement.contains(event.target))) {
      this.toggleCallback();
    }
    if (this.accountDialogElement &&
      !this.accountDialogElement.nativeElement.contains(event.target) &&
      !(this.accountDialogButtonElement.nativeElement.contains(event.target) ||
        this.accountDialogButtonMobileElement.nativeElement.contains(event.target))) {
      this.toggleAccount();
    }
  }

  public submitCallback() {
    this.callDialogResponseText = 'pending';
    this.apiService.postCallBack(this.callDialogForm.value).subscribe((response: boolean) => {
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

  public submitAccount() {
    this.authService.setAccountData(this.accountDialogForm.value);
    if (this.authService.isAuthenticated()) {
      this.router.navigate([ '/profile' ]).then(
        () => {
          this.accountDialogForm.reset();
          this.accountDialogShow = false;
          this.toggleMobileNav(false);
        }
      );
    } else {
      this.accountDialogForm.reset();
      this.accountDialogResponseText = 'error';
      setTimeout(() => {
        this.accountDialogResponseText = '';
      }, 2000);
    }

  }
}
