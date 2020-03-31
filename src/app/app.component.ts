import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SubscriptionLike } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import smoothscroll from 'smoothscroll-polyfill';
import { defaultLocale } from './shared/data/languages';
import { Item } from './shared/types/types';
import { ScrollService } from './core/services/scroll.service';
import { ApiService } from './core/services/api.service';
import { CategoryService } from './core/services/category.service';
import { BasketService } from './core/services/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('fadeIn', [
      state('out', style({ opacity: 0 })),
      state('in', style({ opacity: 1 })),
      transition('out => in', animate('1500ms ease-in')),
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public state = 'out';
  private routerSub: SubscriptionLike;
  private itemsSub: SubscriptionLike[] = [];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private scrollService: ScrollService,
    private apiService: ApiService,
    private categoryService: CategoryService,
    private basketService: BasketService
  ) {
    smoothscroll.polyfill();
    this.routerSub = this.router.events
      .pipe(
        filter((e: any): e is Scroll => e instanceof Scroll),
        tap(e => {
          if (!e.anchor && !e.position) {
            window.scroll(0, 0);
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
            window.scroll({ top: e.position[1] });
          } else if (e.anchor) {
            document.querySelector('#' + e.anchor).scrollIntoView({ behavior: 'smooth' });
          }
          this.scrollService.delay = 100;
        }, this.scrollService.delay);
      });
  }

  ngOnInit(): void {
    this.translateService.use(defaultLocale);

    // Если в URL есть utm_campaign, то кладём в cookie,
    // чтобы впоследствие добавить к данным в order
    const utmCampaignValue = this.getParamValueQueryString('utm_campaign');
    document.cookie = `utm_campaign=${utmCampaignValue}`;

    this.checkBasket();
  }

  ngAfterViewInit(): void {
    this.state = this.state && this.state === 'in' ? 'out' : 'in';
    this.cd.detectChanges();
  }

  private getParamValueQueryString(paramName: string): string {
    const url = window.location.href;
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
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    this.itemsSub.forEach((itemSub: SubscriptionLike) => {
      if (itemSub) {
        itemSub.unsubscribe();
      }
    });
  }

}
