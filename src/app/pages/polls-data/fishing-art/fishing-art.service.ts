import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class FishingArtService {
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

  getFishingArt(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-art/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createFishingArt(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-art/create`, data, { headers: this.token });
  }

  updateFishingArt(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-art/update`, data, { headers: this.token });
  }

  disableFishingArt(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/fishing-art/disable`, data, { headers: this.token });
  }
}
