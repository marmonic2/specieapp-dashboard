import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class IndustrialVesselInspectionService {
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

  getIndustrialVesselInspection(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/industrial-vessel-inspection/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getCrop(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/crop/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingSite(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-site/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getFishingArea(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/fishing-area/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getUsers(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/user/list?limit=250&active=${status}`, { headers: this.token });
  }

  getBoat(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/boat/list?active=${status}&limit=1000`, { headers: this.token });
  }

  getSpecies(status:boolean) {
    return this.http.get(`${this.configUrl}:${this.port}/v1/api/species/list?active=${status}&limit=1000`, { headers: this.token });
  }

  createIndustrialVesselInspection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/industrial-vessel-inspection/create`, data, { headers: this.token });
  }

  updateIndustrialVesselInspection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/industrial-vessel-inspection/update`, data, { headers: this.token });
  }

  disableIndustrialVesselInspection(data) {
    return this.http.post(`${this.configUrl}:${this.port}/v1/api/industrial-vessel-inspection/disable`, data, { headers: this.token });
  }
}
