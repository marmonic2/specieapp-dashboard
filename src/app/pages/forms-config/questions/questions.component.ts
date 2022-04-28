/* eslint-disable no-unreachable */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import dataLoca from './arrayNameQuestion.json';
import { QuestionsService } from './questions.service';
import { QuestionStructure } from './question-structure';
import { SectionStructure } from '../sections/section-structure';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  public numberDataShow: number = 10;

  public numberPages: number = 0;

  // Estructura Questionularios
  public searchQuestion:string;

  public questionArray: QuestionStructure[] = [];

  public questionArrayForFilter: QuestionStructure[] = [];

  public genericArray: any;

  public formQuestion: FormGroup;

  public formEditQuestion: FormGroup;

  // Control de vistas
  id_view = 0;

  inputData = false;

  inputDataStatus = false;

  inputDataType = false;

  // Jumm?
  public formSubmitted = false;

  // DataType Quemada
  public dataTypeArray: string[] = ['string', 'number', 'date', 'email', 'password', 'boolean'];

  public inputTypeArray: string[] = ['input', 'select', 'checkbox', 'textarea', 'canvas', 'radiobutton', 'date', 'time'];

  public questionNameArray: any = dataLoca;

  public sectionArray: SectionStructure [] = [];

  public userArray: [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private questionService: QuestionsService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getQuestions(true);
    this.initForms();
    this.getDataGeneric();
  }

  /**
   * La función obtiene todas las preguntas
   *
   * @returns void
   */
  getQuestions(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.questionService.getQuestion(status).subscribe(
      (result: any) => {
        this.questionArray = result.items;
        this.questionArrayForFilter = this.questionArray;
        this.swal.closeNotificationLoading();

        this.questionService.getSection(status).subscribe(
          (efect: any) => {
            this.sectionArray = efect.items;
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
        this.questionService.getUsers(status).subscribe(
          (efect: any) => {
            this.userArray = efect.items;
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
   * Función para obtener la posición de la pregunta
   *
   * @param idBanner id de la pregunta
   * @returns retorna la posición de la pregunta
   */
  getPositionQuestion(idQuestion:string) {
    const position = this.questionArray
      .findIndex((question: any) => question._id === idQuestion) + 1;
    return position;
  }

  /**
   * La función es para filtrar las preguntas listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterQuestion(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.questionArray = this.questionArrayForFilter
      .filter((questionArray) => questionArray.nameQuestion
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
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  /**
  * La función inicializa el questionulario para agregar question de tipo QuestionGroup
  *
  * @returns void
  */
  initForms() {
    this.formQuestion = this.formBuilder.group({
      nameQuestion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      widget_type: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      min: [0, [Validators.min(0), Validators.max(99)]],
      max: [0, [Validators.min(0), Validators.max(99)]],
      data: ['', [Validators.minLength(1), Validators.maxLength(64)]],
      dataType: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      required: [false, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      section_form: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditQuestion = this.formBuilder.group({
      _id: [''],
      nameQuestion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      widget_type: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      min: [0, [Validators.min(0), Validators.max(99)]],
      max: [0, [Validators.min(0), Validators.max(99)]],
      data: ['', [Validators.minLength(1), Validators.maxLength(64)]],
      dataType: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      required: [false, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      section_form: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * La función abre el modal para agregar question
   *
   * @param modalQuestion es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalQuestion:NgbModal) {
    this.formSubmitted = false;
    this.inputData = false;
    this.inputDataStatus = false;
    this.modalService.open(modalQuestion, {
      centered: true,
      backdrop: 'static',
    });

    this.formQuestion.reset();
  }

  /**
   * Abre el modal para editar el questionulario
   *
   * @param editQuestionModal Modal que se va desplegar para editar
   * @param question Data del questionulario seleccionado
   */
  openModalEdit(editQuestionModal:NgbModal, question) {
    this.formSubmitted = false;
    this.changeSelect(question.widget_type);
    this.changeSelectTwo(question.dataType);

    this.modalService.open(editQuestionModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditQuestion.reset();

    this.formEditQuestion.patchValue({
      _id: question._id,
      nameQuestion: question.nameQuestion,
      description: question.description,
      widget_type: question.widget_type,
      min: question.min,
      max: question.max,
      data: question.data,
      dataType: question.dataType,
      required: question.required,
      section_form: question.section_form._id,
    });
  }

  /**
   * Crea una pregunta en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataQuestion() {
    this.formSubmitted = true;
    this.formQuestion.patchValue({
      description: this.formQuestion.value.description.trim(),
    });

    /** Validación cuando no se rellena minimos o máximos */
    if (this.formQuestion.value.min === null) {
      this.formQuestion.patchValue({
        min: 0,
      });
    }

    if (this.formQuestion.value.max === null) {
      this.formQuestion.patchValue({
        max: 0,
      });
    }

    /** Validación de data array, vacío o no */
    if (this.inputData) {
      this.formQuestion.patchValue({
        data: this.createArraysQuestion(this.formQuestion.value.nameQuestion, 0),
      });
    } else {
      this.formQuestion.patchValue({
        data: [],
      });
    }

    /** Validación de tipologia para los widget_type */
    if (this.formQuestion.value.widget_type === 'date' || this.formQuestion.value.widget_type === 'time') {
      this.formQuestion.patchValue({
        dataType: 'number',
      });
    } else if (this.formQuestion.value.widget_type === 'select'
                || this.formQuestion.value.widget_type === 'checkbox'
                || this.formQuestion.value.widget_type === 'canvas'
                || this.formQuestion.value.widget_type === 'textarea'
                || this.formQuestion.value.widget_type === 'radiobutton') {
      this.formQuestion.patchValue({
        dataType: 'string',
      });
    }

    if (this.formQuestion.invalid) {
      console.log('ERROR WE');
      console.log(this.formQuestion);
    } else {
      this.questionService.createQuestion(this.formQuestion.value).subscribe(
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
          this.getQuestions(true);
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
   * Guarda los cambios realizados a las preguntas
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataQuestion() {
    this.formSubmitted = true;
    this.formEditQuestion.patchValue({
      description: this.formEditQuestion.value.description.trim(),
    });

    /** Validación cuando no se rellena minimos o máximos */
    if (this.formEditQuestion.value.min === null) {
      this.formEditQuestion.patchValue({
        min: 0,
      });
    }

    if (this.formEditQuestion.value.max === null) {
      this.formEditQuestion.patchValue({
        max: 0,
      });
    }

    /** Validación de data array, vacío o no */
    if (this.inputData) {
      this.formEditQuestion.patchValue({
        data: this.createArraysQuestion(this.formEditQuestion.value.nameQuestion, 1),
      });
    } else {
      this.formEditQuestion.patchValue({
        data: [],
      });
    }

    /** Validación de tipologia para los widget_type */
    if (this.formEditQuestion.value.widget_type === 'date' || this.formEditQuestion.value.widget_type === 'time') {
      this.formEditQuestion.patchValue({
        dataType: 'number',
      });
    } else if (this.formEditQuestion.value.widget_type === 'select'
                || this.formEditQuestion.value.widget_type === 'checkbox'
                || this.formEditQuestion.value.widget_type === 'canvas'
                || this.formEditQuestion.value.widget_type === 'radiobutton') {
      this.formEditQuestion.patchValue({
        dataType: 'string',
      });
    }

    console.log(this.formEditQuestion.value);

    if (this.formEditQuestion.invalid) {
      console.log('ERROR WE');
    } else {
      this.questionService.updateQuestion(this.formEditQuestion.value).subscribe(
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
          this.getQuestions(true);
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
   * @param question Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(question) {
    const status = question.is_active;

    this.questionService.disableQuestion({ id: question._id, is_active: !status }).subscribe(
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
        this.getQuestions(true);
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
    if (this.formQuestion.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formQuestion.get(field)!.hasError('minlength')) {
      const minLength = this.formQuestion.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formQuestion.get(field)!.hasError('maxlength')) {
      const maxLength = this.formQuestion.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formQuestion.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formQuestion.get(field)!.hasError('min')) {
      const min = this.formQuestion.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formQuestion.get(field)!.hasError('max')) {
      const max = this.formQuestion.get(field)!.errors?.max.max;
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
    if (this.formEditQuestion.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditQuestion.get(field)!.hasError('minlength')) {
      const minLength = this.formEditQuestion.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditQuestion.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditQuestion.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditQuestion.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditQuestion.get(field)!.hasError('min')) {
      const min = this.formEditQuestion.get(field)!.errors?.min.required;
      message = `Este campo debe tener un número mínimo de ${min} cifras`;
    } else if (this.formEditQuestion.get(field)!.hasError('max')) {
      const max = this.formEditQuestion.get(field)!.errors?.max.required;
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
    if (this.formQuestion.get(field)!.invalid && this.formSubmitted) {
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
    if (this.formEditQuestion.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.questionArray = [];
    this.getQuestions(status);
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
   * Capta los cambios del select para widget;
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

    if (event === 'input') {
      this.inputDataType = true;
    } else {
      this.inputDataType = false;
    }
  }

  /**
   * Capta los cambios del select para dataType;
   *
   * @param event Valor del select
   * @returns Array de data que escoge
   */
  changeSelectTwo(event) {
    if (event === 'number') {
      this.inputDataStatus = true;
    } else {
      this.inputDataStatus = false;
    }
  }

  /**
   * Crea un array quemado de acuerdo a x condiciones
   */
  createArraysQuestion(name, tipo) {
    let array: [{
      idData: any,
      descriptionData: string,
    }];

    let iterator = 0;

    let array2 = [];

    switch (name) {
      case 'gender':
        array = [{ idData: 'M', descriptionData: 'M' }];
        array.push({ idData: 'F', descriptionData: 'F' });
        break;

      case 'identification_type':
        array = [{ idData: 0, descriptionData: 'T.I' }];
        array.push({ idData: 1, descriptionData: 'C.C' });
        array.push({ idData: 2, descriptionData: 'C.E' });
        array.push({ idData: 3, descriptionData: 'P.P' });
        break;

      case 'group':
        array = [{ idData: 0, descriptionData: 'PECES' }];
        array.push({ idData: 1, descriptionData: 'CRUSTACEOS' });
        array.push({ idData: 2, descriptionData: 'MOLUSCOS' });
        break;

      case 'state':
        array = [{ idData: 0, descriptionData: 'EVISC CON ESCAMA' }];
        array.push({ idData: 1, descriptionData: 'LIMPIO - CON UÑA' });
        array.push({ idData: 2, descriptionData: 'TRONCO' });
        array.push({ idData: 3, descriptionData: 'COLA' });
        array.push({ idData: 4, descriptionData: 'FILETE' });
        array.push({ idData: 5, descriptionData: 'DESCABEZADO' });
        array.push({ idData: 6, descriptionData: 'ENTERO' });
        break;

      case 'sex':
        array = [{ idData: 'Macho', descriptionData: 'MACHO' }];
        array.push({ idData: 'Hembra', descriptionData: 'HEMBRA' });
        break;

      case 'person_type':
        array = [{ idData: 'natural', descriptionData: 'Persona Natural' }];
        array.push({ idData: 'juridica', descriptionData: 'Persona jurídica' });
        break;

      case 'localization':
        array = [{ idData: 1, descriptionData: 'San Andrés' }];
        array.push({ idData: 2, descriptionData: 'Providencia' });
        array.push({ idData: 3, descriptionData: 'Santa Catalína' });
        break;
      case 'principal_activity':
        array = [{ idData: 0, descriptionData: 'Producción de cultivos' }];
        array.push({ idData: 1, descriptionData: 'Ganadería/pastoreo' });
        array.push({ idData: 2, descriptionData: 'Silvicultura' });
        array.push({ idData: 3, descriptionData: 'Acuicultura' });
        break;
      case 'self_consumption':
        array = [{ idData: 0, descriptionData: 'Producción de cultivos' }];
        array.push({ idData: 1, descriptionData: 'Ganadería/pastoreo' });
        array.push({ idData: 2, descriptionData: 'Silvicultura' });
        array.push({ idData: 3, descriptionData: 'Acuicultura' });
        break;
      case 'income_generation':
        array = [{ idData: 0, descriptionData: 'Producción de cultivos' }];
        array.push({ idData: 1, descriptionData: 'Ganadería/pastoreo' });
        array.push({ idData: 2, descriptionData: 'Silvicultura' });
        array.push({ idData: 3, descriptionData: 'Acuicultura' });
        break;
      case 'form_ternure':
        array = [{ idData: 0, descriptionData: 'Propia' }];
        array.push({ idData: 1, descriptionData: 'Arriendo' });
        array.push({ idData: 2, descriptionData: 'Comodato' });
        array.push({ idData: 3, descriptionData: 'Ocupación de hecho' });
        break;
      case 'water_resource':
        array = [{ idData: 0, descriptionData: 'Lluvia' }];
        array.push({ idData: 1, descriptionData: 'Embalse' });
        array.push({ idData: 2, descriptionData: 'Pozo' });
        array.push({ idData: 3, descriptionData: 'Acueducto' });
        break;
      case 'cultivation_system':
        array = [{ idData: 0, descriptionData: 'Monocultivo' }];
        array.push({ idData: 1, descriptionData: 'Asociados' });
        array.push({ idData: 2, descriptionData: 'Rotación de cultivos' });
        array.push({ idData: 3, descriptionData: 'Cultivos y ganadería' });
        break;
      case 'isle':
        array = [{ idData: 'SAI', descriptionData: 'SAI' }];
        array.push({ idData: 'PVA', descriptionData: 'PVA' });
        break;
      case 'pr':
      case 'ovate':
      case 'products_below_size':
        array = [{ idData: true, descriptionData: 'SI' }];
        array.push({ idData: false, descriptionData: 'NO' });
        break;
      case 'schedule':
        array = [{ idData: true, descriptionData: 'DIA Y NOCHE' }];
        array.push({ idData: false, descriptionData: 'DIA' });
        break;
      case 'value_state':
      case 'status':
        array = [{ idData: 'E', descriptionData: 'Eviscerado' }];
        array.push({ idData: 'N', descriptionData: 'No Eviscerado' });
        array.push({ idData: 'F', descriptionData: 'Fileteado' });
        array.push({ idData: 'D', descriptionData: 'Desconchado' });
        break;
      case 'long_line':
        array = [{ idData: 'Pelagico', descriptionData: 'Pelagico' }];
        array.push({ idData: 'Demersal', descriptionData: 'Demersal' });
        array.push({ idData: 'Tiburoreno', descriptionData: 'Tiburoreno' });
        break;
      case 'type_fishshop':
        array = [{ idData: 'caracol', descriptionData: 'Caracol' }];
        array.push({ idData: 'langosta', descriptionData: 'Langosta' });
        array.push({ idData: 'blanca', descriptionData: 'Pesca Blanca' });
        break;
      case 'type':
        array = [{ idData: 'Manual', descriptionData: 'Manual' }];
        array.push({ idData: 'Eléctricos', descriptionData: 'Eléctricos' });
        break;
      case 'desc_production_expenses':
        array = [{ idData: 'Persona contratada', descriptionData: 'Persona contratada' }];
        array.push({ idData: 'Concentrados/forrajes', descriptionData: 'Concentrados/forrajes' });
        array.push({ idData: 'Gastos veterinarios', descriptionData: 'Gastos veterinarios' });
        array.push({ idData: 'Herramientas', descriptionData: 'Herramientas' });
        array.push({ idData: 'Respuestos, mantenimiento', descriptionData: 'Respuestos, mantenimiento' });
        array.push({ idData: 'Alquiler maquinaria, animales, etc.', descriptionData: 'Alquiler maquinaria, animales, etc.' });
        array.push({ idData: 'Transporte, almacenaje, etc.', descriptionData: 'Transporte, almacenaje, etc.' });
        array.push({ idData: 'Herbicidas, pesticidas, etc.', descriptionData: 'Herbicidas, pesticidas, etc.' });
        array.push({ idData: 'Instalaciones de riego', descriptionData: 'Instalaciones de riego' });
        array.push({ idData: 'Semillas, germoplasm', descriptionData: 'Semillas, germoplasm' });

        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'description',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'description',
          });
        }
        break;
      case 'crop':
        array2 = this.genericArray.crops;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.description, descriptionData: element.description }];
          } else {
            array.push({ idData: element.description, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;
      case 'desc_cultivation_sales':
        array2 = this.genericArray.crops;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.description, descriptionData: element.description }];
          } else {
            array.push({ idData: element.description, descriptionData: element.description });
          }
          iterator += 1;
        });

        if (tipo === 0 || tipo === 1) {
          this.formQuestion.patchValue({
            nameQuestion: 'description',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'description',
          });
        }
        break;
      case 'name_vegetables':
        array2 = dataLoca.vegetables;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element, descriptionData: element }];
            iterator += 1;
          } else {
            array.push({ idData: element, descriptionData: element });
          }
        });
        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'name',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'name',
          });
        }
        break;
      case 'name_tubers':
        array2 = dataLoca.tubers;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element, descriptionData: element }];
            iterator += 1;
          } else {
            array.push({ idData: element, descriptionData: element });
          }
        });
        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'name',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'name',
          });
        }
        break;
      case 'name_grains':
        array2 = dataLoca.grains;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element, descriptionData: element }];
            iterator += 1;
          } else {
            array.push({ idData: element, descriptionData: element });
          }
        });
        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'name',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'name',
          });
        }
        break;
      case 'name_meats':
        array2 = dataLoca.meats;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element, descriptionData: element }];
            iterator += 1;
          } else {
            array.push({ idData: element, descriptionData: element });
          }
        });
        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'name',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'name',
          });
        }
        break;
      case 'name_processed_products':
        array2 = dataLoca.processed_products;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element, descriptionData: element }];
            iterator += 1;
          } else {
            array.push({ idData: element, descriptionData: element });
          }
        });
        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'name',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'name',
          });
        }
        break;
      case 'desc_total_product_sales':
        array = [{ idData: 'Carne', descriptionData: 'Carne' }];
        array.push({ idData: 'Leche', descriptionData: 'Leche' });
        array.push({ idData: 'Queso/productos l.', descriptionData: 'Queso/productos l.' });
        array.push({ idData: 'Huevos', descriptionData: 'Huevos' });
        array.push({ idData: 'Otros', descriptionData: 'Otros' });

        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'description',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'description',
          });
        }
        break;
      case 'desc_fishing_area':
        array2 = this.genericArray.areas;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.description, descriptionData: element.description }];
          } else {
            array.push({ idData: element.description, descriptionData: element.description });
          }
          iterator += 1;
        });

        if (tipo === 0) {
          this.formQuestion.patchValue({
            nameQuestion: 'description',
          });
        } else {
          this.formEditQuestion.patchValue({
            nameQuestion: 'description',
          });
        }
        break;

      case 'ninguna':
        return array2;
        break;

      case 'art':
        array2 = this.genericArray.arts;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element._id, descriptionData: element.description }];
          } else {
            array.push({ idData: element._id, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;

      case 'handLine':
        array2 = this.genericArray.methods;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.description, descriptionData: element.description }];
          } else {
            array.push({ idData: element.description, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;

      case 'type_motor':
        array2 = this.genericArray.propulsions;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.description, descriptionData: element.description }];
          } else {
            array.push({ idData: element.description, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;

      case 'place':
      case 'site':
      case 'landing_site':
        array2 = this.genericArray.sites;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element._id, descriptionData: element.description }];
          } else {
            array.push({ idData: element._id, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;

      case 'area':
      case 'zone':
        array2 = this.genericArray.areas;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element._id, descriptionData: element.description }];
          } else {
            array.push({ idData: element._id, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;
      case 'name_ship':
      case 'motorShip':
      case 'boat':
      case 'boat_name':
        array2 = this.genericArray.boats;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element._id, descriptionData: element.description }];
          } else {
            array.push({ idData: element._id, descriptionData: element.description });
          }
          iterator += 1;
        });
        break;

      case 'product':
      case 'specie':
        array2 = this.genericArray.species;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element.common_name, descriptionData: element.common_name }];
          } else {
            array.push({ idData: element.common_name, descriptionData: element.common_name });
          }
          iterator += 1;
        });
        break;
      case 'captain_name':
      case 'permit_holder':
      case 'field_recorder':
        array2 = this.userArray;
        array2.forEach((element) => {
          if (iterator === 0) {
            array = [{ idData: element._id, descriptionData: element.name }];
          } else {
            array.push({ idData: element._id, descriptionData: element.name });
          }
          iterator += 1;
        });
        break;

      default:
        break;
    }

    return array;
  }

  getDataGeneric() {
    this.questionService.getGlobalArray(true).subscribe(
      (result: any) => {
        this.genericArray = result;
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
   * Pinta bien el rol del usuario
   */
  filtroDataMaximus(idData, nameQuestion) {
    const string = 'olla';
    return string;
  }
}
