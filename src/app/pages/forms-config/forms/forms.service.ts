import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
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

  getForm(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/form-available/list?limit=1000&active=${status}`, { headers: this.token });
  }

  getDataTotal(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/generic/getdata/`, { headers: this.token });
  }

  getModule(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/module/list?limit=1000&active=${status}`, { headers: this.token });
  }

  createForm(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/form-available/create`, data, { headers: this.token });
  }

  updateForm(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/form-available/update`, data, { headers: this.token });
  }

  disableForm(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/form-available/disable`, data, { headers: this.token });
  }
}
