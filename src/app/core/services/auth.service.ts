import { Injectable } from '@angular/core';
import { AccountAccessData } from '../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private phone: string;
  private password: string;

  constructor() { }

  public isAuthenticated() {
    const phone = '123456';
    const password = '123456';
    return this.phone === phone && this.password === password;
  }

  public setAccountData(accessData: AccountAccessData) {
    this.phone = accessData.phone;
    this.password = accessData.password;
  }
}
