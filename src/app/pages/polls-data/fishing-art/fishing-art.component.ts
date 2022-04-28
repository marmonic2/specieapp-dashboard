/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { FishingArtService } from './fishing-art.service';

@Component({
  selector: 'app-fishing-art',
  templateUrl: './fishing-art.component.html',
  styleUrls: ['./fishing-art.component.scss'],
})
export class FishingArtComponent implements OnInit {
  public searchFishingArt:string;

  public fishingArtArray = [];

  public fishingArtArrayForFilter = [];

  public fishingArtForFilter: [];

  public numberFishingArtShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formFishingArt: FormGroup;

  public formEditFishingArt: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private fishingArtService: FishingArtService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getFishingArt(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getFishingArt(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.fishingArtService.getFishingArt(status).subscribe(
      (result: any) => {
        this.fishingArtArray = result.items;
        this.fishingArtArrayForFilter = this.fishingArtArray;
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
      }
    );
    this.id_view = 0;
  }

  /**
   * Función para obtener la posición del arte de pesca
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionFishingArt(idFishingArt:string) {
    const position = this.fishingArtArray
      .findIndex((fishingArt: any) => fishingArt._id === idFishingArt) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterFishingArt(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.fishingArtArray = this.fishingArtArrayForFilter
      .filter((fishingArtArray) => fishingArtArray.description
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
  * La función inicializa el formulario para agregar fishingArt de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formFishingArt = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditFishingArt = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar fishingArt
   * @param modalFishingArt es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalFishingArt:NgbModal) {
    this.modalService.open(modalFishingArt, {
      centered: true,
      backdrop: 'static',
    });

    this.formFishingArt.reset();
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editFishingArtModal Modal que se va desplegar para editar
   * @param fishingArt Data del arte de pesca seleccionado
   */
  openModalEdit(editFishingArtModal:NgbModal, fishingArt) {
    this.modalService.open(editFishingArtModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditFishingArt.reset();

    this.formEditFishingArt.patchValue({
      _id: fishingArt._id,
      description: fishingArt.description,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataFishingArt() {
    this.formSubmitted = true;

    if (this.formFishingArt.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingArtService.createFishingArt(this.formFishingArt.value).subscribe(
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
          this.getFishingArt(true);
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
  updateDataFishingArt() {
    this.formSubmitted = true;

    if (this.formEditFishingArt.invalid) {
      console.log('ERROR WE');
    } else {
      this.fishingArtService.updateFishingArt(this.formEditFishingArt.value).subscribe(
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
          this.getFishingArt(true);
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
   * @param fishingArt Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(fishingArt) {
    const status = fishingArt.is_active;

    this.fishingArtService.disableFishingArt({ id: fishingArt._id, is_active: !status }).subscribe(
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
        this.getFishingArt(true);
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
    if (this.formFishingArt.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formFishingArt.get(field)!.hasError('minlength')) {
      const minLength = this.formFishingArt.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formFishingArt.get(field)!.hasError('maxlength')) {
      const maxLength = this.formFishingArt.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formFishingArt.get(field)!.hasError('pattern')) {
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
    if (this.formEditFishingArt.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishingArt.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishingArt.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishingArt.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishingArt.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishingArt.get(field)!.hasError('pattern')) {
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
    if (this.formFishingArt.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditFishingArt.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.fishingArtArray = [];
    this.getFishingArt(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }
}
