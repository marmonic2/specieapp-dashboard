import {AfterViewInit, Component} from '@angular/core';
import {RgpSaiService} from "../../services/rgp-sai.service";
import {SwalService} from "../../../../services/swalNotification/swal.service";
import { mapRGPFisherman, throwError} from "../../../../shared/mapper-utils";
import {Router} from "@angular/router";
import {debounceTime } from "rxjs/operators";
import {Subject} from "rxjs";
import {IFishermanRGP} from "../../../models/FishermanRGP";

@Component({
  selector: 'app-fishermen',
  templateUrl: './fishermen.component.html',
  styleUrls: ['./fishermen.component.scss']
})
export class FishermenComponent implements AfterViewInit {
  fishermanArray: IFishermanRGP[];
  currentPage = 1;
  itemsPerPage =  10;
  totalItems=  10;
  currentType = 'UNO';
  search: string;
  validity: string;
  location: string;
  searchBoat = new Subject();
  currentFilterValidity = 'Vigencia permiso';
  currentFilterType = 'Artesanales';
  currentFilterLocation = 'Municipio';
  constructor(private readonly rgpSaiService: RgpSaiService,
              private readonly swal: SwalService,
              private readonly router: Router,
  ) {
    this.searchBoat.pipe(debounceTime(500)).subscribe((value) => {
      this.getFisherman();
    });
  }
  ngAfterViewInit(): void {
    this.swal.notificationLoading('Procesando petición!!');
    this.getFisherman();
  }

  async getFisherman(){
    try {
      const { data } = (await this.rgpSaiService.getFisherman(this.currentType, this.getCurrentFilters()).toPromise());
      this.fishermanArray = mapRGPFisherman(data.data);
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
      ...(this.location && {location: this.location}),
    }
  }
  filterFisherman() {
    this.searchBoat.next();
  }

  paginate(currentPage) {
    this.currentPage = currentPage;
    this.swal.notificationLoading('Procesando petición!!');
    this.getFisherman();
  }

  getStatus(currentValue: string) {
    return {
      success: 'btn-success',
      danger: 'btn-danger',
      defaultValue: 'btn-danger',
    }[currentValue || 'defaultValue']
  }

  getStatusDesc(currentValue: string) {
    return {
      success: 'SI',
      danger: 'NO',
      defaultValue: 'NO',
    }[currentValue || 'defaultValue']
  }

  setFilters(param: {type: string; value: string, desc: string}) {
    this.swal.notificationLoading('Procesando petición!!');
    if (param.type === 'validity') {
      this.validity = param.value;
      this.currentFilterValidity = param.desc
    }
    if (param.type === 'location') {
      this.location = param.value;
      this.currentFilterLocation = param.desc
    }
    if (param.type === 'type') {
      this.currentType = param.value;
      this.currentFilterType = param.desc
    }
    this.getFisherman();
  }
}
