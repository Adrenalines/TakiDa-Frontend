import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../core/config/telephones';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit, AfterViewChecked {
  public telephones = TELEPHONES;

  constructor(private seoService: SEOService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.seoService.setSEO('contacts');
  }

}
