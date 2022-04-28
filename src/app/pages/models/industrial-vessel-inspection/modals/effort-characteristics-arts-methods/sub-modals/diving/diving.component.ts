/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diving',
  templateUrl: './diving.component.html',
  styleUrls: ['./diving.component.scss']
})
export class DivingComponent implements OnInit {
  @Input() public dataForm: any;

  public formEditDiving: FormGroup;

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
    this.formEditDiving = this.formBuilder.group({
      diving_number_pangas_perday: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      diving_number_divers_perpanga: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      diving_effort_diver_perday: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditDiving.reset();

    this.formEditDiving.patchValue({
      diving_number_pangas_perday: this.dataForm.diving_number_pangas_perday,
      diving_number_divers_perpanga: this.dataForm.diving_number_divers_perpanga,
      diving_effort_diver_perday: this.dataForm.diving_effort_diver_perday,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditDiving(field: string): string {
    let message = '';
    if (this.formEditDiving.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditDiving.get(field)!.hasError('minlength')) {
      const minLength = this.formEditDiving
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditDiving.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditDiving
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditDiving.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditDiving.get(field)!.hasError('min')) {
      const min = this.formEditDiving.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditDiving.get(field)!.hasError('max')) {
      const max = this.formEditDiving.get(field)!.errors?.max.max;
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
  invalidFieldDiving(field: string): boolean {
    if (this.formEditDiving.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeDiving() {
    this.formSubmitted = true;

    if (this.formEditDiving.invalid) {
      console.log('ERROR WE');
    } else {
      this.closeModal(this.formEditDiving.value);
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
   * Controla lo que la persona puede escribir;
   *
   * @param event Tecla digitada
   * @returns Caracteres de texto permitidos
   */
  keyboardDisabled(event) {
    return (event >= 48 && event <= 57);
  }
}
