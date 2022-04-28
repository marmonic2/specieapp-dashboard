/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import arrayNamesQuestion from './nameQuestionSection.json';
import { SectionsService } from './sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  public numberDataShow: number = 10;

  public numberPages: number = 0;

  // Estructura Formularios
  public searchForm:string;

  public sectionArray = [];

  public sectionArrayForFilter = [];

  public sectionForFilter: [];

  public totalLengthOfCollection: number;

  public formSection: FormGroup;

  public formEditSection: FormGroup;

  // Control de vistas
  id_view = 0;

  inputData = false;

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

  public formArray = [];

  public arrayNameTrue = [];

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private formService: SectionsService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getSections(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los artes de pesca
   * @returns void
   */
  getSections(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.formService.getSection(status).subscribe(
      (result: any) => {
        this.sectionArray = result.items;
        this.sectionArrayForFilter = this.sectionArray;
        this.swal.closeNotificationLoading();

        this.formService.getForm(status).subscribe(
          (efect: any) => {
            this.formArray = efect.items;
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
  getPositionSection(idSection:string) {
    const position = this.sectionArray
      .findIndex((section: any) => section._id === idSection) + 1;
    return position;
  }

  /**
   * la función es para filtrar los artes de pesca listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterSection(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.sectionArray = this.sectionArrayForFilter
      .filter((sectionArray) => sectionArray.description
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
  * La función inicializa el formulario para agregar form de tipo SectionGroup
  * @returns void
  */
  initForms() {
    this.formSection = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      form_available: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      duplicate: [false, [Validators.required, Validators.minLength(3)]],
      nameQuestion: ['', [Validators.minLength(4), Validators.maxLength(64)]],
      moreOne: [true, [Validators.minLength(3)]],
    });

    this.formEditSection = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      form_available: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      duplicate: [false, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      nameQuestion: ['', [Validators.minLength(4), Validators.maxLength(64)]],
      moreOne: [true, [Validators.minLength(3)]],
    });
  }

  /**
   * La función abre el modal para agregar form
   * @param modalSection es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalSection:NgbModal) {
    this.inputData = false;
    this.modalService.open(modalSection, {
      centered: true,
      backdrop: 'static',
    });

    this.formSection.reset();
  }

  /**
   * Abre el modal para editar la pregunta
   *
   * @param editFormModal Modal que se va desplegar para editar
   * @param form Data de pregunta seleccionada
   */
  openModalEdit(editFormModal:NgbModal, form) {
    this.inputData = false;
    this.modalService.open(editFormModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditSection.reset();
    if (form.duplicate) {
      this.inputData = true;
      this.searchNameQuestion(form, 'modalEdit');
    }

    this.formEditSection.patchValue({
      _id: form._id,
      description: form.description,
      form_available: form.form_available._id,
      duplicate: form.duplicate,
      nameQuestion: form.nameQuestion,
      moreOne: form.moreOne,
    });
  }

  /**
   * Crea un Arte de pesca en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataSection() {
    this.formSubmitted = true;
    this.formSection.patchValue({
      description: this.formSection.value.description.trim(),
    });

    if (this.formSection.invalid) {
      console.log('ERROR WE');
    } else {
      // const position = this.formArray
      //   .findIndex((data) => data._id === this.formSection.value.form_available);
      if (!this.formSection.value.duplicate) {
        this.formSection.patchValue({
          nameQuestion: 'ninguna',
          moreOne: false,
        });
      }
      // } else if (this.formArray[position].code === 'FO-MI-DP-07') {
      //   this.formSection.patchValue({
      //     nameQuestion: 'weight_check_specie',
      //   });
      // } else if (this.formArray[position].code === '1500-63.04') {
      //   this.formSection.patchValue({
      //     nameQuestion: 'measured_specie',
      //   });
      // } else if (this.formArray[position].code === 'ID-RE-AGRO-01') {
      //   this.formSection.patchValue({
      //     nameQuestion: 'crops_produced',
      //   });
      // } else if (this.formArray[position].code === 'FO-MI-DP-03') {
      //   this.formSection.patchValue({
      //     nameQuestion: 'ninguna',
      //   });
      // }
      this.formService.createSection(this.formSection.value).subscribe(
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
          this.getSections(true);
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
  updateDataSection() {
    this.formSubmitted = true;
    this.formEditSection.patchValue({
      description: this.formEditSection.value.description.trim(),
    });

    if (this.formEditSection.invalid) {
      console.log('ERROR WE');
    } else {
      if (!this.formEditSection.value.duplicate) {
        this.formEditSection.patchValue({
          nameQuestion: 'ninguna',
          moreOne: false,
        });
      }
      this.formService.updateSection(this.formEditSection.value).subscribe(
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
          this.getSections(true);
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

    this.formService.disableSection({ id: form._id, is_active: !status }).subscribe(
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
        this.getSections(true);
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
    if (this.formSection.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formSection.get(field)!.hasError('minlength')) {
      const minLength = this.formSection.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formSection.get(field)!.hasError('maxlength')) {
      const maxLength = this.formSection.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formSection.get(field)!.hasError('pattern')) {
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
    if (this.formEditSection.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSection.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSection.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSection.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSection.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSection.get(field)!.hasError('pattern')) {
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
    if (this.formSection.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditSection.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.sectionArray = [];
    this.getSections(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Capta los cambios del select para widget;
   *
   * @param event Valor del select
   * @returns Array de data que escoge
   */
  changeSelect(event, form) {
    const position = this.formArray.findIndex((data) => data._id === form.value.form_available);
    if (position !== -1) {
      if (event === 'true') {
        this.inputData = true;
        this.searchNameQuestion(form, 'select');
      } else {
        this.inputData = false;
      }
    }
  }

  /**
   * Busca el array de preguntas asociadas a ese formulario
   *
   * @param dataForm Formulario a evaluar
   * @returns Array de data encontrada
   */
  searchNameQuestion(dataForm, tipo) {
    let pos = 0;
    switch (tipo) {
      case 'modalEdit':
        pos = this.formatArray.findIndex((data) => data === dataForm.form_available.code);
        if (pos !== -1) {
          if (dataForm.form_available.code === 'FO-MI-DP-03') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-03'];
          } else if (dataForm.form_available.code === '1500-63.04') {
            this.arrayNameTrue = arrayNamesQuestion['1500-63.04'];
          } else if (dataForm.form_available.code === 'FO-MI-DP-02') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-02'];
          } else if (dataForm.form_available.code === 'FO-MI-DP-07') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-07'];
          } else if (dataForm.form_available.code === 'FO-MI-DP-06') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-06'];
          } else if (dataForm.form_available.code === 'ID-RE-AGRO-01') {
            this.arrayNameTrue = arrayNamesQuestion['ID-RE-AGRO-01'];
          } else if (dataForm.form_available.code === 'CO-IN-AGRO-01') {
            this.arrayNameTrue = arrayNamesQuestion['CO-IN-AGRO-01'];
          } else if (dataForm.form_available.code === 'MO-PRI-01') {
            this.arrayNameTrue = arrayNamesQuestion['MO-PRI-01'];
          }
        } else {
          console.log('no honey modal');
        }
        break;
      case 'select':
        pos = this.formArray.findIndex((data) => data._id === dataForm.value.form_available);
        if (pos !== -1) {
          if (this.formArray[pos].code === 'FO-MI-DP-03') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-03'];
          } else if (this.formArray[pos].code === '1500-63.04') {
            this.arrayNameTrue = arrayNamesQuestion['1500-63.04'];
          } else if (this.formArray[pos].code === 'FO-MI-DP-02') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-02'];
          } else if (this.formArray[pos].code === 'FO-MI-DP-07') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-07'];
          } else if (this.formArray[pos].code === 'FO-MI-DP-06') {
            this.arrayNameTrue = arrayNamesQuestion['FO-MI-DP-06'];
          } else if (this.formArray[pos].code === 'ID-RE-AGRO-01') {
            this.arrayNameTrue = arrayNamesQuestion['ID-RE-AGRO-01'];
          } else if (this.formArray[pos].code === 'CO-IN-AGRO-01') {
            this.arrayNameTrue = arrayNamesQuestion['CO-IN-AGRO-01'];
          } else if (this.formArray[pos].code === 'MO-PRI-01') {
            this.arrayNameTrue = arrayNamesQuestion['MO-PRI-01'];
          }
        } else {
          console.log('no honey select');
        }
        break;

      default:
        console.log('no honey maximus');

        break;
    }
  }
}
