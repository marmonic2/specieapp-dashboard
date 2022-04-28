/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import dataLoca from '../../arrayIndustrialVessel.json';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {
  @Input() public dataForm: any;

  @Input() public boatArray: any;

  @Input() public userArray: any;

  @Input() public siteArray: any;

  public formEditGeneralInformation: FormGroup;

  public formEditCrew: FormGroup;

  public formEditFishermen: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posCostsIncome: number;

  posIncome = 0;

  // Jumm?
  public formSubmitted = false;

  modal: NgbModalRef;

  public incomesArray: string[] = dataLoca.incomes;

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
    this.formEditGeneralInformation = this.formBuilder.group({
      _id: [''],
      register_number: [''],
      type_fishshop: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      landing_site: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      arrival_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      sailing_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      boat_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      captain_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      permit_holder: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      patent_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      expiration_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      field_recorder: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      number_fishermen_resident: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_fishermen_foreign: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_fishermen_continental: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_crew_resident: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_crew_foreign: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_crew_continental: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });

    this.formEditCrew = this.formBuilder.group({
      _id: [''],
      number_crew_resident: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_crew_foreign: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_crew_continental: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });

    this.formEditFishermen = this.formBuilder.group({
      _id: [''],
      number_fishermen_resident: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_fishermen_foreign: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      number_fishermen_continental: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditGeneralInformation.reset();

    this.formEditGeneralInformation.patchValue({
      _id: this.dataForm.value._id,
      register_number: this.dataForm.value.register_number,
      type_fishshop: this.dataForm.value.type_fishshop,
      landing_site: this.dataForm.value.landing_site,
      arrival_date: this.transformEpoch(this.dataForm.value.arrival_date),
      sailing_date: this.transformEpoch(this.dataForm.value.sailing_date),
      boat_name: this.dataForm.value.boat_name,
      captain_name: this.dataForm.value.captain_name,
      permit_holder: this.dataForm.value.permit_holder,
      patent_number: this.dataForm.value.patent_number,
      expiration_date: this.transformEpoch(this.dataForm.value.expiration_date),
      field_recorder: this.dataForm.value.field_recorder,
      number_fishermen_resident: this.dataForm.value.number_fishermen_resident,
      number_fishermen_foreign: this.dataForm.value.number_fishermen_foreign,
      number_fishermen_continental: this.dataForm.value.number_fishermen_continental,
      number_crew_resident: this.dataForm.value.number_crew_resident,
      number_crew_foreign: this.dataForm.value.number_crew_foreign,
      number_crew_continental: this.dataForm.value.number_crew_continental,
    });
  }

  openModalEditCrew(editModal) {
    this.formSubmitted = false;
    this.modal = this.modalService.open(editModal, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditCrew.reset();

    this.formEditCrew.patchValue({
      number_crew_resident: this.formEditGeneralInformation.value.number_crew_resident,
      number_crew_foreign: this.formEditGeneralInformation.value.number_crew_foreign,
      number_crew_continental: this.formEditGeneralInformation.value.number_crew_continental,
    });
  }

  openModalEditFishermen(editModal) {
    this.formSubmitted = false;
    this.modal = this.modalService.open(editModal, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditFishermen.reset();

    this.formEditFishermen.patchValue({
      number_fishermen_resident: this.formEditGeneralInformation.value.number_fishermen_resident,
      number_fishermen_foreign: this.formEditGeneralInformation.value.number_fishermen_foreign,
      number_fishermen_continental:
        this.formEditGeneralInformation.value.number_fishermen_continental,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditGeneralInformation(field: string): string {
    let message = '';
    if (this.formEditGeneralInformation.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditGeneralInformation.get(field)!.hasError('minlength')) {
      const minLength = this.formEditGeneralInformation
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditGeneralInformation.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditGeneralInformation
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditGeneralInformation.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditGeneralInformation.get(field)!.hasError('min')) {
      const min = this.formEditGeneralInformation.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditGeneralInformation.get(field)!.hasError('max')) {
      const max = this.formEditGeneralInformation.get(field)!.errors?.max.max;
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
  getErrorMessageEditCrew(field: string): string {
    let message = '';
    if (this.formEditCrew.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditCrew.get(field)!.hasError('minlength')) {
      const minLength = this.formEditCrew.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditCrew.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditCrew.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditCrew.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditCrew.get(field)!.hasError('min')) {
      const min = this.formEditCrew.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditCrew.get(field)!.hasError('max')) {
      const max = this.formEditCrew.get(field)!.errors?.max.max;
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
  getErrorMessageEditFishermen(field: string): string {
    let message = '';
    if (this.formEditFishermen.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishermen.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishermen.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishermen.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishermen.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditFishermen.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditFishermen.get(field)!.hasError('min')) {
      const min = this.formEditFishermen.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditFishermen.get(field)!.hasError('max')) {
      const max = this.formEditFishermen.get(field)!.errors?.max.max;
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
  invalidFieldGeneralInformation(field: string): boolean {
    if (this.formEditGeneralInformation.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldCrew(field: string): boolean {
    if (this.formEditCrew.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldFishermen(field: string): boolean {
    if (this.formEditFishermen.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeGeneralInformation() {
    this.formSubmitted = true;
    const hoy = new Date();
    const dateParse = `${this.formEditGeneralInformation.value.arrival_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    const dateParse2 = `${this.formEditGeneralInformation.value.expiration_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    const dateParse3 = `${this.formEditGeneralInformation.value.sailing_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    this.formEditGeneralInformation.patchValue({
      boat_name: this.formEditGeneralInformation.value.boat_name.trim(),
      captain_name: this.formEditGeneralInformation.value.captain_name.trim(),
      expiration_date: this.formEditGeneralInformation.value.expiration_date.trim(),
      field_recorder: this.formEditGeneralInformation.value.field_recorder.trim(),
      landing_site: this.formEditGeneralInformation.value.landing_site.trim(),
      patent_number: this.formEditGeneralInformation.value.patent_number.trim(),
      permit_holder: this.formEditGeneralInformation.value.permit_holder.trim(),
      register_number: this.formEditGeneralInformation.value.register_number.trim(),
      sailing_date: this.formEditGeneralInformation.value.sailing_date.trim(),
      type_fishshop: this.formEditGeneralInformation.value.type_fishshop.trim(),
    });

    if (this.formEditGeneralInformation.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditGeneralInformation.patchValue({
        arrival_date: new Date(dateParse).getTime(),
        expiration_date: new Date(dateParse2).getTime(),
        sailing_date: new Date(dateParse3).getTime(),
      });
      this.closeModal(this.formEditGeneralInformation.value);
    }
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeCrew() {
    this.formSubmitted = true;

    if (this.formEditCrew.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditGeneralInformation.patchValue({
        number_crew_resident: this.formEditCrew.value.number_crew_resident,
        number_crew_foreign: this.formEditCrew.value.number_crew_foreign,
        number_crew_continental: this.formEditCrew.value.number_crew_continental,
      });
      this.closeModalS();
    }
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeFishermen() {
    this.formSubmitted = true;

    if (this.formEditFishermen.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditGeneralInformation.patchValue({
        number_fishermen_resident: this.formEditFishermen.value.number_fishermen_resident,
        number_fishermen_foreign: this.formEditFishermen.value.number_fishermen_foreign,
        number_fishermen_continental: this.formEditFishermen.value.number_fishermen_continental,
      });
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
