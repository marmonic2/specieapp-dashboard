import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
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

  getSection(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/section-form/list?limit=1000&active=${status}`, { headers: this.token });
  }

  getForm(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/form-available/list?limit=1000&active=${status}`, { headers: this.token });
  }

  createSection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/section-form/create`, data, { headers: this.token });
  }

  updateSection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/section-form/update`, data, { headers: this.token });
  }

  disableSection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/section-form/disable`, data, { headers: this.token });
  }
}
