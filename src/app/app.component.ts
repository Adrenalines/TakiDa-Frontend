import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { delay, filter, tap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import smoothscroll from 'smoothscroll-polyfill';
import { defaultLocale } from './shared/data/languages';



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
  private delay = 1000;

  constructor(
    private readonly router: Router,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService
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
          this.delay = 200;
        }, this.delay);
      });
  }

  ngOnInit(): void {
    this.translateService.use(defaultLocale);
  }

  ngAfterViewInit(): void {
    this.state = this.state && this.state === 'in' ? 'out' : 'in';
    this.cd.detectChanges();
  }
}
