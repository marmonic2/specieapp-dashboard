/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { FishingAreaService } from './fishing-area.service';

@Component({
  selector: 'app-fishing-area',
  templateUrl: './fishing-area.component.html',
  styleUrls: ['./fishing-area.component.scss'],
})
export class FishingAreaComponent implements OnInit {
  public searchFishingArea:string;

  public fishingAreaArray = [];

  public fishingAreaArrayForFilter = [];

  public fishingAreaForFilter: [];

  public numberFishingAreaShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formFishingArea: FormGroup;

  public formEditFishingArea: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private fishingAreaService: FishingAreaService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getFishingArea(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getFishingArea(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.fishingAreaService.getFishingArea(status).subscribe(
      (result: any) => {
        this.fishingAreaArray = result.items;
        this.fishingAreaArrayForFilter = this.fishingAreaArray;
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
  getPositionFishingArea(idFishingArea:string) {
    const position = this.fishingAreaArray
      .findIndex((fishingArea: any) => fishingArea._id === idFishingArea) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterFishingArea(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.fishingAreaArray = this.fishingAreaArrayForFilter
      .filter((fishingAreaArray) => fishingAreaArray.description
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
  * La función inicializa el formulario para agregar fishingArea de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formFishingArea = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditFishingArea = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar fishingArea
   * @param modalFishingArea es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalFishingArea:NgbModal) {
    this.modalService.open(modalFishingArea, {
      centered: true,
      backdrop: 'static',
    });

    this.formFishingArea.reset();
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editFishingAreaModal Modal que se va desplegar para editar
   * @param fishingArea Data del arte de pesca seleccionado
   */
  openModalEdit(editFishingAreaModal:NgbModal, fishingArea) {
    this.modalService.open(editFishingAreaModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditFishingArea.reset();

    this.formEditFishingArea.patchValue({
      _id: fishingArea._id,
      description: fishingArea.description,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataFishingArea() {
    this.formSubmitted = true;

    if (this.formFishingArea.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingAreaService.createFishingArea(this.formFishingArea.value).subscribe(
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
          this.getFishingArea(true);
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
  updateDataFishingArea() {
    this.formSubmitted = true;

    if (this.formEditFishingArea.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingAreaService.updateFishingArea(this.formEditFishingArea.value).subscribe(
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
          this.getFishingArea(true);
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
   * @param fishingArea Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(fishingArea) {
    const status = fishingArea.is_active;

    this.fishingAreaService
      .disableFishingArea({ id: fishingArea._id, is_active: !status }).subscribe(
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
          this.getFishingArea(true);
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
    if (this.formFishingArea.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formFishingArea.get(field)!.hasError('minlength')) {
      const minLength = this.formFishingArea.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formFishingArea.get(field)!.hasError('maxlength')) {
      const maxLength = this.formFishingArea.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formFishingArea.get(field)!.hasError('pattern')) {
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
    if (this.formEditFishingArea.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishingArea.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishingArea.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishingArea.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishingArea.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishingArea.get(field)!.hasError('pattern')) {
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
    if (this.formFishingArea.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditFishingArea.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.fishingAreaArray = [];
    this.getFishingArea(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }
}
