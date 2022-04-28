/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { MeasurementService } from './measurement.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
})
export class MeasurementComponent implements OnInit {
  public searchMeasurement:string;

  public measurementArray = [];

  public measurementArrayForFilter = [];

  public measurementForFilter: [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditMeasurement: FormGroup;

  public formEditSpecie: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posSpecie: number;

  posMeasurement: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public siteArray: [] = [];

  public specieArray: [] = [];

  public artArray: [] = [];

  public userArray: [] = [];

  public areaArray: [] = [];

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private measurementService: MeasurementService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getMeasurement(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getMeasurement(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.measurementService.getMeasurement(status).subscribe(
      (result: any) => {
        this.measurementArray = result.items;
        this.measurementArrayForFilter = this.measurementArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();

        console.log(this.measurementArray);

        this.measurementService.getFishingSite(status).subscribe(
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
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.measurementService.getFishingArea(status).subscribe(
          (efect: any) => {
            this.areaArray = efect.items;
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
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.measurementService.getFishingArt(status).subscribe(
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
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.measurementService.getUsers(status).subscribe(
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
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.measurementService.getSpecies(status).subscribe(
          (efectuado: any) => {
            this.specieArray = efectuado.items;
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
                html: error.error.message,
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
            html: error.error.message,
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
  getPositionMeasurement(idMeasurement:string) {
    const position = this.measurementArray
      .findIndex((measurement: any) => measurement._id === idMeasurement) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterMeasurement(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.measurementArray = this.measurementArrayForFilter
      .filter((measurementArray) => measurementArray.site
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
  * La función inicializa el formulario para agregar measurement de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditMeasurement = this.formBuilder.group({
      _id: [''],
      site: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      zone: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      art: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      measured_specie:
      [[], [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });

    this.formEditSpecie = this.formBuilder.group({
      _id: [''],
      specie: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      longitud: [0, [Validators.required, Validators.min(1), Validators.max(500)]],
      frecuency: [0, [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editMeasurementModal Modal que se va desplegar para editar
   * @param measurement Data del arte de pesca seleccionado
   */
  openModalEdit(editMeasurementModal:NgbModal, measurement, pos) {
    this.formSubmitted = false;

    this.posSpecie = 0;
    this.posMeasurement = pos;
    this.modal = this.modalService.open(editMeasurementModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditMeasurement.reset();

    this.formEditMeasurement.patchValue({
      _id: measurement._id,
      site: measurement.site,
      zone: measurement.zone,
      art: measurement.art,
      create_by: measurement.create_by._id,
      issue_date: this.transformEpoch(measurement.issue_date),
      measured_specie: measurement.measured_specie,
    });
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editMeasurementModal Modal que se va desplegar para editar
   * @param measurement Data del arte de pesca seleccionado
   */
  openModalEditSpecie(editMeasurementModal:NgbModal, speciePos) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editMeasurementModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditSpecie.reset();

    this.formEditSpecie.patchValue({
      _id: this.formEditMeasurement.value.measured_specie[speciePos]._id,
      specie: this.formEditMeasurement.value.measured_specie[speciePos].specie,
      longitud: this.formEditMeasurement.value.measured_specie[speciePos].longitud,
      frecuency: this.formEditMeasurement.value.measured_specie[speciePos].frecuency,
    });
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataMeasurement() {
    this.formSubmitted = true;
    const hoy = new Date();
    const dateParse = `${this.formEditMeasurement.value.issue_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    if (this.formEditMeasurement.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditMeasurement.patchValue({
        issue_date: Date.parse(dateParse),
      });
      this.measurementService.updateMeasurement(this.formEditMeasurement.value).subscribe(
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
          this.getMeasurement(true);
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
              html: error.error.message,
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
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeSpecie(selected) {
    this.formSubmitted = true;

    if (this.formEditSpecie.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditMeasurement.value.measured_specie;
      arrayMod[this.posSpecie] = selected;
      this.formEditMeasurement.patchValue({
        measured_specie: arrayMod,
      });
      this.sub_modal.close();
    }
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param measurement Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(measurement) {
    const status = measurement.is_active;

    this.measurementService
      .disableMeasurement({ id: measurement._id, is_active: !status }).subscribe(
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
          this.getMeasurement(true);
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
              html: error.error.message,
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
    if (this.formEditMeasurement.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditMeasurement.get(field)!.hasError('minlength')) {
      const minLength = this.formEditMeasurement.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditMeasurement.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditMeasurement.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditMeasurement.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    }

    return message;
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditSpecie(field: string): string {
    let message = '';
    if (this.formEditSpecie.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSpecie.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSpecie.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSpecie.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSpecie.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSpecie.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditSpecie.get(field)!.hasError('min')) {
      const min = this.formEditSpecie.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditSpecie.get(field)!.hasError('max')) {
      const max = this.formEditSpecie.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
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
    if (this.formEditMeasurement.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidFieldSpecie(field: string): boolean {
    if (this.formEditSpecie.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.measurementArray = [];
    this.getMeasurement(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Pinta bien el id del array
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

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChange(event: any) {
    this.posSpecie = event.target.value;
  }
}
