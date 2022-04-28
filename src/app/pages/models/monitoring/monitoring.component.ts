/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { NumFishermenComponent } from './modals/num-fishermen/num-fishermen.component';
import { MonitoringService } from './monitoring.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent implements OnInit {
  public searchMonitoring:string;

  public monitoringArray = [];

  public monitoringArrayForFilter = [];

  public monitoringForFilter: [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditMonitoring: FormGroup;

  public formEditOperatingExpense: FormGroup;

  public formEditLanded: FormGroup;

  public formEditFishermen: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posLanded: number;

  posFishermen: number;

  posMonitoring: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public userArray: [] = [];

  public handLineArray = [];

  // ARRAY PADRE
  public globalArray: [] = [];

  public siteArray: [] = [];

  public artArray: [] = [];

  public specieArray: [] = [];

  public zoneArray: [] = [];

  public methodArray: [] = [];

  public boatArray: [] = [];

  public propulsionArray: [] = [];

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private monitoringService: MonitoringService,
    public routes: Router,
    private swal: SwalService,
  ) {
    this.getMonitoring(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getMonitoring(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.monitoringService.getMonitoring(status).subscribe(
      (result: any) => {
        this.monitoringArray = result.items;
        this.monitoringArrayForFilter = this.monitoringArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();

        console.log(this.monitoringArray);

        this.monitoringService.getGlobalArray(status).subscribe(
          (efect: any) => {
            this.globalArray = efect.items;
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

        this.monitoringService.getFishingSite(status).subscribe(
          (efect: any) => {
            this.siteArray = efect.items;
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

        this.monitoringService.getUsers(status).subscribe(
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

        this.monitoringService.getSpecies(status).subscribe(
          (efect: any) => {
            this.specieArray = efect.items;
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

        this.monitoringService.getFishingArea(status).subscribe(
          (efect: any) => {
            this.zoneArray = efect.items;
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

        this.monitoringService.getFishingArt(status).subscribe(
          (efect: any) => {
            this.artArray = efect.items;
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

        this.monitoringService.getFishingMethod(status).subscribe(
          (efect: any) => {
            this.methodArray = efect.items;
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

        this.monitoringService.getBoat(status).subscribe(
          (efect: any) => {
            this.boatArray = efect.items;
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

        this.monitoringService.getPropulsionMethod(status).subscribe(
          (efect: any) => {
            this.propulsionArray = efect.items;
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
  getPositionMonitoring(idMonitoring:string) {
    const position = this.monitoringArray.findIndex(
      (monitoring: any) => monitoring._id === idMonitoring,
    ) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterMonitoring(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.monitoringArray = this.monitoringArrayForFilter
      .filter((monitoringArray) => monitoringArray.registry_number
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
    this.ngOnInit();
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
    this.ngOnInit();
  }

  /**
  * La función inicializa el formulario para agregar monitoring de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditMonitoring = this.formBuilder.group({
      _id: [''],
      registry_number: [''],
      site: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      zone: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      isle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      departure_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      arrival_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      name_ship: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      pr: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      type_motor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      quantity_motor: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      power: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      fishermen_number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      handLine: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      nasa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      reel_num: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      hook_num: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      diving: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      departure_time: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      arrival_time: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      schedule: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      landed_catch: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      observation: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      operating_expense: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      name_of_fishermen: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      // Está pasivo
      issue_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });

    this.formEditFishermen = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });

    this.formEditOperatingExpense = this.formBuilder.group({
      _id: [''],
      gasoline_oneday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      other_oneday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      groceries_higherday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      ice_higherday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      gasoline_higherday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      bait_higherday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });

    this.formEditLanded = this.formBuilder.group({
      _id: [''],
      specie: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      quantity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      status: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      weight: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editMonitoringModal Modal que se va desplegar para editar
   * @param monitoring Data del arte de pesca seleccionado
   */
  openModalEdit(editMonitoringModal:NgbModal, monitoring, pos) {
    this.formSubmitted = false;

    this.posLanded = 0;
    this.posFishermen = 0;
    this.posMonitoring = pos;
    this.modal = this.modalService.open(editMonitoringModal, {
      centered: true,
      backdrop: 'static',
    });

    this.transformEpochTime(monitoring.arrival_time);
    this.handLineArray = monitoring.handLine;

    this.formEditMonitoring.reset();

    this.formEditMonitoring.patchValue({
      _id: monitoring._id,
      registry_number: monitoring.registry_number,
      site: monitoring.site,
      zone: monitoring.zone,
      isle: monitoring.isle,
      create_by: monitoring.create_by._id,
      departure_date: this.transformEpoch(monitoring.departure_date),
      arrival_date: this.transformEpoch(monitoring.arrival_date),
      name_ship: monitoring.name_ship,
      pr: monitoring.pr,
      type_motor: monitoring.type_motor,
      quantity_motor: monitoring.quantity_motor,
      power: monitoring.power,
      fishermen_number: monitoring.fishermen_number,
      handLine: monitoring.handLine,
      nasa: monitoring.nasa,
      reel_num: monitoring.reel_num,
      hook_num: monitoring.hook_num,
      diving: monitoring.diving,
      departure_time: this.transformEpochTime(monitoring.departure_time),
      arrival_time: this.transformEpochTime(monitoring.arrival_time),
      schedule: monitoring.schedule,
      landed_catch: monitoring.landed_catch,
      observation: monitoring.observation,
      name_of_fishermen: monitoring.name_of_fishermen,
      // value_state: monitoring.value_state,
      operating_expense: monitoring.operating_expense,
      // Está pasivo
      issue_date: monitoring.issue_date,
    });

    const label = document.getElementById('editLabel') as HTMLInputElement;

    if (label.innerHTML === 'Editar actividades dedicadas a la unidad productiva') {
      this.modal.shown.subscribe(() => {
        this.handLineArray.forEach(
          (posi) => {
            const combo = document.getElementById(posi) as HTMLInputElement;
            combo.setAttribute('checked', '');
          },
        );
      });
    }
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editMeasurementModal Modal que se va desplegar para editar
   * @param measurement Data del arte de pesca seleccionado
   */
  openModalEditLanded(editMeasurementModal:NgbModal, speciePos) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editMeasurementModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditLanded.reset();

    this.formEditLanded.patchValue({
      _id: this.formEditMonitoring.value.landed_catch[speciePos]._id,
      specie: this.formEditMonitoring.value.landed_catch[speciePos].specie,
      quantity: this.formEditMonitoring.value.landed_catch[speciePos].quantity,
      status: this.formEditMonitoring.value.landed_catch[speciePos].status,
      weight: this.formEditMonitoring.value.landed_catch[speciePos].weight,
    });
  }

  openModalEditOperatingExpense(editMeasurementModal:NgbModal) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editMeasurementModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditOperatingExpense.reset();

    this.formEditOperatingExpense.patchValue({
      _id: this.formEditMonitoring.value.operating_expense[0]._id,
      gasoline_oneday: this.formEditMonitoring.value.operating_expense[0].gasoline_oneday,
      other_oneday: this.formEditMonitoring.value.operating_expense[0].other_oneday,
      groceries_higherday: this.formEditMonitoring.value.operating_expense[0].groceries_higherday,
      ice_higherday: this.formEditMonitoring.value.operating_expense[0].ice_higherday,
      gasoline_higherday: this.formEditMonitoring.value.operating_expense[0].gasoline_higherday,
      bait_higherday: this.formEditMonitoring.value.operating_expense[0].bait_higherday,
    });
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataMonitoring() {
    this.formSubmitted = true;
    this.formSubmitted = true;
    const hoy = new Date();
    const dateParse = `${this.formEditMonitoring.value.departure_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    const dateParse2 = `${this.formEditMonitoring.value.arrival_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    const timeParse = `${this.formEditMonitoring.value.departure_date} ${this.transformTimeAgain(this.formEditMonitoring.value.departure_time)}`;
    const timeParse2 = `${this.formEditMonitoring.value.arrival_date} ${this.transformTimeAgain(this.formEditMonitoring.value.arrival_time)}`;

    this.formEditMonitoring.removeControl('registry_number');

    if (this.formEditMonitoring.invalid) {
      console.log('ERROR WE');
    } else {
      this.formEditMonitoring.patchValue({
        quantity_motor: (this.formEditMonitoring.value.quantity_motor).toString(),
        power: (this.formEditMonitoring.value.power).toString(),
        fishermen_number: (this.formEditMonitoring.value.fishermen_number).toString(),
        nasa: (this.formEditMonitoring.value.nasa).toString(),
        reel_num: (this.formEditMonitoring.value.reel_num).toString(),
        hook_num: (this.formEditMonitoring.value.hook_num).toString(),
        diving: (this.formEditMonitoring.value.diving).toString(),
        departure_date: Date.parse(dateParse),
        arrival_date: Date.parse(dateParse2),
        departure_time: Date.parse(timeParse),
        arrival_time: Date.parse(timeParse2),
        handLine: this.handLineArray,
      });
      this.monitoringService.updateMonitoring(
        this.formEditMonitoring.value,
      ).subscribe(
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
          this.getMonitoring(true);
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
              html: error.error.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
          }
        },
      );
    }

    this.formEditMonitoring.addControl('registry_number', new FormControl(''));
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeLanded(selected) {
    this.formSubmitted = true;

    if (this.formEditLanded.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditMonitoring.value.landed_catch;
      arrayMod[this.posLanded] = selected;
      this.formEditMonitoring.patchValue({
        landed_catch: arrayMod,
      });
      this.sub_modal.close();
    }
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeOperatingExpense(selected) {
    this.formSubmitted = true;

    if (this.formEditOperatingExpense.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = selected;
      this.formEditMonitoring.value.operating_expense[0] = arrayMod;
      this.sub_modal.close();
      console.log(this.formEditMonitoring.value);
    }
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param monitoring Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(monitoring) {
    const status = monitoring.is_active;

    this.monitoringService
      .disableMonitoring({ id: monitoring._id, is_active: !status }).subscribe(
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
          this.getMonitoring(true);
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
    if (this.formEditMonitoring.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditMonitoring.get(field)!.hasError('minlength')) {
      const minLength = this.formEditMonitoring.get(
        field,
      )!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditMonitoring.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditMonitoring.get(
        field,
      )!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditMonitoring.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
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
  getErrorMessageEditLanded(field: string): string {
    let message = '';
    if (this.formEditLanded.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditLanded.get(field)!.hasError('minlength')) {
      const minLength = this.formEditLanded.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditLanded.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditLanded.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditLanded.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditLanded.get(field)!.hasError('min')) {
      const min = this.formEditLanded.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditLanded.get(field)!.hasError('max')) {
      const max = this.formEditLanded.get(field)!.errors?.max.max;
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
  getErrorMessageEditOperatingExpense(field: string): string {
    let message = '';
    if (this.formEditOperatingExpense.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditOperatingExpense.get(field)!.hasError('minlength')) {
      const minLength = this.formEditOperatingExpense.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditOperatingExpense.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditOperatingExpense.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditOperatingExpense.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditOperatingExpense.get(field)!.hasError('min')) {
      const min = this.formEditOperatingExpense.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditOperatingExpense.get(field)!.hasError('max')) {
      const max = this.formEditOperatingExpense.get(field)!.errors?.max.max;
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
    if (this.formEditMonitoring.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldLanded(field: string): boolean {
    if (this.formEditLanded.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldOperatingExpense(field: string): boolean {
    if (this.formEditOperatingExpense.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.monitoringArray = [];
    this.getMonitoring(status);
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
    this.posLanded = event.target.value;
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
   * Transforma las fechas en formato epoch
   *
   * @param epoch Formato de fecha en número
   * @returns String con la fecha
   */
  transformEpochTime(epoch) {
    const data = new Date(epoch);
    let hora = '';
    let minuto = '';

    if (data.getUTCHours() < 10) {
      hora = `0${data.getUTCHours()}`;
    } else {
      hora = data.getUTCHours().toString();
    }

    if ((data.getUTCMinutes() + 1) < 10) {
      minuto = `0${data.getUTCMinutes()}`;
    } else {
      minuto = data.getUTCMinutes().toString();
    }

    const string = `${hora}:${minuto}`;

    return string;
  }

  /**
   * Transforma las fechas en formato epoch
   *
   * @param epoch Formato de fecha en número
   * @returns String con la fecha
   */
  transformTimeAgain(epoch: string) {
    let hora = parseInt(epoch, 10) - 5;

    switch (hora) {
      case -1:
        hora = 23;
        break;
      case -2:
        hora = 22;
        break;
      case -3:
        hora = 21;
        break;
      case -4:
        hora = 20;
        break;
      case -5:
        hora = 19;
        break;
      default:
        break;
    }

    const string = `${hora}:${epoch.substring(3)}`;

    return string;
  }

  /**
   * Detecta los cambios de un checkbox
   */
  checkInput(event: any) {
    if (event.target.checked) {
      const data: string = event.target.value;
      this.handLineArray.push(data);
    } else {
      this.handLineArray = this.handLineArray.filter(
        (data) => data !== event.target.value,
      );
    }
  }

  /**
   * Abre el modal para editar el formulario inventario animal
   *
   */
  openModalEditNumFishermen(data, pos) {
    const modalRef:NgbModalRef = this.modalService.open(NumFishermenComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataSelect = data;
    modalRef.componentInstance.posCharged = pos;

    modalRef.result.then((result) => {
      this.posFishermen = 0;
    }, (reason) => {
      console.log('No edité');
    });
  }

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChangeFish(event: any) {
    this.posFishermen = event.target.value;
  }
}
