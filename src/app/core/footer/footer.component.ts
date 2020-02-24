import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  public telephones = TELEPHONES;

  constructor() { }

  ngOnInit(): void {
  }

}
