/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import dataLoca from '../../arrayCostsIncome.json';
import { CostsIncomeService } from '../../costs-income.service';

@Component({
  selector: 'app-cultivation-modal',
  templateUrl: './cultivation-modal.component.html',
  styleUrls: ['./cultivation-modal.component.scss']
})
export class CultivationModalComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public posCharged: number;

  @Input() public arrayCharged: [];

  public cropArray: [] = [];

  public formEditCultivation: FormGroup;

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
    private costsIncomeService: CostsIncomeService
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.chargeForm(this.posCharged);
    this.cropArray = this.arrayCharged;
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
    this.formEditCultivation = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      sale_quantity: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      sales_revenue: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm(incomePos) {
    this.formEditCultivation.reset();

    this.formEditCultivation.patchValue({
      _id: this.dataForm.value.cultivation_sales[incomePos]._id,
      description: this.dataForm.value.cultivation_sales[incomePos].description,
      sale_quantity: this.dataForm.value.cultivation_sales[incomePos].sale_quantity,
      sales_revenue: this.dataForm.value.cultivation_sales[incomePos].sales_revenue,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditCultivation(field: string): string {
    let message = '';
    if (this.formEditCultivation.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditCultivation.get(field)!.hasError('minlength')) {
      const minLength = this.formEditCultivation.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditCultivation.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditCultivation.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditCultivation.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditCultivation.get(field)!.hasError('min')) {
      const min = this.formEditCultivation.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditCultivation.get(field)!.hasError('max')) {
      const max = this.formEditCultivation.get(field)!.errors?.max.max;
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
  invalidFieldCultivation(field: string): boolean {
    if (this.formEditCultivation.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeCultivation(selected) {
    this.formSubmitted = true;

    if (this.formEditCultivation.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.cultivation_sales;
      arrayMod[this.posCharged] = selected;

      this.closeModal(arrayMod);
    }
  }
}
