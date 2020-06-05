import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SubscriptionLike } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as jQuery from 'jquery';
import 'slick-carousel';
import { Slide } from '../../shared/types/types';
import { ApiService } from '../../core/services/api.service';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: Slide[];
  slidesSub: SubscriptionLike;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.slidesSub = isPlatformBrowser(this.platformId) ? this.apiService.getSlides().pipe(
      map(slides => {
        this.slides = slides;
      }),
      delay(0)
    ).subscribe(() => {
      jQuery('.sl').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        fade: true
      });
    })
    : null;
  }

  ngOnDestroy(): void {
    if (this.slidesSub) {
      this.slidesSub.unsubscribe();
    }
  }

}
