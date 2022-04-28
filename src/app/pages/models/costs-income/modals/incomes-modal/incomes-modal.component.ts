/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import dataLoca from '../../arrayCostsIncome.json';

@Component({
  selector: 'app-incomes-modal',
  templateUrl: './incomes-modal.component.html',
  styleUrls: ['./incomes-modal.component.scss'],
})
export class IncomesModalComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public posCharged: number;

  public formEditIncome: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posCostsIncome: number;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

  public incomesArray: string[] = dataLoca.incomes;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    public routes: Router,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.chargeForm(this.posCharged);
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal(result?:any) {
    this.activeModal.close(result);
  }

  /**
  * La función inicializa el formulario para agregar costsIncome de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditIncome = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      lastSixMonth: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      totalCycle: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm(incomePos) {
    this.formEditIncome.reset();

    this.formEditIncome.patchValue({
      _id: this.dataForm.value.production_expenses[incomePos]._id,
      description: this.dataForm.value.production_expenses[incomePos].description,
      lastSixMonth: this.dataForm.value.production_expenses[incomePos].lastSixMonth,
      totalCycle: this.dataForm.value.production_expenses[incomePos].totalCycle,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditIncome(field: string): string {
    let message = '';
    if (this.formEditIncome.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditIncome.get(field)!.hasError('minlength')) {
      const minLength = this.formEditIncome.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditIncome.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditIncome.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditIncome.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditIncome.get(field)!.hasError('min')) {
      const min = this.formEditIncome.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditIncome.get(field)!.hasError('max')) {
      const max = this.formEditIncome.get(field)!.errors?.max.max;
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
  invalidFieldIncome(field: string): boolean {
    if (this.formEditIncome.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeIncome(selected) {
    this.formSubmitted = true;

    if (this.formEditIncome.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.production_expenses;
      arrayMod[this.posCharged] = selected;

      this.closeModal(arrayMod);
    }
  }
}
