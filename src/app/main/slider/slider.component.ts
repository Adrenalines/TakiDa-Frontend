import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import 'slick-carousel';
import * as slidesStore from './slidesStore.json';

interface Slide {
  id: string;
  title: string;
  alt: string;
  src: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit, AfterViewInit {
  slidesStore: Slide[] = (slidesStore as any).default;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    jQuery('.sl').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: true,
      fade: true
    });
  }

}
