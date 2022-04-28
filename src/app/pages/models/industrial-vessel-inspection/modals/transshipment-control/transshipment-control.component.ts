/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FishingAreasComponent } from '../fishing-areas/fishing-areas.component';

@Component({
  selector: 'app-transshipment-control',
  templateUrl: './transshipment-control.component.html',
  styleUrls: ['./transshipment-control.component.scss'],
})
export class TransshipmentControlComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public boatArray: any;

  @Input() public specieArray: any;

  public formEditTransshipmentControl: FormGroup;

  public formEditBring: FormGroup;

  public formEditProduct: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posIncome: number = 0;

  posIncomeTwo: number = 0;

  // Jumm?
  public formSubmitted = false;

  modal: NgbModalRef;

  public transshipmentControlArray = [];

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
    this.modal.close();
  }

  /**
  * La función inicializa el formulario para agregar costsIncome de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditTransshipmentControl = this.formBuilder.group({
      _id: [''],
      transshipment_control: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      transshipment_product_control: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });

    this.formEditBring = this.formBuilder.group({
      _id: [''],
      boat: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      product: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      weight_kg: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });

    this.formEditProduct = this.formBuilder.group({
      _id: [''],
      boat: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      product: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      weight_kg: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditTransshipmentControl.reset();
    this.posIncome = 0;

    this.formEditTransshipmentControl.patchValue({
      transshipment_control: this.dataForm.value.transshipment_control,
      transshipment_product_control: this.dataForm.value.transshipment_product_control,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditTransshipmentControl(field: string): string {
    let message = '';
    if (this.formEditTransshipmentControl.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditTransshipmentControl.get(field)!.hasError('minlength')) {
      const minLength = this.formEditTransshipmentControl
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditTransshipmentControl.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditTransshipmentControl
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditTransshipmentControl.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditTransshipmentControl.get(field)!.hasError('min')) {
      const min = this.formEditTransshipmentControl.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditTransshipmentControl.get(field)!.hasError('max')) {
      const max = this.formEditTransshipmentControl.get(field)!.errors?.max.max;
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
  getErrorMessageEditBring(field: string): string {
    let message = '';
    if (this.formEditBring.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditBring.get(field)!.hasError('minlength')) {
      const minLength = this.formEditBring
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditBring.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditBring
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditBring.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditBring.get(field)!.hasError('min')) {
      const min = this.formEditBring.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditBring.get(field)!.hasError('max')) {
      const max = this.formEditBring.get(field)!.errors?.max.max;
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
  getErrorMessageEditProduct(field: string): string {
    let message = '';
    if (this.formEditProduct.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditProduct.get(field)!.hasError('minlength')) {
      const minLength = this.formEditProduct
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditProduct.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditProduct
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditProduct.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditProduct.get(field)!.hasError('min')) {
      const min = this.formEditProduct.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditProduct.get(field)!.hasError('max')) {
      const max = this.formEditProduct.get(field)!.errors?.max.max;
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
  invalidFieldTransshipmentControl(field: string): boolean {
    if (this.formEditTransshipmentControl.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldBring(field: string): boolean {
    if (this.formEditBring.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldProduct(field: string): boolean {
    if (this.formEditProduct.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la area de pesca
   *
   * @param selected Especie seleccionada
   */
  saveChangeTransshipmentControl() {
    this.formSubmitted = true;

    if (this.formEditTransshipmentControl.invalid) {
      console.log('ERROR WE');
    } else {
      this.closeModal(this.formEditTransshipmentControl.value);
    }
  }

  /**
   * Cambios guardados en el trasbordo de venida
   *
   * @param selected Especie seleccionada
   */
  saveChangeBring() {
    this.formSubmitted = true;

    if (this.formEditBring.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.transshipment_control;
      arrayMod[this.posIncome] = this.formEditBring.value;

      this.posIncome = 0;

      this.closeModalS();
    }
  }

  /**
   * Cambios guardados en el trasbordo de producto
   *
   * @param selected Especie seleccionada
   */
  saveChangeProduct() {
    this.formSubmitted = true;

    if (this.formEditProduct.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.transshipment_product_control;
      arrayMod[this.posIncomeTwo] = this.formEditProduct.value;

      this.posIncomeTwo = 0;

      this.closeModalS();
    }
  }

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChange(event: any) {
    this.posIncome = event.target.value;
  }

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChangeTwo(event: any) {
    this.posIncomeTwo = event.target.value;
  }

  /**
   * Abre el modal para editar el formulario de area de pescas
   *
   * @param posIncome Posición seleccionada
   */
  openModalBringsTransshipment(bringModal, posIncome) {
    this.formSubmitted = false;

    this.modal = this.modalService.open(bringModal, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditBring.reset();

    this.formEditBring.patchValue({
      _id: this.dataForm.value.transshipment_control[posIncome]._id,
      boat: this.dataForm.value.transshipment_control[posIncome].boat,
      product: this.dataForm.value.transshipment_control[posIncome].product,
      weight_kg: this.dataForm.value.transshipment_control[posIncome].weight_kg,
    });
  }

  /**
   * Abre el modal para editar el formulario de area de pescas
   *
   * @param posIncome Posición seleccionada
   */
  openModalProductTransshipment(bringModal, posIncome) {
    this.formSubmitted = false;

    this.modal = this.modalService.open(bringModal, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditProduct.reset();

    this.formEditProduct.patchValue({
      _id: this.dataForm.value.transshipment_product_control[posIncome]._id,
      data: this.dataForm.value.transshipment_product_control[posIncome].data,
      boat: this.dataForm.value.transshipment_product_control[posIncome].boat,
      product: this.dataForm.value.transshipment_product_control[posIncome].product,
      weight_kg: this.dataForm.value.transshipment_product_control[posIncome].weight_kg,
    });
  }
}
