import { Component } from '@angular/core';
import { delay, filter, tap } from 'rxjs/operators';
import { Router, Scroll } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private readonly router: Router) {
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
        if (e.position) {
          window.scroll({ top: e.position[1] });
        } else if (e.anchor) {
          document.querySelector('#' + e.anchor).scrollIntoView({ behavior: 'smooth' });
        }
      });
  }
}
