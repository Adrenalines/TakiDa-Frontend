import { Component, OnInit } from '@angular/core';
import { TELEPHONES } from '../../shared/data/telephones';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  telephones = TELEPHONES;

  constructor() { }

  ngOnInit(): void {
  }

}
