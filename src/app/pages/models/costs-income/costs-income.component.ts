/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import { IncomesModalComponent } from './modals/incomes-modal/incomes-modal.component';
import { CultivationModalComponent } from './modals/cultivation-modal/cultivation-modal.component';
import { IncomeDifferentModalComponent } from './modals/income-different-modal/income-different-modal.component';
import { ProductSalesModalComponent } from './modals/product-sales-modal/product-sales-modal.component';
import { CostsIncomeService } from './costs-income.service';
import dataLoca from './arrayCostsIncome.json';

@Component({
  selector: 'app-costs-income',
  templateUrl: './costs-income.component.html',
  styleUrls: ['./costs-income.component.scss'],
})
export class CostsIncomeComponent implements OnInit {
  public searchCostsIncome:string;

  public costsIncomeArray = [];

  public costsIncomeArrayForFilter = [];

  public costsIncomeForFilter: [];

  public cropArray: [] = [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditCostsIncome: FormGroup;

  public formEditIncome: FormGroup;

  public formEditIncomeDifferent: FormGroup;

  public formEditCultivation: FormGroup;

  public formEditProductSales: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posIncome: number;

  posCostsIncome: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

  public incomesArray: string[] = dataLoca.incomes;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private costsIncomeService: CostsIncomeService,
    public routes: Router,
    private swal: SwalService,
  ) {
    this.getCostsIncome(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getCostsIncome(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.costsIncomeService.getCostsIncome(status).subscribe(
      (result: any) => {
        this.costsIncomeArray = result.items;
        this.costsIncomeArrayForFilter = this.costsIncomeArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();
        console.log(this.costsIncomeArray);

        this.costsIncomeService.getCrop(status).subscribe(
          (efect: any) => {
            this.cropArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.costsIncomeService.getUsers(status).subscribe(
          (efect: any) => {
            this.userArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          }).then(() => {
            this.routes.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: error.message,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          });
        }
      },
    );
    this.id_view = 0;
  }

  /**
   * Función para obtener la posición del arte de pesca
   *
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionCostsIncome(idCostsIncome:string) {
    const position = this.costsIncomeArray.findIndex(
      (costsIncome: any) => costsIncome._id === idCostsIncome,
    ) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterCostsIncome(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.costsIncomeArray = this.costsIncomeArrayForFilter
      .filter((costsIncomeArray) => costsIncomeArray.registry_number
        .toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1);
  }

  ngOnInit(): void {
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal() {
    this.modal.close();
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
    this.formEditCostsIncome = this.formBuilder.group({
      _id: [''],
      registry_number: [''],
      person_type: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      gender: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      business_name_establishment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      nit: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      localization: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      informant_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      total_product_sales: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      income_different_products: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      cultivation_sales: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      production_expenses: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });

    this.formEditProductSales = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      quantity_sold: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      total_sales_income: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      unit: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    });
  }

  /**
   * Abre el modal para editar el formulario general
   *
   * @param editCostsIncomeModal Modal que se va desplegar para editar
   * @param costsIncome Data del formulario seleccionado
   */
  openModalEdit(editCostsIncomeModal:NgbModal, costsIncome, pos) {
    this.formSubmitted = false;

    this.posIncome = 0;
    this.posCostsIncome = pos;
    this.modal = this.modalService.open(editCostsIncomeModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditCostsIncome.reset();

    this.formEditCostsIncome.patchValue({
      _id: costsIncome._id,
      registry_number: costsIncome.registry_number,
      business_name_establishment: costsIncome.business_name_establishment,
      person_type: costsIncome.person_type,
      gender: costsIncome.gender,
      create_by: costsIncome.create_by._id,
      nit: costsIncome.nit,
      localization: costsIncome.localization,
      identification: costsIncome.identification,
      informant_name: costsIncome.informant_name,

      total_product_sales: costsIncome.total_product_sales,
      income_different_products: costsIncome.income_different_products,
      cultivation_sales: costsIncome.cultivation_sales,
      production_expenses: costsIncome.production_expenses,
      issue_date: costsIncome.issue_date,
    });

    const label = document.getElementById('editLabel') as HTMLInputElement;
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataCostsIncome() {
    this.formSubmitted = true;

    this.formEditCostsIncome.removeControl('registry_number');

    if (this.formEditCostsIncome.invalid) {
      console.log('ERROR WE');
      console.log(this.formEditCostsIncome);
    } else {
      this.costsIncomeService.updateCostsIncome(
        this.formEditCostsIncome.value,
      ).subscribe(
        (result: any) => {
          Swal.fire({
            title: 'Procesando petición!!',
            html: result.error,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 2000,
          });
          this.getCostsIncome(true);
          this.modalService.dismissAll();
          this.formSubmitted = false;
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            }).then(() => {
              this.routes.navigate(['/login']);
            });
          } else {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: error.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
            console.log(error);
          }
        },
      );
    }
    this.formEditCostsIncome.addControl('registry_number', new FormControl(''));
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param costsIncome Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(costsIncome) {
    const status = costsIncome.is_active;

    this.costsIncomeService
      .disableCostsIncome({ id: costsIncome._id, is_active: !status }).subscribe(
        (result: any) => {
          Swal.fire({
            title: 'Procesando petición!!',
            html: result.message,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 2000,
          });
          this.getCostsIncome(true);
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            }).then(() => {
              this.routes.navigate(['/login']);
            });
          } else {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: error.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
          }
        },
      );
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
    if (this.formEditCostsIncome.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditCostsIncome.get(field)!.hasError('minlength')) {
      const minLength = this.formEditCostsIncome.get(
        field,
      )!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditCostsIncome.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditCostsIncome.get(
        field,
      )!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditCostsIncome.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
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
    if (this.formEditCostsIncome.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.costsIncomeArray = [];
    this.getCostsIncome(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
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
   * Pinta bien el id del array
   */
  filtroDataMaximus(idData, array, tipo) {
    let string = '';

    if (tipo === 1) {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.email;
        }
      });
    } else {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.description;
        }
      });
    }
    return string;
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param posIncome Posición seleccionada
   */
  openModalEditIncome(posIncome) {
    const modalRef:NgbModalRef = this.modalService.open(IncomesModalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditCostsIncome;
    modalRef.componentInstance.posCharged = posIncome;
  }

  /**
   * Abre el modal para editar el formulario de cultivos
   *
   * @param editCultivationModal Modal que se va desplegar para editar
   * @param posIncome Posición seleccionada
   */
  openModalEditCultivation(posIncome) {
    const modalRef:NgbModalRef = this.modalService.open(CultivationModalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditCostsIncome;
    modalRef.componentInstance.posCharged = posIncome;
    modalRef.componentInstance.arrayCharged = this.cropArray;
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param posIncome Posición seleccionada
   */
  openModalEditIncomeDifferent(posIncome) {
    const modalRef:NgbModalRef = this.modalService.open(IncomeDifferentModalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditCostsIncome;
    modalRef.componentInstance.posCharged = posIncome;
  }

  /**
   * Abre el modal para editar el formulario de productos de ganado, avicultura, otros
   *
   * @param editProductSalesModal Modal que se va desplegar para editar
   * @param posIncome Posición seleccionada
   */
  openModalEditProductSales(posIncome) {
    const modalRef:NgbModalRef = this.modalService.open(ProductSalesModalComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditCostsIncome;
    modalRef.componentInstance.posCharged = posIncome;
  }
}
