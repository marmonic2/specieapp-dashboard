/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import products from '../../../products.json';

@Component({
  selector: 'app-edit-crops',
  templateUrl: './edit-crops.component.html',
  styleUrls: ['./edit-crops.component.scss'],
})
export class EditCropsComponent implements OnInit {
  @Input() public typeProduct: any;

  @Input() public product: any;

  public productsToShow: any[];

  public editedProduct: any;

  public formCrops: FormGroup;

  public formSubmitted: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {
    this.formSubmitted = false;
    this.productsToShow = [];
    this.formCropsInitialize();
  }

  /**
   * inicializa el formulario para editar
   * el formulario de cultivos
   * @returns void
   */
  formCropsInitialize() {
    this.formCrops = this.formBuilder.group({
      _id: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });
  }

  ngOnInit(): void {
    this.productsToShow = products[this.typeProduct];
    this.formCropsInitialValue();
  }

  /**
   * La función permite tener valores iniciales
   * a el formulario de cultivos
   * @returns void
   */
  formCropsInitialValue() {
    this.formCrops.patchValue({
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
    });
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal(result?:any) {
    if (result) {
      this.product = this.formCrops.value;
    }
    this.activeModal.close(this.product);
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidFieldCrops(field: string): boolean {
    if (this.formCrops.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
     * Administra los mensajes de error para datos de edición
     *
     * @param field Campo a validar
     * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
     * si no hubo ningún error no se asigna el mensaje al campo.
     */
  getErrorMessageEditCrops(field: string): string {
    let message = '';
    if (this.formCrops.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formCrops.get(field)!.hasError('minlength')) {
      const minLength = this.formCrops.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formCrops.get(field)!.hasError('maxlength')) {
      const maxLength = this.formCrops.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formCrops.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formCrops.get(field)!.hasError('min')) {
      const min = this.formCrops.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formCrops.get(field)!.hasError('max')) {
      const max = this.formCrops.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
    }

    return message;
  }

  /**
   * Determina si el formulario de cultivos es valido
   * @returns
   */
  validateCropsForm() {
    this.formSubmitted = true;
    if (this.formCrops.valid) {
      this.closeModal('editar');
    }
  }

  /**
   * Controla lo que la persona puede escribir;
   *
   * @param event Tecla digitada
   * @returns Caracteres de texto permitidos
   */
  keyboardDisabledKeys(event) {
    return (event >= 48 && event <= 57);
  }
}
