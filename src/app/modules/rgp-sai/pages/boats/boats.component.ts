import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IBoatRGP} from "../../../models/BoatRGP";
import {RgpSaiService} from "../../services/rgp-sai.service";
import {SwalService} from "../../../../services/swalNotification/swal.service";
import {mapRGPBoats, throwError} from "../../../../shared/mapper-utils";
import {Router} from "@angular/router";
import {debounceTime } from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss']
})
export class BoatsComponent implements AfterViewInit {
  boatArray: IBoatRGP[];
  currentPage = 1;
  itemsPerPage =  10;
  totalItems=  10;
  currentType = 'ART';
  search: string;
  validity: string;
  location: string;
  searchBoat = new Subject();
  currentFilterValidity = 'Vigencia permiso';
  currentFilterPatent = 'Vigencia de la patente';
  validityPatent: string;
  currentFilterType = 'Artesanales';
  constructor(private readonly rgpSaiService: RgpSaiService,
              private readonly swal: SwalService,
              private readonly router: Router,
              ) {
    this.searchBoat.pipe(debounceTime(500)).subscribe((value) => {
      this.getBoats();
    });
  }
  ngAfterViewInit(): void {
    this.swal.notificationLoading('Procesando petición!!');
    this.getBoats();
  }

  async getBoats(){
    try {
      const { data } = (await this.rgpSaiService.getBoats(this.currentType, this.getCurrentFilters()).toPromise());
      this.boatArray = mapRGPBoats(data.data);
      this.currentPage = data.current_page;
      this.totalItems = data.total;
      this.swal.closeNotificationLoading();
    } catch (error) {
      this.swal.closeNotificationLoading();
      throwError(error, this.router)
    }
  }
  getCurrentFilters(): any {
    return {
      itemsPerPage: this.itemsPerPage,
      page: this.currentPage,
      ...(this.search && {search: this.search}),
      ...(this.validity && {vigency: this.validity}),
      ...(this.validityPatent && {vigencyPatent: this.validityPatent}),
      ...(this.location && {search: this.location}),
    }
  }
  filterBoat() {
    this.searchBoat.next();
  }

  paginate(currentPage) {
    this.currentPage = currentPage;
    this.swal.notificationLoading('Procesando petición!!');
    this.getBoats();
  }

  getStatus(currentInspection: string) {
    return {
      noPatent: 'btn-default',
      active: 'btn-success',
      expired: 'btn-danger',
      defaultValue: 'btn-default'
    }[currentInspection || 'defaultValue']
  }

  getStatusDesc(currentValue: string) {
    if (currentValue) {
      return currentValue;
    } else {
      return 'Sin dato';
    }
  }

  setFilters(param: {type: string; value: string, desc: string}) {
    this.swal.notificationLoading('Procesando petición!!');
    if (param.type === 'patent') {
      this.validityPatent = param.value;
      this.currentFilterPatent = param.desc;
    }
    if (param.type === 'validity') {
      this.validity = param.value;
      this.currentFilterValidity = param.desc
    }
    if (param.type === 'type') {
      this.currentType = param.value;
      this.currentFilterType = param.desc
    }
    this.getBoats();
  }
}
