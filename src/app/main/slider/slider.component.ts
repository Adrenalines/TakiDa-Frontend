import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import * as jQuery from 'jquery';
import 'slick-carousel';
import { Slide } from '../../shared/types/types';
import { ApiService } from '../../core/services/api.service';
import { delay, map } from 'rxjs/operators';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: Slide[];
  slidesSub: SubscriptionLike;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.slidesSub = this.apiService.getSlides().pipe(
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
    });
  }

  ngOnDestroy(): void {
    if (this.slidesSub) {
      this.slidesSub.unsubscribe();
    }
  }

}
