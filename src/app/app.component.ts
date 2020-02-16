import { Component } from '@angular/core';
import { delay, filter } from 'rxjs/operators';
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
        delay(0)
      )
      .subscribe(e => {
        if (!e.anchor) {
          window.scroll(0, 0);
        }
      });
  }
}
