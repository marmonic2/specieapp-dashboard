import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CropsService {
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

  getCrop(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/crop/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createCrop(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/crop/create`, data, { headers: this.token });
  }

  updateCrop(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/crop/update`, data, { headers: this.token });
  }

  disableCrop(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/crop/disable`, data, { headers: this.token });
  }
}
