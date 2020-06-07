import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit, AfterViewChecked {
  constructor(private seoService: SEOService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.seoService.setSEO('about');
  }

}
