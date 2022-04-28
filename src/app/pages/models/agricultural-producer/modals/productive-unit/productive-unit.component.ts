/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AgriculturalProducerService } from '../../agricultural-producer.service';

@Component({
  selector: 'app-productive-unit',
  templateUrl: './productive-unit.component.html',
  styleUrls: ['./productive-unit.component.scss'],
})
export class ProductiveUnitComponent implements OnInit {
  @Input() public dataSelect: any;

  @Input() public cropArray: [];

  public formEditProductiveUnit: FormGroup;

  public formEditCrop: FormGroup;

  public formEditSurface: FormGroup;

  posCrop: number;

  posSurface: number;

  // Control de vistas
  id_view: number = 0;

  posIncome: number;

  // Jumm?
  public formSubmitted = false;

  public sub_modal: NgbModalRef;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private service: AgriculturalProducerService,
    private routes: Router,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.chargeForm();
    this.posCrop = 0;
    this.posSurface = 0;
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
      this.activeModal.close();
    }
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
  }

  /**
  * La función inicializa el formulario para agregar costsIncome de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditProductiveUnit = this.formBuilder.group({
      _id: [''],
      latitude: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      length: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      registry_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      business_name_establishment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      person_type: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      gender: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      nit: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      localization: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      informant_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      // Extras
      birds: [''],
      cattle: [''],
      income_generation: [''],
      issue_date: [''],
      crops_produced: [''],
      cultivation_system: [''],
      form_ternure: [''],
      livestock_inventory: [''],
      pigs: [''],
      principal_activity: [''],
      self_consumption: [''],
      surface: [''],
      water_resource: [''],
    });

    this.formEditCrop = this.formBuilder.group({
      _id: [''],
      crop: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      sown_area: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
      harvest: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
    });

    this.formEditSurface = this.formBuilder.group({
      _id: [''],
      size: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
      land: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
      pasture: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
      forest: [0, [Validators.required, Validators.min(1), Validators.max(3000)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.posIncome = 0;
    this.formEditProductiveUnit.reset();

    this.formEditProductiveUnit.patchValue({
      _id: this.dataSelect._id,
      latitude: this.dataSelect.latitude,
      length: this.dataSelect.length,
      registry_number: this.dataSelect.registry_number,
      business_name_establishment: this.dataSelect.business_name_establishment,
      person_type: this.dataSelect.person_type,
      gender: this.dataSelect.gender,
      create_by: this.dataSelect.create_by._id,
      nit: this.dataSelect.nit,
      localization: this.dataSelect.localization,
      identification: this.dataSelect.identification,
      informant_name: this.dataSelect.informant_name,

      // Extras
      income_generation: this.dataSelect.income_generation,
      birds: this.dataSelect.birds,
      issue_date: this.dataSelect.issue_date,
      cattle: this.dataSelect.cattle,
      crops_produced: this.dataSelect.crops_produced,
      cultivation_system: this.dataSelect.cultivation_system,
      form_ternure: this.dataSelect.form_ternure,
      livestock_inventory: this.dataSelect.livestock_inventory,
      pigs: this.dataSelect.pigs,
      principal_activity: this.dataSelect.principal_activity,
      self_consumption: this.dataSelect.self_consumption,
      surface: this.dataSelect.surface,
      water_resource: this.dataSelect.water_resource,

    });
  }

  /**
     * Abre el modal para editar la superficie
     *
     * @param editSurfaceModal Modal que se va desplegar para editar
     * @param cropSurface Data de la superficie seleccionada
     */
  openModalEditSurface(editSurfaceModal:NgbModal, cropSurface) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editSurfaceModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditSurface.reset();

    this.formEditSurface.patchValue({
      _id: this.formEditProductiveUnit.value.surface[cropSurface]._id,
      size: this.formEditProductiveUnit.value.surface[cropSurface].size,
      land: this.formEditProductiveUnit.value.surface[cropSurface].land,
      pasture: this.formEditProductiveUnit.value.surface[cropSurface].pasture,
      forest: this.formEditProductiveUnit.value.surface[cropSurface].forest,
    });
  }

  /**
     * Abre el modal para editar el cultivo
     *
     * @param editCropModal Modal que se va desplegar para editar
     * @param measurement Data del cultivo seleccionado
     */
  openModalEditCrop(editCropModal:NgbModal, cropPos) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editCropModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditCrop.reset();

    this.formEditCrop.patchValue({
      _id: this.formEditProductiveUnit.value.crops_produced[cropPos]._id,
      crop: this.formEditProductiveUnit.value.crops_produced[cropPos].crop,
      sown_area: this.formEditProductiveUnit.value.crops_produced[cropPos].sown_area,
      harvest: this.formEditProductiveUnit.value.crops_produced[cropPos].harvest,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditProductiveUnit.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditProductiveUnit.get(field)!.hasError('minlength')) {
      const minLength = this.formEditProductiveUnit
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditProductiveUnit.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditProductiveUnit
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditProductiveUnit.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditProductiveUnit.get(field)!.hasError('min')) {
      const min = this.formEditProductiveUnit.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditProductiveUnit.get(field)!.hasError('max')) {
      const max = this.formEditProductiveUnit.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
    }

    return message;
  }

  /**
   * Administra los mensajes de error para datos de cultivo
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditCrop(field: string): string {
    let message = '';
    if (this.formEditCrop.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditCrop.get(field)!.hasError('minlength')) {
      const minLength = this.formEditCrop.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditCrop.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditCrop.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditCrop.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditCrop.get(field)!.hasError('min')) {
      const min = this.formEditCrop.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditCrop.get(field)!.hasError('max')) {
      const max = this.formEditCrop.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
    }

    return message;
  }

  /**
   * Administra los mensajes de error para datos de superficie
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditSurface(field: string): string {
    let message = '';
    if (this.formEditSurface.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSurface.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSurface.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSurface.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSurface.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSurface.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditSurface.get(field)!.hasError('min')) {
      const min = this.formEditSurface.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditSurface.get(field)!.hasError('max')) {
      const max = this.formEditSurface.get(field)!.errors?.max.max;
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
  invalidField(field: string): boolean {
    if (this.formEditProductiveUnit.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Validación de los campos del cultivo
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidFieldCrop(field: string): boolean {
    if (this.formEditCrop.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
     * Validación de los campos de la superficie
     *
     * @param field Campo a validar
     * @returns Verifica que el campo sea correcto al formato, en
     * caso contrario retorna false
     */
  invalidFieldSurface(field: string): boolean {
    if (this.formEditSurface.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChange() {
    this.formSubmitted = true;

    delete this.formEditProductiveUnit.value.registry_number;

    if (this.formEditProductiveUnit.invalid) {
      console.log('ERROR WE');
      console.log(this.formEditProductiveUnit);
    } else {
      this.service.updateAgriculturalProducer(
        this.formEditProductiveUnit.value,
      ).subscribe(
        (result) => {
          Swal.fire({
            title: 'Procesando petición!!',
            html: 'Actualización en proceso',
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 2000,
          });
          this.modalService.dismissAll();
          this.formSubmitted = false;
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire('Error!!', 'Tiempo de sesión expirado, inicie sesión nuevamente', 'error');
            this.routes.navigate(['/login']);
          } else {
            Swal.fire('Error!!', 'Error inesperado', 'error');
            console.log(error);
          }
        },
      );
    }
  }

  /**
     * Cambios guardados en la especie
     *
     * @param selected Especie seleccionada
     */
  saveChangeSurface(selected) {
    this.formSubmitted = true;
    console.log(selected);

    if (this.formEditSurface.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditProductiveUnit.value.surface;
      arrayMod[this.posSurface] = selected;
      this.formEditProductiveUnit.patchValue({
        surface: arrayMod,
      });
      this.sub_modal.close();
      this.posSurface = 0;
    }
  }

  /**
     * Cambios guardados en la especie
     *
     * @param selected Especie seleccionada
     */
  saveChangeCrop(selected) {
    this.formSubmitted = true;
    console.log(selected);

    if (this.formEditCrop.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditProductiveUnit.value.crops_produced;
      arrayMod[this.posCrop] = selected;
      this.formEditProductiveUnit.patchValue({
        crops_produced: arrayMod,
      });
      this.sub_modal.close();
      this.posCrop = 0;
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
  onChangeCrop(event: any) {
    this.posCrop = event.target.value;
  }
}
