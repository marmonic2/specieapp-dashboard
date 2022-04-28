/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AgriculturalProducerService } from '../../agricultural-producer.service';

@Component({
  selector: 'app-generic-data',
  templateUrl: './generic-data.component.html',
  styleUrls: ['./generic-data.component.scss'],
})
export class GenericDataComponent implements OnInit {
  @Input() public dataSelect: any;

  @Input() public userArray: any;

  public formEditGenericData: FormGroup;

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
    this.formEditGenericData = this.formBuilder.group({
      _id: [''],
      latitude: [''],
      length: [''],
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
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.posIncome = 0;
    this.formEditGenericData.reset();

    this.formEditGenericData.patchValue({
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
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditGenericData.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditGenericData.get(field)!.hasError('minlength')) {
      const minLength = this.formEditGenericData
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditGenericData.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditGenericData
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditGenericData.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditGenericData.get(field)!.hasError('min')) {
      const min = this.formEditGenericData.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditGenericData.get(field)!.hasError('max')) {
      const max = this.formEditGenericData.get(field)!.errors?.max.max;
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
    if (this.formEditGenericData.get(field)!.invalid && this.formSubmitted) {
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

    delete this.formEditGenericData.value.registry_number;

    if (this.formEditGenericData.invalid) {
      console.log('ERROR WE');
      console.log(this.formEditGenericData);
    } else {
      this.service.updateAgriculturalProducer(
        this.formEditGenericData.value,
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
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChange(event: any) {
    this.posIncome = event.target.value;
  }
}
