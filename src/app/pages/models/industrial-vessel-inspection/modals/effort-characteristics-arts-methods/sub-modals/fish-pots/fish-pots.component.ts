/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fish-pots',
  templateUrl: './fish-pots.component.html',
  styleUrls: ['./fish-pots.component.scss']
})
export class FishPotsComponent implements OnInit {
  @Input() public dataForm: any;

  public formEditFishPots: FormGroup;

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
    this.formEditFishPots = this.formBuilder.group({
      fish_pots_type: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      fish_pots_number_pots_perday: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      fish_pots_effort_pots_perday: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditFishPots.reset();

    this.formEditFishPots.patchValue({
      fish_pots_type: this.dataForm.fish_pots_type,
      fish_pots_number_pots_perday: this.dataForm.fish_pots_number_pots_perday,
      fish_pots_effort_pots_perday: this.dataForm.fish_pots_effort_pots_perday,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditFishPots(field: string): string {
    let message = '';
    if (this.formEditFishPots.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishPots.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishPots
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishPots.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishPots
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishPots.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditFishPots.get(field)!.hasError('min')) {
      const min = this.formEditFishPots.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditFishPots.get(field)!.hasError('max')) {
      const max = this.formEditFishPots.get(field)!.errors?.max.max;
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
  invalidFieldFishPots(field: string): boolean {
    if (this.formEditFishPots.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeFishPots() {
    this.formSubmitted = true;

    this.formEditFishPots.patchValue({
      type: this.formEditFishPots.value.type.trim(),
    });
    if (this.formEditFishPots.invalid) {
      console.log('ERROR WE');
    } else {
      this.closeModal(this.formEditFishPots.value);
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
