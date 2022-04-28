import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  configUrl = 'https://san-andres-species-app.herokuapp.com';

  port = 443;

  getRoles(token) {
    const httpOptions = this.armarHeader(token);
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/rol/list?limit=1000`, httpOptions);
  }

  login(credentials) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/auth/login`, credentials);
  }

  armarHeader(token) {
    const headersObject = new HttpHeaders({
      Authorization: `${token}`,
    });

    const httpOptions = {
      headers: headersObject,
    };

    return httpOptions;
  }
}
