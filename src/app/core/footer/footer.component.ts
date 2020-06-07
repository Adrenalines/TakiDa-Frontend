import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../config/telephones';
import { SOCIALS } from '../config/socials';

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
