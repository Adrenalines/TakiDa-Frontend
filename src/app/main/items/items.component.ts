import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit, AfterViewInit {
  rolls: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  sets: string[] = ['9', '10', '11', '12', '13', '14', '15', '16'];

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
