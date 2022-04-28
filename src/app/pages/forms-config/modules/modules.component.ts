/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { ModulesService } from './modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  public numberDataShow: number = 10;

  public numberPages: number = 0;

  // Estructura Moduleularios
  public searchModule:string;

  public moduleArray = [];

  public moduleArrayForFilter = [];

  public moduleForFilter: [];

  public totalLengthOfCollection: number;

  public formModule: FormGroup;

  public formEditModule: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private moduleService: ModulesService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getModules(true);
    this.initModules();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getModules(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.moduleService.getModule(status).subscribe(
      (result: any) => {
        this.moduleArray = result.items;
        this.moduleArrayForFilter = this.moduleArray;
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
  getPositionModule(idModule:string) {
    const position = this.moduleArray
      .findIndex((module: any) => module._id === idModule) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterModule(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.moduleArray = this.moduleArrayForFilter
      .filter((moduleArray) => moduleArray.description
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
  * La función inicializa el moduleulario para agregar module de tipo ModuleGroup
  * @returns void
  */
  initModules() {
    this.formModule = this.formBuilder.group({
      code: ['', [Validators.required, Validators.min(1), Validators.max(25)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      icon: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditModule = this.formBuilder.group({
      _id: [''],
      code: ['', [Validators.required, Validators.min(1), Validators.max(25)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      icon: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar module
   * @param modalModule es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalModule:NgbModal) {
    this.formSubmitted = false;
    this.modalService.open(modalModule, {
      centered: true,
      backdrop: 'static',
    });

    this.formModule.reset();
  }

  /**
   * Abre el modal para editar la pregunta
   *
   * @param editModuleModal Modal que se va desplegar para editar
   * @param module Data de pregunta seleccionada
   */
  openModalEdit(editModuleModal:NgbModal, module) {
    this.formSubmitted = false;
    this.modalService.open(editModuleModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditModule.reset();

    this.formEditModule.patchValue({
      _id: module._id,
      code: module.code,
      description: module.description,
      icon: module.icon,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataModule() {
    this.formSubmitted = true;
    this.formModule.patchValue({
      description: this.formModule.value.description.trim(),
    });
    if (this.formModule.invalid) {
      console.log('ERROR WE');
    } else {
      this.moduleService.createModule(this.formModule.value).subscribe(
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
          this.getModules(true);
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
  updateDataModule() {
    this.formSubmitted = true;
    this.formEditModule.patchValue({
      description: this.formEditModule.value.description.trim(),
    });
    if (this.formEditModule.invalid) {
      console.log('ERROR WE');
    } else {
      this.moduleService.updateModule(this.formEditModule.value).subscribe(
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
          this.getModules(true);
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
   * @param module Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(module) {
    const status = module.is_active;

    this.moduleService.disableModule({ id: module._id, is_active: !status }).subscribe(
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
        this.getModules(true);
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
    if (this.formModule.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formModule.get(field)!.hasError('minlength')) {
      const minLength = this.formModule.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formModule.get(field)!.hasError('maxlength')) {
      const maxLength = this.formModule.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formModule.get(field)!.hasError('pattern')) {
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
    if (this.formEditModule.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditModule.get(field)!.hasError('minlength')) {
      const minLength = this.formEditModule.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditModule.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditModule.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditModule.get(field)!.hasError('pattern')) {
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
    if (this.formModule.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditModule.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.moduleArray = [];
    this.getModules(status);
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
  keyboardDisabledKeys(event) {
    return (event >= 48 && event <= 57);
  }
}
