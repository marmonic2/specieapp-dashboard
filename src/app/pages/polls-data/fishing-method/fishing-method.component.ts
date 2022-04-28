/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { FishingMethodService } from './fishing-method.service';

@Component({
  selector: 'app-fishing-method',
  templateUrl: './fishing-method.component.html',
  styleUrls: ['./fishing-method.component.scss'],
})
export class FishingMethodComponent implements OnInit {
  public searchFishingMethod:string;

  public fishingMethodArray = [];

  public fishingMethodArrayForFilter = [];

  public fishingMethodForFilter: [];

  public numberFishingMethodShow: number = 5;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formFishingMethod: FormGroup;

  public formEditFishingMethod: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private fishingMethodService: FishingMethodService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getFishingMethod(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getFishingMethod(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.fishingMethodService.getFishingMethod(status).subscribe(
      (result: any) => {
        this.fishingMethodArray = result.items;
        this.fishingMethodArrayForFilter = this.fishingMethodArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();
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
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionFishingMethod(idFishingMethod:string) {
    const position = this.fishingMethodArray
      .findIndex((fishingMethod: any) => fishingMethod._id === idFishingMethod) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterFishingMethod(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.fishingMethodArray = this.fishingMethodArrayForFilter
      .filter((fishingMethodArray) => fishingMethodArray.description
        .toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1);
  }

  ngOnInit(): void {
  }

  /**
   * La función sirve para cerrar los modales
   * @returns void
   */
  closeModal() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  /**
  * La función inicializa el formulario para agregar fishingMethod de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formFishingMethod = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditFishingMethod = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar fishingMethod
   * @param modalFishingMethod es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalFishingMethod:NgbModal) {
    this.modalService.open(modalFishingMethod, {
      centered: true,
      backdrop: 'static',
    });

    this.formFishingMethod.reset();
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editFishingMethodModal Modal que se va desplegar para editar
   * @param fishingMethod Data del arte de pesca seleccionado
   */
  openModalEdit(editFishingMethodModal:NgbModal, fishingMethod) {
    this.modalService.open(editFishingMethodModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditFishingMethod.reset();

    this.formEditFishingMethod.patchValue({
      _id: fishingMethod._id,
      description: fishingMethod.description,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataFishingMethod() {
    this.formSubmitted = true;

    if (this.formFishingMethod.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingMethodService.createFishingMethod(this.formFishingMethod.value).subscribe(
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
          this.getFishingMethod(true);
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
        }
      );
    }
  }

  /**
   * Guarda los cambios realizados a los Artes de pesca
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataFishingMethod() {
    this.formSubmitted = true;

    if (this.formEditFishingMethod.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingMethodService.updateFishingMethod(this.formEditFishingMethod).subscribe(
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
          this.getFishingMethod(true);
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
        }
      );
    }
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param fishingMethod Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(fishingMethod) {
    const status = fishingMethod.is_active;

    this.fishingMethodService
      .disableFishingMethod({ id: fishingMethod._id, is_active: !status }).subscribe(
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
          this.getFishingMethod(true);
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
  getErrorMessage(field: string): string {
    let message = '';
    if (this.formFishingMethod.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formFishingMethod.get(field)!.hasError('minlength')) {
      const minLength = this.formFishingMethod.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formFishingMethod.get(field)!.hasError('maxlength')) {
      const maxLength = this.formFishingMethod.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formFishingMethod.get(field)!.hasError('pattern')) {
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
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditFishingMethod.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishingMethod.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishingMethod.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishingMethod.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishingMethod.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishingMethod.get(field)!.hasError('pattern')) {
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
    if (this.formFishingMethod.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldE(field: string): boolean {
    if (this.formEditFishingMethod.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.fishingMethodArray = [];
    this.getFishingMethod(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }
}
