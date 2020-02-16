import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Scroll } from '@angular/router';
import { delay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.fragment.pipe(delay(100)).subscribe(fragment => {
      this.scrollToAnchor(fragment);
    });
  }

  scrollToAnchor(fragment: string): void {
    try {
      if (fragment) {
        document.querySelector('#' + fragment).scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) { }
  }



}
