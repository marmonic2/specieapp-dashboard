/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AgriculturalProducerService } from '../../agricultural-producer.service';

@Component({
  selector: 'app-livestock-inventory',
  templateUrl: './livestock-inventory.component.html',
  styleUrls: ['./livestock-inventory.component.scss'],
})
export class LivestockInventoryComponent implements OnInit {
  @Input() public dataSelect: any;

  public formEditLivestockInv: FormGroup;

  public formEditData: FormGroup;

  public arrayInv = [];

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
  * La función inicializa el formulario
  *
  * @returns void
  */
  initForms() {
    // Form Principal
    this.formEditData = this.formBuilder.group({
      _id: [''],
      registry_number: [''],
      business_name_establishment: [''],
      latitude: [''],
      length: [''],
      person_type: [''],
      gender: [''],
      create_by: [''],
      nit: [''],
      localization: [''],
      identification: [''],
      informant_name: [''],
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

    // Form Editor
    this.formEditLivestockInv = this.formBuilder.group({
      _id: [''],
      average_cicle_chicken: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      average_cicle_pig: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      average_day_chicken: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      average_day_milk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      broilers: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      chicken_eggs: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      last_six_months_chicken: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      last_six_months_milk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      last_six_months_pig: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      milk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      pig_meat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_birds: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_chicken: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_equines: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_goats: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_hen: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      total_sheep: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de inventario animal
   *
   */
  chargeForm() {
    this.formEditLivestockInv.reset();

    this.formEditData.patchValue({
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

    this.formEditLivestockInv.patchValue({
      _id: this.dataSelect.livestock_inventory[0]._id,
      average_cicle_chicken: this.dataSelect.livestock_inventory[0].average_cicle_chicken,
      average_cicle_pig: this.dataSelect.livestock_inventory[0].average_cicle_pig,
      average_day_chicken: this.dataSelect.livestock_inventory[0].average_day_chicken,
      average_day_milk: this.dataSelect.livestock_inventory[0].average_day_milk,
      broilers: this.dataSelect.livestock_inventory[0].broilers,
      chicken_eggs: this.dataSelect.livestock_inventory[0].chicken_eggs,
      last_six_months_chicken: this.dataSelect.livestock_inventory[0].last_six_months_chicken,
      last_six_months_milk: this.dataSelect.livestock_inventory[0].last_six_months_milk,
      last_six_months_pig: this.dataSelect.livestock_inventory[0].last_six_months_pig,
      milk: this.dataSelect.livestock_inventory[0].milk,
      pig_meat: this.dataSelect.livestock_inventory[0].pig_meat,
      total_birds: this.dataSelect.livestock_inventory[0].total_birds,
      total_chicken: this.dataSelect.livestock_inventory[0].total_chicken,
      total_equines: this.dataSelect.livestock_inventory[0].total_equines,
      total_goats: this.dataSelect.livestock_inventory[0].total_goats,
      total_hen: this.dataSelect.livestock_inventory[0].total_hen,
      total_sheep: this.dataSelect.livestock_inventory[0].total_sheep,
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
    if (this.formEditLivestockInv.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditLivestockInv.get(field)!.hasError('minlength')) {
      const minLength = this.formEditLivestockInv
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditLivestockInv.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditLivestockInv
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditLivestockInv.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditLivestockInv.get(field)!.hasError('min')) {
      const min = this.formEditLivestockInv.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditLivestockInv.get(field)!.hasError('max')) {
      const max = this.formEditLivestockInv.get(field)!.errors?.max.max;
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
    if (this.formEditLivestockInv.get(field)!.invalid && this.formSubmitted) {
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

    this.formEditData.removeControl('registry_number');

    if (this.formEditLivestockInv.invalid) {
      console.log('ERROR WE');
      console.log(this.formEditLivestockInv);
    } else {
      this.arrayInv.push(this.formEditLivestockInv.value);
      this.formEditData.patchValue({
        livestock_inventory: this.arrayInv,
      });

      this.service.updateAgriculturalProducer(
        this.formEditData.value,
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
            console.log(this.formEditData.value);
          }
        },
      );
    }
    this.arrayInv.pop();
  }
}
