/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dataLoca from '../../arrayCostsIncome.json';

@Component({
  selector: 'app-income-different-modal',
  templateUrl: './income-different-modal.component.html',
  styleUrls: ['./income-different-modal.component.scss'],
})
export class IncomeDifferentModalComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public posCharged: number;

  public formEditIncomeDifferent: FormGroup;

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
    this.formEditIncomeDifferent = this.formBuilder.group({
      _id: [''],
      rental: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      rent: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      other: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm(incomePos) {
    this.formEditIncomeDifferent.reset();

    this.formEditIncomeDifferent.patchValue({
      _id: this.dataForm.value.income_different_products[incomePos]._id,
      rental: this.dataForm.value.income_different_products[incomePos].rental,
      rent: this.dataForm.value.income_different_products[incomePos].rent,
      other: this.dataForm.value.income_different_products[incomePos].other,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditIncomeDifferent(field: string): string {
    let message = '';
    if (this.formEditIncomeDifferent.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditIncomeDifferent.get(field)!.hasError('minlength')) {
      const minLength = this.formEditIncomeDifferent.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditIncomeDifferent.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditIncomeDifferent.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditIncomeDifferent.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditIncomeDifferent.get(field)!.hasError('min')) {
      const min = this.formEditIncomeDifferent.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditIncomeDifferent.get(field)!.hasError('max')) {
      const max = this.formEditIncomeDifferent.get(field)!.errors?.max.max;
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
  invalidFieldIncomeDifferent(field: string): boolean {
    if (this.formEditIncomeDifferent.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeIncomeDifferent(selected) {
    this.formSubmitted = true;

    if (this.formEditIncomeDifferent.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.income_different_products;
      arrayMod[this.posCharged] = selected;

      this.closeModal(arrayMod);
    }
  }
}
