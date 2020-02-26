import { Component, OnInit } from '@angular/core';
import { delay, filter, tap } from 'rxjs/operators';
import { Router, Scroll } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { defaultLocale } from './shared/data/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private delay = 1000;
  constructor(
    private readonly router: Router,
    private translateService: TranslateService
  ) {
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
}
