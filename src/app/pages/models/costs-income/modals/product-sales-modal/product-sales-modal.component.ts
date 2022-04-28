/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dataLoca from '../../arrayCostsIncome.json';

@Component({
  selector: 'app-product-sales-modal',
  templateUrl: './product-sales-modal.component.html',
  styleUrls: ['./product-sales-modal.component.scss']
})
export class ProductSalesModalComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public posCharged: number;

  public formEditProductSales: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posCostsProductSales: number;

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
  * La función inicializa el formulario para agregar costsProductSales de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditProductSales = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      quantity_sold: ['', [Validators.required, Validators.min(1), Validators.max(500000)]],
      total_sales_income: ['', [Validators.required, Validators.min(1), Validators.max(500000)]],
      unit: ['', [Validators.required, Validators.min(1), Validators.max(500000)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editProductSalesModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm(incomePos) {
    this.formEditProductSales.reset();

    this.formEditProductSales.patchValue({
      _id: this.dataForm.value.total_product_sales[incomePos]._id,
      description: this.dataForm.value.total_product_sales[incomePos].description,
      quantity_sold: this.dataForm.value.total_product_sales[incomePos].quantity_sold,
      total_sales_income: this.dataForm.value.total_product_sales[incomePos].total_sales_income,
      unit: this.dataForm.value.total_product_sales[incomePos].unit,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditProductSales(field: string): string {
    let message = '';
    if (this.formEditProductSales.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditProductSales.get(field)!.hasError('minlength')) {
      const minLength = this.formEditProductSales.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditProductSales.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditProductSales.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditProductSales.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditProductSales.get(field)!.hasError('min')) {
      const min = this.formEditProductSales.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditProductSales.get(field)!.hasError('max')) {
      const max = this.formEditProductSales.get(field)!.errors?.max.max;
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
  invalidFieldProductSales(field: string): boolean {
    if (this.formEditProductSales.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeProductSales(selected) {
    this.formSubmitted = true;

    if (this.formEditProductSales.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.total_product_sales;
      arrayMod[this.posCharged] = selected;

      this.closeModal(arrayMod);
    }
  }
}
