import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, AfterViewChecked {
  constructor(private seoService: SEOService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.seoService.setSEO('root');
  }

}
