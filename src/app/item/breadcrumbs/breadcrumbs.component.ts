import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { WindowRefService } from '../../core/services/window-ref.service';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() categoryName: string;
  @Input() itemName: string;
  @Input() itemId: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private windowRefService: WindowRefService
  ) { }

  ngOnInit(): void {
  }

  public share(site: 'vk' | 'fb') {
    const purl = this.document.location.href;
    const ptitle = 'Taki Da. ' + this.itemName;
    const pimg = `/images/${this.itemId}_big.png`;

    let url = '';
    if (site === 'vk') {
      url = 'http://vkontakte.ru/share.php?';
      url += 'url=' + encodeURIComponent(purl);
      url += '&title=' + encodeURIComponent(ptitle);
      url += '&description=' + encodeURIComponent('');
      url += '&image=' + encodeURIComponent(pimg);
      url += '&noparse=true';
    }
    if (site === 'fb') {
      url = 'http://www.facebook.com/sharer.php?s=100';
      url += '&p[title]=' + encodeURIComponent(ptitle);
      url += '&p[summary]=' + encodeURIComponent('');
      url += '&p[url]=' + encodeURIComponent(purl);
      url += '&p[images][0]=' + encodeURIComponent(pimg);
    }
    this.openSharePopup(url);
  }

  private openSharePopup(url) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }
  }
}
