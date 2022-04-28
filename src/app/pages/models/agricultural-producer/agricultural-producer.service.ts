import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AgriculturalProducerService {
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

  getAgriculturalProducer(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/agricultural-producer-form/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getCrop(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/crop/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  createAgriculturalProducer(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/agricultural-producer-form/create`, data, { headers: this.token });
  }

  updateAgriculturalProducer(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/agricultural-producer-form/update`, data, { headers: this.token });
  }

  disableAgriculturalProducer(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/agricultural-producer-form/disable`, data, { headers: this.token });
  }
}
