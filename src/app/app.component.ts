import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { delay, filter, tap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import smoothscroll from 'smoothscroll-polyfill';
import { defaultLocale } from './shared/data/languages';
import { ScrollService } from './core/services/scroll.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('fadeIn', [
      state('out', style({opacity: 0})),
      state('in', style({opacity: 1})),
      transition('out => in', animate('1000ms ease-in')),
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  public state = 'out';

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private scrollService: ScrollService
  ) {
    smoothscroll.polyfill();
    this.router.events
      .pipe(
        filter((e: any): e is Scroll => e instanceof Scroll),
        tap(e => {
          if (!e.anchor && !e.position) {
            window.scroll(0, 0);
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

}
