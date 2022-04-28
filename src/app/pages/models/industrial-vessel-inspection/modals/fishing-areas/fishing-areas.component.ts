/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fishing-areas',
  templateUrl: './fishing-areas.component.html',
  styleUrls: ['./fishing-areas.component.scss']
})
export class FishingAreasComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public posCharged: number;

  @Input() public areaArray: [];

  public formEditFishingArea: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posCostsIncome: number;

  // Jumm?
  public formSubmitted = false;

  public fishingAreaArray = [];

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
    this.formEditFishingArea = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      number_days: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditFishingArea.reset();

    this.formEditFishingArea.patchValue({
      _id: this.dataForm.value.fishing_areas[this.posCharged]._id,
      description: this.dataForm.value.fishing_areas[this.posCharged].description,
      number_days: this.dataForm.value.fishing_areas[this.posCharged].number_days,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditFishingArea(field: string): string {
    let message = '';
    if (this.formEditFishingArea.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishingArea.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishingArea
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishingArea.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishingArea
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishingArea.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditFishingArea.get(field)!.hasError('min')) {
      const min = this.formEditFishingArea.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditFishingArea.get(field)!.hasError('max')) {
      const max = this.formEditFishingArea.get(field)!.errors?.max.max;
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
  invalidFieldFishingArea(field: string): boolean {
    if (this.formEditFishingArea.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la area de pesca
   *
   * @param selected Especie seleccionada
   */
  saveChangeFishingArea() {
    this.formSubmitted = true;

    this.formEditFishingArea.patchValue({
      description: this.formEditFishingArea.value.description.trim(),
    });

    if (this.formEditFishingArea.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.fishing_areas;
      arrayMod[this.posCharged] = this.formEditFishingArea.value;

      this.closeModal(arrayMod);
    }
  }
}
