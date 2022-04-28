import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
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

  getRoles(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/rol/list?limit=1000&active=${status}`, { headers: this.token });
  }

  createRol(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/rol/create`, data, { headers: this.token });
  }

  updateRol(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/rol/update`, data, { headers: this.token });
  }

  disableRol(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/rol/disable`, data, { headers: this.token });
  }
}
