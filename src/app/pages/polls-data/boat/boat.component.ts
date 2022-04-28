/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { BoatService } from './boat.service';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {
  public searchBoat:string;

  public boatArray = [];

  public boatArrayForFilter = [];

  public boatForFilter: [];

  public numberBoatShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formBoat: FormGroup;

  public formEditBoat: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private boatService: BoatService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getBoat(true);
    this.initForms();
  }

  /**
   * La función obtiene todas las embarcaciones
   *
   * @returns void
   */
  getBoat(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.boatService.getBoat(status).subscribe(
      (result: any) => {
        this.boatArray = result.items;
        this.boatArrayForFilter = this.boatArray;
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
  getPositionBoat(idBoat:string) {
    const position = this.boatArray
      .findIndex((boat: any) => boat._id === idBoat) + 1;
    return position;
  }

  /**
   * La función es para filtrar las embarcaciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterBoat(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.boatArray = this.boatArrayForFilter
      .filter((boatArray) => boatArray.description
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
  * La función inicializa el formulario para agregar boat de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formBoat = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      enrollment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditBoat = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      enrollment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar boat
   * @param modalBoat es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalBoat:NgbModal) {
    this.modalService.open(modalBoat, {
      centered: true,
      backdrop: 'static',
    });

    this.formBoat.reset();
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editBoatModal Modal que se va desplegar para editar
   * @param boat Data del arte de pesca seleccionado
   */
  openModalEdit(editBoatModal:NgbModal, boat) {
    this.modalService.open(editBoatModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditBoat.reset();

    this.formEditBoat.patchValue({
      _id: boat._id,
      description: boat.description,
      enrollment: boat.enrollment,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataBoat() {
    this.formSubmitted = true;
    this.formEditBoat.patchValue({
      description: this.formEditBoat.value.description.trim(),
      enrollment: this.formEditBoat.value.enrollment.trim(),
    });

    if (this.formBoat.invalid) {
      console.log('ERROR WE');
    } else {
      this.boatService.createBoat(this.formBoat.value).subscribe(
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
          this.getBoat(true);
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
   * Guarda los cambios realizados a las Embarcaciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataBoat() {
    this.formSubmitted = true;

    if (this.formEditBoat.invalid) {
      console.log('ERROR WE');
    } else {
      this.boatService.updateBoat(this.formEditBoat.value).subscribe(
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
          this.getBoat(true);
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
   * @param boat Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(boat) {
    const status = boat.is_active;

    this.boatService.disableBoat({ id: boat._id, is_active: !status }).subscribe(
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
        this.getBoat(true);
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
    if (this.formBoat.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formBoat.get(field)!.hasError('minlength')) {
      const minLength = this.formBoat.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formBoat.get(field)!.hasError('maxlength')) {
      const maxLength = this.formBoat.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formBoat.get(field)!.hasError('pattern')) {
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
    if (this.formEditBoat.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditBoat.get(field)!.hasError('minlength')) {
      const minLength = this.formEditBoat.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditBoat.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditBoat.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditBoat.get(field)!.hasError('pattern')) {
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
    if (this.formBoat.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditBoat.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.boatArray = [];
    this.getBoat(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }
}
