import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
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

  getMonitoring(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/monitoring/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getSpecies(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/species/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  getBoat(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/boat/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getPropulsionMethod(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/propulsion-method/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getGlobalArray(status: boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/generic/list?active=${status}`, { headers: this.token });
  }

  getFishingSite(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-site/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingArea(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-area/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingArt(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-art/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingMethod(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-method/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createMonitoring(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/monitoring/create`, data, { headers: this.token });
  }

  updateMonitoring(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/monitoring/update`, data, { headers: this.token });
  }

  disableMonitoring(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/monitoring/disable`, data, { headers: this.token });
  }
}
