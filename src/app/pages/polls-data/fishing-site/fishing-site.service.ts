import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class FishingSiteService {
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

  getFishingSite(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-site/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createFishingSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-site/create`, data, { headers: this.token });
  }

  updateFishingSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-site/update`, data, { headers: this.token });
  }

  disableFishingSite(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-site/disable`, data, { headers: this.token });
  }
}
