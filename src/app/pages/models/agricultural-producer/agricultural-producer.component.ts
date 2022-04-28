/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { AgriculturalProducerService } from './agricultural-producer.service';
import { GenericDataComponent } from './modals/generic-data/generic-data.component';
import { CattleComponent } from './modals/cattle/cattle.component';
import { ProductiveUnitComponent } from './modals/productive-unit/productive-unit.component';
import { PigsComponent } from './modals/pigs/pigs.component';
import { BirdsComponent } from './modals/birds/birds.component';
import { LivestockInventoryComponent } from './modals/livestock-inventory/livestock-inventory.component';

@Component({
  selector: 'app-agricultural-producer',
  templateUrl: './agricultural-producer.component.html',
  styleUrls: ['./agricultural-producer.component.scss'],
})
export class AgriculturalProducerComponent implements OnInit {
  public searchAgriculturalProducer:string;

  public agriculturalProducerArray = [];

  public agriculturalProducerArrayForFilter = [];

  public agriculturalProducerForFilter: [];

  public siteArray: [] = [];

  public artArray: [] = [];

  public cropArray: [] = [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditAgriculturalProducer: FormGroup;

  // Control de vistas
  id_view: number = 0;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private agriculturalProducerService: AgriculturalProducerService,
    public routes: Router,
    private swal: SwalService,
  ) {
    this.getAgriculturalProducer(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getAgriculturalProducer(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.agriculturalProducerService.getAgriculturalProducer(status).subscribe(
      (result: any) => {
        this.agriculturalProducerArray = result.items;
        this.agriculturalProducerArrayForFilter = this.agriculturalProducerArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();

        console.log(this.agriculturalProducerArray);

        this.agriculturalProducerService.getUsers(status).subscribe(
          (efect: any) => {
            this.userArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.agriculturalProducerService.getCrop(status).subscribe(
          (efect: any) => {
            this.cropArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          }).then(() => {
            this.routes.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: error.message,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          });
        }
      },
    );
    this.id_view = 0;
  }

  /**
   * Función para obtener la posición del arte de pesca
   *
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionAgriculturalProducer(idAgriculturalProducer:string) {
    const position = this.agriculturalProducerArray.findIndex(
      (agriculturalProducer: any) => agriculturalProducer._id === idAgriculturalProducer,
    ) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterAgriculturalProducer(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.agriculturalProducerArray = this.agriculturalProducerArrayForFilter
      .filter((agriculturalProducerArray) => agriculturalProducerArray.registry_number
        .toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1);
  }

  ngOnInit(): void {
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal() {
    this.modal.close();
    this.ngOnInit();
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
    this.ngOnInit();
  }

  /**
  * La función inicializa el formulario para agregar agriculturalProducer de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditAgriculturalProducer = this.formBuilder.group({
      _id: [''],
      latitude: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      length: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      birds: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      business_name_establishment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      cattle: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      crops_produced: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      cultivation_system: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      form_ternure: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      gender: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      income_generation: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      informant_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      livestock_inventory: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      localization: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      nit: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      person_type: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      pigs: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      principal_activity: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      registry_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      self_consumption: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      surface: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      water_resource: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
    });
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param agriculturalProducer Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(agriculturalProducer) {
    const status = agriculturalProducer.is_active;

    this.agriculturalProducerService
      .disableAgriculturalProducer({ id: agriculturalProducer._id, is_active: !status }).subscribe(
        (result: any) => {
          Swal.fire({
            title: 'Procesando petición!!',
            html: result.message,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 2000,
          });
          this.getAgriculturalProducer(true);
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            }).then(() => {
              this.routes.navigate(['/login']);
            });
          } else {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: error.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
          }
        },
      );
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.agriculturalProducerArray = [];
    this.getAgriculturalProducer(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Abre el modal para editar el formulario generico 1
   *
   */
  openModalEditGenericData(data) {
    const modalRef:NgbModalRef = this.modalService.open(GenericDataComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;
    modalRef.componentInstance.userArray = this.userArray;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }

  /**
   * Abre el modal para editar las unidades productivas
   *
   */
  openModalProductiveUnit(data) {
    const modalRef:NgbModalRef = this.modalService.open(ProductiveUnitComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;
    modalRef.componentInstance.userArray = this.userArray;
    modalRef.componentInstance.cropArray = this.cropArray;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }

  /**
   * Abre el modal para editar el formulario inventario animal
   *
   */
  openModalEditLivestockInv(data) {
    const modalRef:NgbModalRef = this.modalService.open(LivestockInventoryComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }

  /**
   * Abre el modal para editar el formulario bovino
   *
   */
  openModalEditCattle(data) {
    const modalRef:NgbModalRef = this.modalService.open(CattleComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }

  /**
   * Abre el modal para editar el formulario porcino
   *
   */
  openModalEditPigs(data) {
    const modalRef:NgbModalRef = this.modalService.open(PigsComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }

  /**
   * Abre el modal para editar el formulario aves
   *
   */
  openModalEditBirds(data) {
    const modalRef:NgbModalRef = this.modalService.open(BirdsComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;

    modalRef.result.then((result) => {
      console.log('No editado');
    }, (reason) => {
      this.getAgriculturalProducer(true);
    });
  }
}
