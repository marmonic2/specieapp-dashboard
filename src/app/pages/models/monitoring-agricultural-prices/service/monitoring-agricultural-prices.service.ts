import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonitoringAgriculturalPricesService {
  private urlApi:string;

  private portApi : string;

  private headers:HttpHeaders;

  constructor(private httpClient: HttpClient, private store: Store<{ token: string }>) {
    this.urlApi = 'https://san-andres-species-app.herokuapp.com:';
    this.portApi = '443';
    this.store.subscribe((state) => {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: state.token,
      });
    });
  }

  /**
   * La función permite obtener la lista de los seguimientos de precios agropecuario
   * de precio sobre la agricultura con su configuración de la API
   * @returns retorna un objeto Observable
   */
  getMonitoringAgricultural(data:any):Observable<Object> {
    return this.httpClient
      .get(`${this.urlApi}${this.portApi}/v1/api/monitoring-agricultural-prices/list?active=${data.state}`, {
        headers: this.headers,
      });
  }

  /**
 * La función sirve para cambiar el estado de un seguimiento de precios agropecuario
 * @param data los datos para cambiar el estado del seguimiento de precio agropecuario
 * @returns un observable para cambiar el estado
 */
  upadteStateMonitoringAgricultural(data:any) {
    return this.httpClient.post(`${this.urlApi}${this.portApi}/v1/api/monitoring-agricultural-prices/disable`, data, {
      headers: this.headers,
    });
  }

  getUsers(status:boolean) {
    return this.httpClient.get(`${this.urlApi}${this.portApi}/v1/api/user/list?limit=250&active=${status}`, { headers: this.headers });
  }

  updateCostsIncome(data) {
    return this.httpClient.post(`${this.urlApi}${this.portApi}/v1/api/monitoring-agricultural-prices/update`, data, { headers: this.headers });
  }
}
