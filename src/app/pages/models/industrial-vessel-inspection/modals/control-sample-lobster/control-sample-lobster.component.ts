/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-control-sample-lobster',
  templateUrl: './control-sample-lobster.component.html',
  styleUrls: ['./control-sample-lobster.component.scss']
})
export class ControlSampleLobsterComponent implements OnInit {
  @Input() public dataForm: any;

  public formEditSampleLobster: FormGroup;

  public formEditSeal: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posIncome: number;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

  public sub_modal: NgbModalRef;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.chargeForm();
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal(result?:any) {
    if (result !== undefined) {
      this.activeModal.close(result);
    } else {
      this.activeModal.dismiss();
    }
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
  }

  /**
  * La función inicializa el formulario para agregar costsIncome de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditSampleLobster = this.formBuilder.group({
      number_seals: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      control_total_bags_landed: ['', [Validators.required, Validators.min(1), Validators.max(600)]],
      control_total_sealed_bags: ['', [Validators.required, Validators.min(1), Validators.max(600)]],
    });

    this.formEditSeal = this.formBuilder.group({
      _id: [''],
      seal: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.posIncome = 0;
    this.formEditSampleLobster.reset();

    this.formEditSampleLobster.patchValue({
      number_seals: this.dataForm.value.number_seals,
      control_total_bags_landed: this.dataForm.value.control_total_bags_landed,
      control_total_sealed_bags: this.dataForm.value.control_total_sealed_bags,
    });
  }

  /**
   * Abre el modal para editar el sello
   *
   * @param editSealModal Modal que se va desplegar para editar
   */
  openModalEditSeal(editSealModal:NgbModal, speciePos) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editSealModal, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditSeal.reset();

    this.formEditSeal.patchValue({
      _id: this.formEditSampleLobster.value.number_seals[speciePos]._id,
      seal: this.formEditSampleLobster.value.number_seals[speciePos].seal,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditSampleLobster(field: string): string {
    let message = '';
    if (this.formEditSampleLobster.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSampleLobster.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSampleLobster
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSampleLobster.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSampleLobster
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSampleLobster.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditSampleLobster.get(field)!.hasError('min')) {
      const min = this.formEditSampleLobster.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditSampleLobster.get(field)!.hasError('max')) {
      const max = this.formEditSampleLobster.get(field)!.errors?.max.max;
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
  getErrorMessageEditSeal(field: string): string {
    let message = '';
    if (this.formEditSeal.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSeal.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSeal
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSeal.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSeal
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSeal.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditSeal.get(field)!.hasError('min')) {
      const min = this.formEditSeal.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditSeal.get(field)!.hasError('max')) {
      const max = this.formEditSeal.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
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
  invalidFieldSampleLobster(field: string): boolean {
    if (this.formEditSampleLobster.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldSeal(field: string): boolean {
    if (this.formEditSeal.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeSampleLobster() {
    this.formSubmitted = true;

    if (this.formEditSampleLobster.invalid) {
      console.log('ERROR WE');
    } else {
      this.closeModal(this.formEditSampleLobster.value);
    }
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeSeal() {
    this.formSubmitted = true;

    this.formEditSeal.patchValue({
      seal: this.formEditSeal.value.seal.trim(),
    });

    if (this.formEditSeal.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditSampleLobster.value.number_seals;
      arrayMod[this.posIncome] = this.formEditSeal.value;
      this.formEditSampleLobster.patchValue({
        number_seals: arrayMod,
      });
      this.closeModalS();
    }
  }

  /**
   * Transforma las fechas en formato epoch
   *
   * @param epoch Formato de fecha en número
   * @returns String con la fecha
   */
  transformEpoch(epoch) {
    const data = new Date(epoch);
    let dia = '';
    let mes = '';
    if (data.getDate() < 10) {
      dia = `0${data.getDate()}`;
    } else {
      dia = data.getDate().toString();
    }

    if ((data.getMonth() + 1) < 10) {
      mes = `0${data.getMonth() + 1}`;
    } else {
      mes = (data.getMonth() + 1).toString();
    }
    const string = `${data.getFullYear()}-${mes}-${dia}`;

    return string;
  }

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChange(event: any) {
    this.posIncome = event.target.value;
  }
}
