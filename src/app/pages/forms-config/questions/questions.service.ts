import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
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

  getQuestion(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/question-form/list?limit=250&active=${status}`, { headers: this.token });
  }

  getSection(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/section-form/list?limit=1000&active=${status}`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  createQuestion(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/question-form/create`, data, { headers: this.token });
  }

  updateQuestion(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/question-form/update`, data, { headers: this.token });
  }

  disableQuestion(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/question-form/disable`, data, { headers: this.token });
  }

  getGlobalArray(status: boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/generic/list?active=${status}`, { headers: this.token });
  }
}
