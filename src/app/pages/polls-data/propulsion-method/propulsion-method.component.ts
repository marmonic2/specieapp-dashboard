/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { PropulsionMethodService } from './propulsion-method.service';

@Component({
  selector: 'app-propulsion-method',
  templateUrl: './propulsion-method.component.html',
  styleUrls: ['./propulsion-method.component.scss'],
})
export class PropulsionMethodComponent implements OnInit {
  public searchPropulsionMethod:string;

  public propulsionMethodArray = [];

  public propulsionMethodArrayForFilter = [];

  public propulsionMethodForFilter: [];

  public numberPropulsionMethodShow: number = 5;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formPropulsionMethod: FormGroup;

  public formEditPropulsionMethod: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private propulsionMethodService: PropulsionMethodService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getPropulsionMethod(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getPropulsionMethod(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.propulsionMethodService.getPropulsionMethod(status).subscribe(
      (result: any) => {
        this.propulsionMethodArray = result.items;
        this.propulsionMethodArrayForFilter = this.propulsionMethodArray;
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
  getPositionPropulsionMethod(idPropulsionMethod:string) {
    const position = this.propulsionMethodArray
      .findIndex((propulsionMethod: any) => propulsionMethod._id === idPropulsionMethod) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterPropulsionMethod(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.propulsionMethodArray = this.propulsionMethodArrayForFilter
      .filter((propulsionMethodArray) => propulsionMethodArray.description
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
  * La función inicializa el formulario para agregar propulsionMethod de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formPropulsionMethod = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditPropulsionMethod = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar propulsionMethod
   * @param modalPropulsionMethod es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalPropulsionMethod:NgbModal) {
    this.modalService.open(modalPropulsionMethod, {
      centered: true,
      backdrop: 'static',
    });

    this.formPropulsionMethod.reset();
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editPropulsionMethodModal Modal que se va desplegar para editar
   * @param propulsionMethod Data del arte de pesca seleccionado
   */
  openModalEdit(editPropulsionMethodModal:NgbModal, propulsionMethod) {
    this.modalService.open(editPropulsionMethodModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditPropulsionMethod.reset();

    this.formEditPropulsionMethod.patchValue({
      _id: propulsionMethod._id,
      description: propulsionMethod.description,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataPropulsionMethod() {
    this.formSubmitted = true;

    if (this.formPropulsionMethod.invalid) {
      console.log('ERROR WE');
    } else {
      this.propulsionMethodService
        .createPropulsionMethod(this.formPropulsionMethod.value).subscribe(
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
            this.getPropulsionMethod(true);
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
   * Guarda los cambios realizados a los Artes de pesca
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataPropulsionMethod() {
    this.formSubmitted = true;

    if (this.formEditPropulsionMethod.invalid) {
      console.log('ERROR WE');
    } else {
      this.propulsionMethodService
        .updatePropulsionMethod(this.formEditPropulsionMethod.value).subscribe(
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
            this.getPropulsionMethod(true);
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
   * @param propulsionMethod Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(propulsionMethod) {
    const status = propulsionMethod.is_active;

    this.propulsionMethodService
      .disablePropulsionMethod({ id: propulsionMethod._id, is_active: !status }).subscribe(
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
          this.getPropulsionMethod(true);
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
    if (this.formPropulsionMethod.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formPropulsionMethod.get(field)!.hasError('minlength')) {
      const minLength = this.formPropulsionMethod.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formPropulsionMethod.get(field)!.hasError('maxlength')) {
      const maxLength = this.formPropulsionMethod.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formPropulsionMethod.get(field)!.hasError('pattern')) {
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
    if (this.formEditPropulsionMethod.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditPropulsionMethod.get(field)!.hasError('minlength')) {
      const minLength = this.formEditPropulsionMethod.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditPropulsionMethod.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditPropulsionMethod.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditPropulsionMethod.get(field)!.hasError('pattern')) {
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
    if (this.formPropulsionMethod.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditPropulsionMethod.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.propulsionMethodArray = [];
    this.getPropulsionMethod(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }
}
