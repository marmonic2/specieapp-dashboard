/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import { EditarMonitoringAgriculturalComponent } from './modals/editar-monitoring-agricultural/editar-monitoring-agricultural.component';
import { MonitoringAgriculturalPricesService } from './service/monitoring-agricultural-prices.service';

@Component({
  selector: 'app-monitoring-agricultural-prices',
  templateUrl: './monitoring-agricultural-prices.component.html',
  styleUrls: ['./monitoring-agricultural-prices.component.scss'],
})
export class MonitoringAgriculturalPricesComponent implements OnInit {
  public stateToshow:boolean;

  public numberDataShow: number;

  public numberPages: number;

  public monitoringList:any[];

  public listUser:any[];

  public monitoringListToFilter:any[];

  constructor(
    private modalService: NgbModal,
    private monitoringService: MonitoringAgriculturalPricesService,
    private swal:SwalService,
  ) {
    this.numberPages = 0;
    this.numberDataShow = 10;
    this.stateToshow = true;
    this.monitoringList = [];
    this.listUser = [];
    this.getListMonitoring();
  }

  /**
   * La función obtiene la lista de seguimientos de
   * los precios agropecuarios
   * @returns void
   */
  getListMonitoring() {
    this.swal.notificationLoading('Procesando petición!!');
    const data = {
      state: this.stateToshow,
    };
    this.monitoringService.getMonitoringAgricultural(data)
      .subscribe(
        (response:any) => {
          this.monitoringList = response.items;
          this.monitoringListToFilter = response.items;
          this.swal.closeNotificationLoading();
          console.log(this.monitoringList);
        },
        (error) => {
          if (error.status === 401) {
            this.swal.status401();
          } else {
            this.swal.genericError(error.message);
          }
        },
      );
    this.getUsers();
  }

  /**
   * obtiene todos los usuarios de la base de datos
   * @returns void
   */
  getUsers() {
    this.monitoringService.getUsers(this.stateToshow)
      .subscribe(
        (listUsers:any) => {
          this.listUser = listUsers.items;
        },
        (error) => {
          if (error.status === 401) {
            this.swal.status401();
          } else {
            this.swal.genericError(error.message);
          }
        },
      );
  }

  ngOnInit(): void {
  }

  /**
   * Función para obtener la posición
   * del monitorieo sobre los precios agropecuarios
   *
   * @param idMonitorin id del seguimiento
   * @returns retorna la posición del seguimiento
   */
  getPosition(idMonitorin:string) {
    const position = this.monitoringList.findIndex(
      (monitoring: any) => monitoring._id === idMonitorin,
    ) + 1;
    return position;
  }

  /**
   * La función permite ver en pantalla
   * a los seguimientos de los precios agropecuarios
   * segun su estado
   * @returns void
   */
  changeStateToShow() {
    this.stateToshow = !this.stateToshow;
    this.monitoringList = [];
    this.getListMonitoring();
  }

  /**
   * la función sirve para cambiar el estado de un seguimiento
   * de precios agropecuarios
   * @param monitoringElement objecto de tipo any
   */
  changeStatus(monitoringElement:any) {
    const status:any = {
      id: monitoringElement._id,
      is_active: !monitoringElement.is_active,
    };
    this.monitoringService.upadteStateMonitoringAgricultural(status)
      .subscribe(
        () => {
          // eslint-disable-next-line no-param-reassign
          this.getListMonitoring();
        },
        (error) => {
          if (error.status === 401) {
            this.swal.status401();
          } else {
            this.swal.genericError(error.message);
          }
        },
      );
  }

  /**
   * la función es para filtrar los seguimientos
   * @param event es un evento cuando hay una entrada en el campo
   */
  filterMonitoring(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.monitoringList = this.monitoringListToFilter.filter((monitoring) => monitoring
      .registry_number.toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1
      || monitoring.business_name_establishment
        .toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1);
  }

  /**
   * Abre el modal para editar el formulario de seguimiento de precios agropecuarios
   *
   * @param monitoring Seguimiento seleccionado
   */
  openModalEditMonitoring(monitoring) {
    const modalRef:NgbModalRef = this.modalService.open(EditarMonitoringAgriculturalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.monitoring = monitoring;
    modalRef.componentInstance.listUsers = this.listUser;
    modalRef.result.then((result) => {
      if (result) {
        this.getListMonitoring();
      }
    });
  }
}
