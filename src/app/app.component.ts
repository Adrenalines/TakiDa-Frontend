import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SubscriptionLike } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import smoothscroll from 'smoothscroll-polyfill';
import { defaultLocale } from './core/config/languages';
import { Item } from './core/types/types';
import { WindowRefService } from './core/services/window-ref.service';
import { ScrollService } from './core/services/scroll.service';
import { ApiService } from './core/services/api.service';
import { CategoryService } from './core/services/category.service';
import { BasketService } from './core/services/basket.service';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('fadeIn', [
      state('out', style({ opacity: 0 })),
      state('in', style({ opacity: 1 })),
      transition('out => in', animate('1200ms ease-in')),
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public state = 'out';
  public hasOrderSuccess = false;
  private readonly defaultLocale: string;
  private readonly routerScrollSub: SubscriptionLike;
  private readonly routerNavigationSub: SubscriptionLike;
  private itemsSub: SubscriptionLike[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private readonly router: Router,
    private cd: ChangeDetectorRef,
    private windowRefService: WindowRefService,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private scrollService: ScrollService,
    private apiService: ApiService,
    private categoryService: CategoryService,
    private basketService: BasketService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      smoothscroll.polyfill();
      this.defaultLocale = localStorage.getItem('language') || defaultLocale;
    }
    this.routerScrollSub = this.router.events
      .pipe(
        filter((e: any): e is Scroll => e instanceof Scroll),
        tap(e => {
          if (!e.anchor && !e.position) {
            if (isPlatformBrowser(this.platformId)) {
              this.windowRefService.nativeWindow.scroll(0, 0);
            }
            setTimeout(() => {
              this.scrollService.activeItemsCategory.next(null);
            }, 100);
          }
        }),
        delay(10)
      )
      .subscribe(e => {
        setTimeout(() => {
          if (e.position) {
            if (isPlatformBrowser(this.platformId)) {
              this.windowRefService.nativeWindow.scroll({ top: e.position[1] });
            }
          } else if (e.anchor) {
            this.document.querySelector('#' + e.anchor).scrollIntoView({ behavior: 'smooth' });
          }
          this.scrollService.delay = 100;
        }, this.scrollService.delay);
      });

    this.routerNavigationSub = this.router.events.pipe(
      filter((e: any): e is NavigationEnd => e instanceof NavigationEnd),
    ).subscribe(path => {
      this.hasOrderSuccess = path.url === '/pages/success';
    });
  }

  ngOnInit(): void {
    this.translateService.use(this.defaultLocale);

    // Если в URL есть utm_campaign, то кладём в cookie,
    // чтобы впоследствие добавить к данным в order
    const utmCampaignValue = this.getParamValueQueryString('utm_campaign');
    this.cookieService.set('utm_campaign', utmCampaignValue);

    this.checkBasket();
  }

  ngAfterViewInit(): void {
    this.state = this.state && this.state === 'in' ? 'out' : 'in';
    this.cd.detectChanges();
  }

  private getParamValueQueryString(paramName: string): string {
    const url = this.document.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  private checkBasket() {
    const oldBasket = new Map<Item, number>(this.basketService.items);
    Array.from(oldBasket.keys()).forEach((itemBasket: Item) => {
      this.itemsSub.push(this.apiService.getItem(itemBasket.id).subscribe((item: Item) => {
          this.basketService.removeFromBasket(itemBasket);
          if (item) {
            this.basketService.replenishBasket(item, (oldBasket.get(itemBasket)));
          }
        },
        error => {
          console.error(error);
          this.basketService.removeFromBasket(itemBasket);
        }));
    });
  }

  ngOnDestroy(): void {
    if (this.routerScrollSub) {
      this.routerScrollSub.unsubscribe();
    }
    if (this.routerNavigationSub) {
      this.routerNavigationSub.unsubscribe();
    }
    this.itemsSub.forEach((itemSub: SubscriptionLike) => {
      if (itemSub) {
        itemSub.unsubscribe();
      }
    });
  }

}
