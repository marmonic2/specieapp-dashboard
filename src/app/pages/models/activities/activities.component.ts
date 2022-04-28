/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  public searchActivities:string;

  public activitiesArray = [];

  public activitiesArrayForFilter = [];

  public activitiesForFilter: [];

  public siteArray: [] = [];

  public artArray: [] = [];

  public userArray: [] = [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditActivities: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posSpecie: number;

  posActivities: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private activitiesService: ActivitiesService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getActivities(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getActivities(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.activitiesService.getActivities(status).subscribe(
      (result: any) => {
        this.activitiesArray = result.items;
        this.activitiesArrayForFilter = this.activitiesArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();

        this.activitiesService.getFishingSite(status).subscribe(
          (efect: any) => {
            this.siteArray = efect.items;
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

        this.activitiesService.getFishingArt(status).subscribe(
          (efect: any) => {
            this.artArray = efect.items;
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

        this.activitiesService.getUsers(status).subscribe(
          (efectuado: any) => {
            this.userArray = efectuado.items;
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
  getPositionActivities(idActivities:string) {
    const position = this.activitiesArray
      .findIndex((activities: any) => activities._id === idActivities) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterActivities(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.activitiesArray = this.activitiesArrayForFilter
      .filter((activitiesArray) => activitiesArray.site
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
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
  }

  /**
  * La función inicializa el formulario para agregar activities de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditActivities = this.formBuilder.group({
      _id: [''],
      site: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      art: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      active: ['', [Validators.required, Validators.min(1), Validators.max(64)]],
      sample: ['', [Validators.required, Validators.min(1), Validators.max(64)]],
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      observation: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editActivitiesModal Modal que se va desplegar para editar
   * @param activities Data del arte de pesca seleccionado
   */
  openModalEdit(editActivitiesModal:NgbModal, activities, pos) {
    this.formSubmitted = false;

    this.posSpecie = 0;
    this.posActivities = pos;
    this.modal = this.modalService.open(editActivitiesModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditActivities.reset();

    this.formEditActivities.patchValue({
      _id: activities._id,
      site: activities.site,
      art: activities.art,
      active: activities.active,
      sample: activities.sample,
      observation: activities.observation,
      issue_date: this.transformEpoch(activities.issue_date),
      create_by: activities.create_by._id,
    });
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataActivities() {
    this.formSubmitted = true;
    const hoy = new Date();
    const dateParse = `${this.formEditActivities.value.issue_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    if (this.formEditActivities.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditActivities.patchValue({
        issue_date: Date.parse(dateParse),
      });
      this.activitiesService.updateActivitie(this.formEditActivities.value).subscribe(
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
          this.getActivities(true);
          this.modalService.dismissAll();
          this.formSubmitted = false;
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
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param activities Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(activities) {
    const status = activities.is_active;

    this.activitiesService
      .disableActivitie({ id: activities._id, is_active: !status }).subscribe(
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
          this.getActivities(true);
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
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditActivities.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditActivities.get(field)!.hasError('minlength')) {
      const minLength = this.formEditActivities.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditActivities.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditActivities.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditActivities.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    }

    return message;
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidField(field: string): boolean {
    if (this.formEditActivities.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.activitiesArray = [];
    this.getActivities(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Pinta bien el rol del usuario
   */
  filtroDataMaximus(idData, array, tipo) {
    let string = '';

    if (tipo === 1) {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.email;
        }
      });
    } else {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.description;
        }
      });
    }
    return string;
  }

  /**
   * Transforma las fechas en formato epoch
   *
   * @param epoch Formato de fecha en número
   * @returns String con la fecha
   */
  transformEpoch(epoch) {
    const data = new Date(epoch);
    let dia = '';
    let mes = '';
    if (data.getDate() < 10) {
      dia = `0${data.getDate()}`;
    } else {
      dia = data.getDate().toString();
    }

    if ((data.getMonth() + 1) < 10) {
      mes = `0${data.getMonth() + 1}`;
    } else {
      mes = (data.getMonth() + 1).toString();
    }
    const string = `${data.getFullYear()}-${mes}-${dia}`;

    return string;
  }
}
