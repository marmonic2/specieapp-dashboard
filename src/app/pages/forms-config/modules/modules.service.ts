import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
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

  getModule(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/module/list?limit=1000&active=${status}`, { headers: this.token });
  }

  createModule(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/module/create`, data, { headers: this.token });
  }

  updateModule(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/module/update`, data, { headers: this.token });
  }

  disableModule(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/module/disable`, data, { headers: this.token });
  }
}
