import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class FishingMethodService {
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

  getFishingMethod(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-method/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createFishingMethod(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-method/create`, data, { headers: this.token });
  }

  updateFishingMethod(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-method/update`, data, { headers: this.token });
  }

  disableFishingMethod(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-method/disable`, data, { headers: this.token });
  }
}
