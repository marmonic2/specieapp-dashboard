/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import { MonitoringAgriculturalPricesService } from '../../service/monitoring-agricultural-prices.service';
import { EditCropsComponent } from './edit-crops/edit-crops.component';

@Component({
  selector: 'app-editar-monitoring-agricultural',
  templateUrl: './editar-monitoring-agricultural.component.html',
  styleUrls: ['./editar-monitoring-agricultural.component.scss'],
})
export class EditarMonitoringAgriculturalComponent implements OnInit {
  @Input() public monitoring: any;

  @Input() public listUsers: any;

  public formMonitoring: FormGroup;

  public selectTubers: number;

  public selectVegetables: number;

  public selectGrains: number;

  public selectMeats: number;

  public selectProcessed_products: number;

  public formSubmitted: boolean;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private monitoringService:MonitoringAgriculturalPricesService,
    private swal:SwalService,
  ) {
    this.selectTubers = 0;
    this.selectVegetables = 0;
    this.selectGrains = 0;
    this.selectMeats = 0;
    this.selectProcessed_products = 0;
    this.listUsers = [];
    this.formSubmitted = false;
    this.formMonitoringInitialize();
  }

  /**
   * Inicializa el formulario de seguimniento
   * de precios agropecuarios
   * @returns
   */
  formMonitoringInitialize() {
    this.formMonitoring = this.formBuilder.group({
      _id: ['', [Validators.required]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      registry_number: [''],
      business_name_establishment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      person_type: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      localization: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      nit: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      informant_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      vegetables: [[], [Validators.required, Validators.minLength(1)]],
      tubers: [[], [Validators.required, Validators.minLength(1)]],
      grains: [[], [Validators.required, Validators.minLength(1)]],
      meats: [[], [Validators.required, Validators.minLength(1)]],
      processed_products: [[], [Validators.required, Validators.minLength(1)]],
      issue_date: [''],
    });
  }

  ngOnInit(): void {
    this.fillFormMonitoring();
  }

  /**
   * La función llena los campos del formulario de monitore
   * de precios agrícolas
   * @returns void
   */
  fillFormMonitoring() {
    this.formMonitoring.patchValue({
      _id: this.monitoring._id,
      create_by: this.monitoring.create_by._id,
      registry_number: this.monitoring.registry_number,
      business_name_establishment: this.monitoring.business_name_establishment,
      person_type: this.monitoring.person_type,
      localization: this.monitoring.localization,
      nit: this.monitoring.nit,
      informant_name: this.monitoring.informant_name,
      identification: this.monitoring.identification,
      vegetables: this.monitoring.vegetables,
      tubers: this.monitoring.tubers,
      meats: this.monitoring.meats,
      processed_products: this.monitoring.processed_products,
      grains: this.monitoring.grains,
      issue_date: this.monitoring.issue_date,
    });
  }

  /**
   * La función sirve para cerrar el modal actual
   *
   * @returns void
   */
  closeModal(result?:any) {
    this.activeModal.close(result);
  }

  /**
   * Abre el modal para editar PRODUCTOS AGROPECUARIOS
   *
   * @param product Seguimiento seleccionado
   */
  openModalEditProduct(typeProduct:string, productCategory:any[], indexProductCategory:number) {
    const modalRef:NgbModalRef = this.modalService.open(EditCropsComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.typeProduct = typeProduct;
    modalRef.componentInstance.product = productCategory[indexProductCategory];
    modalRef.result.then((result) => {
      if (result) {
        productCategory[indexProductCategory] = result;
      }
    });
  }

  /**
   * la función obtiene el index del array vegetables
   * @param event evento que contiene el index del array
   */
  getIndexArrayVegetables(event:any) {
    this.selectVegetables = Number(event.target.value);
  }

  /**
   * la función obtiene el index del array tubers
   * @param event evento que contiene el index del array
   */
  getIndexArrayTubers(event:any) {
    this.selectTubers = Number(event.target.value);
  }

  /**
   * la función obtiene el index del array Grains
   * @param event evento que contiene el index del array
   */
  getIndexArrayGrains(event:any) {
    this.selectGrains = Number(event.target.value);
  }

  /**
   * la función obtiene el index del array Meats
   * @param event evento que contiene el index del array
   */
  getIndexArrayMeats(event:any) {
    this.selectMeats = Number(event.target.value);
  }

  /**
   * la función obtiene el index del array Processed_products
   * @param event evento que contiene el index del array
   */
  getIndexArrayProcessed_products(event:any) {
    this.selectProcessed_products = Number(event.target.value);
  }

  /**
   * la función permite al usuario actualizar
   * un seguimiento de los precios agropecuarios
   * @returns void
   */
  editMonitoringAgricultural() {
    this.swal.notificationLoading('Procesando petición!!');
    this.monitoringService.updateCostsIncome(this.formMonitoring.value)
      .subscribe(
        (result:any) => {
          this.swal.generirSuccess(result.message, 'Actualizado exitosamente', this.closeModal(this.formMonitoring.value));
          this.formSubmitted = false;
          this.closeModal();
        },
        (error) => {
          if (error.status === 401) {
            this.swal.status401();
          } else {
            this.swal.genericError(error.message);
            console.log(error);
          }
        },
      );
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidFieldMonitoring(field: string): boolean {
    if (this.formMonitoring.get(field)!.invalid && this.formSubmitted) {
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
  getErrorMessageEditIncome(field: string): string {
    let message = '';
    if (this.formMonitoring.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formMonitoring.get(field)!.hasError('minlength')) {
      const minLength = this.formMonitoring.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formMonitoring.get(field)!.hasError('maxlength')) {
      const maxLength = this.formMonitoring.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formMonitoring.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formMonitoring.get(field)!.hasError('min')) {
      const min = this.formMonitoring.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formMonitoring.get(field)!.hasError('max')) {
      const max = this.formMonitoring.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
    }

    return message;
  }

  /**
   * La función valida que el formulario de seguimiento
   * de precios a gropecuario sea valido.
   * @returns void
   */
  validateMonitoringForm() {
    this.formSubmitted = true;

    this.formMonitoring.removeControl('registry_number');

    this.formMonitoring.patchValue({
      business_name_establishment: this.formMonitoring.value.business_name_establishment.trim(),
      nit: this.formMonitoring.value.nit.trim(),
      informant_name: this.formMonitoring.value.informant_name.trim(),
      identification: this.formMonitoring.value.identification.trim(),
    });
    if (this.formMonitoring.valid) {
      this.editMonitoringAgricultural();
    }
  }
}
