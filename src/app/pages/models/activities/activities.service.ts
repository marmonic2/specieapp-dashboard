import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
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

  getActivities(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/activitie/list?limit=250&active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingSite(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-site/list?limit=250&active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingArt(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-art/list?limit=250&active=${status}&limit=1000`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?active=${status}`, { headers: this.token });
  }

  createActivitie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/activitie/create`, data, { headers: this.token });
  }

  updateActivitie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/activitie/update`, data, { headers: this.token });
  }

  disableActivitie(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/activitie/disable`, data, { headers: this.token });
  }
}
