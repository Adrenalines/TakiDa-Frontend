import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';
import { SOCIALS } from '../../shared/data/socials';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  public telephones = TELEPHONES;
  public socials = SOCIALS;

  constructor() { }

  ngOnInit(): void {
  }

}
