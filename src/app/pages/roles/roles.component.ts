/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public numberDataShow: number = 10;

  public numberPages: number = 0;

  // Estructura Rolularios
  public searchRol:string;

  public rolArray = [];

  public rolArrayForFilter = [];

  public formRol: FormGroup;

  public formEditRol: FormGroup;

  // Control de vistas
  id_view = 0;

  inputData = false;

  // Jumm?
  public formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private rolService: RolesService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getRols(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getRols(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.rolService.getRoles(status).subscribe(
      (result: any) => {
        this.rolArray = result.items;
        this.rolArrayForFilter = this.rolArray;
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
      }
    );
    this.id_view = 0;
  }

  /**
   * Función para obtener la posición del arte de pesca
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionRol(idRol:string) {
    const position = this.rolArray
      .findIndex((rol: any) => rol._id === idRol) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterRol(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.rolArray = this.rolArrayForFilter
      .filter((rolArray) => rolArray.description
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
  * La función inicializa el rolulario para agregar rol de tipo RolGroup
  * @returns void
  */
  initForms() {
    this.formRol = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditRol = this.formBuilder.group({
      _id: [''],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar rol
   * @param modalRol es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalRol:NgbModal) {
    this.formSubmitted = false;
    this.inputData = false;
    this.modalService.open(modalRol, {
      centered: true,
      backdrop: 'static',
    });

    this.formRol.reset();
  }

  /**
   * Abre el modal para editar el rolulario
   *
   * @param editRolModal Modal que se va desplegar para editar
   * @param rol Data del rolulario seleccionado
   */
  openModalEdit(editRolModal:NgbModal, rol) {
    this.formSubmitted = false;
    this.changeSelect(rol.widget);

    this.modalService.open(editRolModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditRol.reset();

    this.formEditRol.patchValue({
      _id: rol._id,
      code: rol.code,
      name: rol.name,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataRol() {
    this.formSubmitted = true;
    this.formRol.patchValue({
      code: this.formRol.value.code.trim(),
      name: this.formRol.value.name.trim(),
    });

    if (this.formRol.invalid) {
      console.log('ERROR WE');
    } else {
      this.rolService.createRol(this.formRol.value).subscribe(
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
          this.getRols(true);
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
  updateDataRol() {
    this.formSubmitted = true;
    this.formEditRol.patchValue({
      code: this.formEditRol.value.code.trim(),
      name: this.formEditRol.value.name.trim(),
    });

    if (this.formEditRol.invalid) {
      console.log('ERROR WE');
    } else {
      this.rolService.updateRol(this.formEditRol.value).subscribe(
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
          this.getRols(true);
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
   * @param rol Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(rol) {
    const status = rol.is_active;

    this.rolService.disableRol({ id: rol._id, is_active: !status }).subscribe(
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
        this.getRols(true);
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

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessage(field: string): string {
    let message = '';
    if (this.formRol.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formRol.get(field)!.hasError('minlength')) {
      const minLength = this.formRol.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formRol.get(field)!.hasError('maxlength')) {
      const maxLength = this.formRol.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formRol.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formRol.get(field)!.hasError('min')) {
      const min = this.formRol.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formRol.get(field)!.hasError('max')) {
      const max = this.formRol.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
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
    if (this.formEditRol.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditRol.get(field)!.hasError('minlength')) {
      const minLength = this.formEditRol.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditRol.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditRol.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditRol.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditRol.get(field)!.hasError('min')) {
      const min = this.formEditRol.get(field)!.errors?.min.required;
      message = `Este campo debe tener un número mínimo de ${min} cifras`;
    } else if (this.formEditRol.get(field)!.hasError('max')) {
      const max = this.formEditRol.get(field)!.errors?.max.required;
      message = `Este campo debe tener un número maximo de ${max} cifras`;
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
    if (this.formRol.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditRol.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.rolArray = [];
    this.getRols(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Controla lo que la persona puede escribir;
   *
   * @param event Tecla digitada
   * @returns Caracteres de texto permitidos
   */
  keyboardDisabled(event) {
    return (event >= 48 && event <= 57);
  }

  /**
   * Controla lo que la persona puede escribir;
   *
   * @param event Tecla digitada
   * @returns Caracteres de texto permitidos
   */
  keyboardDisabledNumbers(event) {
    return (event >= 48 && event <= 57)
    || (event >= 65 && event <= 90)
    || (event >= 97 && event <= 122);
  }

  /**
   * Capta los cambios del select;
   *
   * @param event Valor del select
   * @returns Array de data que escoge
   */
  changeSelect(event) {
    if (event === 'select' || event === 'checkbox' || event === 'radiobutton') {
      this.inputData = true;
    } else {
      this.inputData = false;
    }
  }
}
