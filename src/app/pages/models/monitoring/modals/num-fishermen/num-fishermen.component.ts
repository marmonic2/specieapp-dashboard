/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MonitoringService } from '../../monitoring.service';

@Component({
  selector: 'app-num-fishermen',
  templateUrl: './num-fishermen.component.html',
  styleUrls: ['./num-fishermen.component.scss'],
})
export class NumFishermenComponent implements OnInit {
  @Input() public dataSelect: any;

  @Input() public posCharged: any;

  public formEditFishermen: FormGroup;

  public formEditData: FormGroup;

  public arrayInv = [];

  // Jumm?
  public formSubmitted = false;

  public sub_modal: NgbModalRef;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private service: MonitoringService,
    private routes: Router,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    console.log(this.dataSelect);
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
  * La función inicializa el formulario
  *
  * @returns void
  */
  initForms() {
    this.formEditFishermen = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de inventario animal
   *
   */
  chargeForm() {
    this.formEditFishermen.reset();

    this.formEditFishermen.patchValue({
      _id: this.dataSelect.value.name_of_fishermen[this.posCharged]._id,
      name: this.dataSelect.value.name_of_fishermen[this.posCharged].name,
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
    if (this.formEditFishermen.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditFishermen.get(field)!.hasError('minlength')) {
      const minLength = this.formEditFishermen
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditFishermen.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditFishermen
        .get(field)!.errors?.maxlength.requiredLength;
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
  invalidField(field: string): boolean {
    if (this.formEditFishermen.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en el pescador
   *
   * @param selected Especie seleccionada
   */
  saveChange() {
    this.formSubmitted = true;

    if (this.formEditFishermen.invalid) {
      console.log('ERROR WE');
    } else {
      this.dataSelect.value.name_of_fishermen[this.posCharged] = this.formEditFishermen.value;
      this.closeModal('editado');
    }
  }
}
