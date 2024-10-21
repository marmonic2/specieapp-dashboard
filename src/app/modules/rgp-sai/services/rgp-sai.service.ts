import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RgpSaiService {
  defaultHeaders: HttpHeaders;
  constructor(private http: HttpClient, private store: Store<{ token: string }>) {
    this.store.subscribe((res) => {
      this.defaultHeaders = new HttpHeaders({
        Authorization: res.token,
      });
    });
  }
  public getBoats(type: string, params: any) {
    return this.http.get<any>(`${environment.ssaypBackendUrl}/boat/list-boats-rgp/${type}`, {headers: this.defaultHeaders, params})
  }
  public getFisherman(type: string, params: any) {
    return this.http.get<any>(`${environment.ssaypBackendUrl}/fishermen/list-fishermen-rgp/${type}`, {headers: this.defaultHeaders, params})
  }
}
