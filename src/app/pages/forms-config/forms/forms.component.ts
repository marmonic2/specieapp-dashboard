/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { FormViewComponent } from './form-view/form-view.component';
import { FormsService } from './forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  public numberDataShow: number = 10;

  public numberPages: number = 0;

  // Estructura Formularios
  public searchForm:string;

  public formArray = [];

  public dataComplete = [];

  public formArrayForFilter = [];

  public formForFilter: [];

  public formForm: FormGroup;

  public formEditForm: FormGroup;

  // Control de vistas
  id_view = 0;

  inputData = false;

  posMeasurement: number;

  formatArray: string[] = [
    'FO-MI-DP-03',
    '1500-63.04',
    'FO-MI-DP-02',
    'FO-MI-DP-07',
    'FO-MI-DP-06',
    'ID-RE-AGRO-01',
    'CO-IN-AGRO-01',
    'MO-PRI-01',
  ];

  // Jumm?
  public formSubmitted = false;

  public modulesArray: [];

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private formService: FormsService,
    public routes: Router,
    private swal: SwalService,
  ) {
    this.getForms(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getForms(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.formService.getForm(status).subscribe(
      (result: any) => {
        this.formArray = result.items;
        this.formArrayForFilter = this.formArray;
        this.swal.closeNotificationLoading();

        this.formService.getModule(status).subscribe(
          (efect: any) => {
            this.modulesArray = efect.items;
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

        this.formService.getDataTotal(status).subscribe(
          (efect: any) => {
            this.dataComplete = efect.modules;
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
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionForm(idForm:string) {
    const position = this.formArray
      .findIndex((form: any) => form._id === idForm) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterForm(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.formArray = this.formArrayForFilter
      .filter((formArray) => formArray.description
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
  * La función inicializa el formulario para agregar form de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      category: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      module: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      version: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      approvalDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditForm = this.formBuilder.group({
      _id: [''],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      category: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      module: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      version: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      approvalDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar form
   * @param modalForm es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalForm:NgbModal) {
    this.formSubmitted = false;
    this.modalService.open(modalForm, {
      centered: true,
      backdrop: 'static',
    });

    this.formForm.reset();
  }

  /**
   * Abre el modal para editar la pregunta
   *
   * @param editFormModal Modal que se va desplegar para editar
   * @param form Data de pregunta seleccionada
   */
  openModalEdit(editFormModal:NgbModal, form, pos) {
    this.formSubmitted = false;
    this.posMeasurement = pos;
    this.modalService.open(editFormModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditForm.reset();

    if (form.category !== 'General') {
      this.inputData = true;
    } else {
      this.inputData = false;
    }

    this.formEditForm.patchValue({
      _id: form._id,
      code: form.code,
      description: form.description,
      category: form.category,
      module: form.module._id,
      version: form.version,
      approvalDate: form.approvalDate.split('T')[0],
    });
  }

  /**
   * Abre el modal para ver la estructura del formulario
   *
   * @param posIncome Posición seleccionada
   */
  openModalView(form) {
    const modalRef:NgbModalRef = this.modalService.open(FormViewComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.data = form;
    modalRef.componentInstance.arrayTotal = this.dataComplete;
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataForm() {
    const hoy = new Date();
    const dateParse = `${this.formForm.value.approvalDate} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    this.formSubmitted = true;

    this.formForm.patchValue({
      code: this.formForm.value.code.trim(),
      description: this.formForm.value.description.trim(),
      version: '1',
    });

    const data: any = this.modulesArray
      .find((description: any) => description._id === this.formForm.value.module);
    if (data.description.toLocaleLowerCase().includes('agro')) {
      this.formForm.patchValue({
        category: 'General',
      });
    }

    if (this.formForm.invalid) {
      console.log('ERROR WE');
    } else {
      this.formForm.patchValue({
        approvalDate: Date.parse(dateParse),
      });

      this.formService.createForm(this.formForm.value).subscribe(
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
          this.getForms(true);
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
  updateDataForm() {
    const hoy = new Date();
    const dateParse = `${this.formEditForm.value.approvalDate} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    this.formSubmitted = true;
    this.formEditForm.patchValue({
      code: this.formEditForm.value.code.trim(),
      description: this.formEditForm.value.description.trim(),
    });

    const data: any = this.modulesArray
      .find((description: any) => description._id === this.formEditForm.value.module);
    if (data.description.toLocaleLowerCase().includes('agro')) {
      this.formEditForm.patchValue({
        category: 'General',
      });
    }

    if (this.formEditForm.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditForm.patchValue({
        version: (parseInt(this.formEditForm.value.version, 10) + 1).toString(),
        approvalDate: Date.parse(dateParse),
      });
      this.formService.updateForm(this.formEditForm.value).subscribe(
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
          this.getForms(true);
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
   * @param form Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(form) {
    const status = form.is_active;

    this.formService.disableForm({ id: form._id, is_active: !status }).subscribe(
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
        this.getForms(true);
      },
      (error) => {
        Swal.fire({
          title: 'Error!!',
          icon: 'error',
          html: error.message,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
        });
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
    if (this.formForm.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formForm.get(field)!.hasError('minlength')) {
      const minLength = this.formForm.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formForm.get(field)!.hasError('maxlength')) {
      const maxLength = this.formForm.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formForm.get(field)!.hasError('pattern')) {
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
    if (this.formEditForm.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditForm.get(field)!.hasError('minlength')) {
      const minLength = this.formEditForm.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditForm.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditForm.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditForm.get(field)!.hasError('pattern')) {
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
    if (this.formForm.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.formArray = [];
    this.getForms(status);
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
  keyboardDisabledNumbers(event) {
    return (event >= 48 && event <= 57)
    || (event >= 65 && event <= 90)
    || (event >= 97 && event <= 122) || event === 45;
  }

  /**
   * Capta los cambios del select para widget;
   *
   * @param event Valor del select
   * @returns Array de data que escoge
   */
  changeSelect(event) {
    const data: any = this.modulesArray.find((description: any) => description._id === event);

    if (data.description.toLocaleLowerCase().includes('pesca')) {
      this.inputData = true;
    } else {
      this.inputData = false;
    }
  }
}
