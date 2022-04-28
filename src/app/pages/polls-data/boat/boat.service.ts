import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  public sidebarShow = false;

  public token;

  constructor(private http: HttpClient, private store: Store<{ token: string }>) {
    this.store.subscribe((res) => {
      this.token = new HttpHeaders({
        Authorization: res.token,
      });
    });
  }

  configUrl = 'https://san-andres-species-app.herokuapp.com';

  port = 443;

  getBoat(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/boat/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createBoat(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/boat/create`, data, { headers: this.token });
  }

  updateBoat(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/boat/update`, data, { headers: this.token });
  }

  disableBoat(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/boat/disable`, data, { headers: this.token });
  }
}
