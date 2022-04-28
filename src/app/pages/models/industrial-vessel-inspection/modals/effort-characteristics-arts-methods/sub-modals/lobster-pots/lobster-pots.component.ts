/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lobster-pots',
  templateUrl: './lobster-pots.component.html',
  styleUrls: ['./lobster-pots.component.scss']
})
export class LobsterPotsComponent implements OnInit {
  @Input() public dataForm: any;

  public formEditLobsterPots: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posCostsIncome: number;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

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
  * La función inicializa el formulario para agregar costsIncome de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditLobsterPots = this.formBuilder.group({
      lobster_pots_number_lines_perdays: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      lobster_pots_number_lingadas_perlines: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      lobster_pots_number_nasa_perlingada: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      lobster_pots_effort: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditLobsterPots.reset();

    this.formEditLobsterPots.patchValue({
      lobster_pots_number_lines_perdays: this.dataForm.lobster_pots_number_lines_perdays,
      lobster_pots_number_lingadas_perlines: this.dataForm.lobster_pots_number_lingadas_perlines,
      lobster_pots_number_nasa_perlingada: this.dataForm.lobster_pots_number_nasa_perlingada,
      lobster_pots_effort: this.dataForm.lobster_pots_effort,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditLobsterPots(field: string): string {
    let message = '';
    if (this.formEditLobsterPots.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditLobsterPots.get(field)!.hasError('minlength')) {
      const minLength = this.formEditLobsterPots
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditLobsterPots.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditLobsterPots
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditLobsterPots.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditLobsterPots.get(field)!.hasError('min')) {
      const min = this.formEditLobsterPots.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditLobsterPots.get(field)!.hasError('max')) {
      const max = this.formEditLobsterPots.get(field)!.errors?.max.max;
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
  invalidFieldLobsterPots(field: string): boolean {
    if (this.formEditLobsterPots.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeLobsterPots() {
    this.formSubmitted = true;

    if (this.formEditLobsterPots.invalid) {
      console.log('ERROR WE');
    } else {
      this.closeModal(this.formEditLobsterPots.value);
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
}
