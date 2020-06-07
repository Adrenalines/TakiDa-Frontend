import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../core/config/telephones';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.less']
})
export class DeliveryComponent implements OnInit, AfterViewChecked {
  public telephones = TELEPHONES;

  constructor(private seoService: SEOService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.seoService.setSEO('delivery');
  }

}
