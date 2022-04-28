import { Injectable } from '@angular/core';

@Injectable()
export class MyserviceService {
  constructor() { }

  // eslint-disable-next-line class-methods-use-this
  checkusernameandpassword(uname: string, pwd: string): boolean {
    if (uname === 'admin' && pwd === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('username');
  }
}
