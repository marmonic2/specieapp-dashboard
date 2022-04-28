/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import dataLoca from './arrayIndustrialVessel.json';
import { GeneralInformationComponent } from './modals/general-information/general-information.component';
import { FishingAreasComponent } from './modals/fishing-areas/fishing-areas.component';
import { ControlSampleLobsterComponent } from './modals/control-sample-lobster/control-sample-lobster.component';
import { TransshipmentControlComponent } from './modals/transshipment-control/transshipment-control.component';
import { EffortCharacteristicsArtsMethodsComponent } from './modals/effort-characteristics-arts-methods/effort-characteristics-arts-methods.component';
import { IndustrialVesselInspectionService } from './industrial-vessel-inspection.service';

@Component({
  selector: 'app-industrial-vessel-inspection',
  templateUrl: './industrial-vessel-inspection.component.html',
  styleUrls: ['./industrial-vessel-inspection.component.scss'],
})
export class IndustrialVesselInspectionComponent implements OnInit {
  public searchIndustrialVesselInspection:string;

  public industrialVesselInspectionArray = [];

  public industrialVesselInspectionArrayForFilter = [];

  public industrialVesselInspectionForFilter: [];

  public boatArray: [] = [];

  public specieArray: [] = [];

  public areaArray: [] = [];

  public siteArray: [] = [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditIndustrialVesselInspection: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posIncome: number;

  posIndustrialVesselInspection: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public userArray = [];

  public incomesArray: string[] = dataLoca.incomes;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private industrialVesselInspectionService: IndustrialVesselInspectionService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getIndustrialVesselInspection(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getIndustrialVesselInspection(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.industrialVesselInspectionService.getIndustrialVesselInspection(status).subscribe(
      (result: any) => {
        this.industrialVesselInspectionArray = result.items;
        this.industrialVesselInspectionArrayForFilter = this.industrialVesselInspectionArray;
        this.totalLengthOfCollection = result.total;
        this.swal.closeNotificationLoading();

        console.log(this.industrialVesselInspectionArray);

        this.industrialVesselInspectionService.getSpecies(status).subscribe(
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

        this.industrialVesselInspectionService.getBoat(status).subscribe(
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

        this.industrialVesselInspectionService.getUsers(status).subscribe(
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

        this.industrialVesselInspectionService.getFishingArea(status).subscribe(
          (efect: any) => {
            this.areaArray = efect.items;
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

        this.industrialVesselInspectionService.getFishingSite(status).subscribe(
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
  getPositionIndustrialVesselInspection(idIndustrialVesselInspection:string) {
    const position = this.industrialVesselInspectionArray.findIndex(
      (industrialVesselInspection: any) => industrialVesselInspection._id
       === idIndustrialVesselInspection,
    ) + 1;
    return position;
  }

  /**
   * La función es para filtrar las mediciones listadas
   *
   * @param event es un evento cuando hay una entrada en campo
   */
  filterIndustrialVesselInspection(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.industrialVesselInspectionArray = this.industrialVesselInspectionArrayForFilter
      .filter((industrialVesselInspectionArray) => industrialVesselInspectionArray.registryNumber
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
  * La función inicializa el formulario para agregar industrialVesselInspection de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditIndustrialVesselInspection = this.formBuilder.group({
      _id: [''],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      // general_information
      register_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
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

      // BUCEO
      diving_number_pangas_perday: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      diving_number_divers_perpanga: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      diving_effort_diver_perday: ['', [Validators.required, Validators.min(1), Validators.max(500)]],

      // LOBSTERS
      lobster_pots_number_lines_perdays: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      lobster_pots_number_lingadas_perlines: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      lobster_pots_number_nasa_perlingada: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      lobster_pots_effort: ['', [Validators.required, Validators.min(1), Validators.max(500)]],

      // FISH POTS
      fish_pots_type: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      fish_pots_number_pots_perday: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      fish_pots_effort_pots_perday: ['', [Validators.required, Validators.min(1), Validators.max(500)]],

      // Other one
      long_line: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      // ARRAYS
      longLine: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      reel: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],

      // Otros
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      signatureCaptainOrRepresentative: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      observations: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(9999)]],
      signatureRegister: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],

      // LOBSTER
      control_total_bags_landed: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      control_total_sealed_bags: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      number_seals: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],

      fishing_areas: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      transshipment_product_control: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      transshipment_control: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el formulario general
   *
   * @param editIndustrialVesselInspectionModal Modal que se va desplegar para editar
   * @param industrialVesselInspection Data del formulario seleccionado
   */
  openModalEdit(editIndustrialVesselInspectionModal:NgbModal, industrialVesselInspection, pos) {
    this.formSubmitted = false;

    this.posIncome = 0;
    this.posIndustrialVesselInspection = pos;
    this.modal = this.modalService.open(editIndustrialVesselInspectionModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditIndustrialVesselInspection.reset();
    this.chargeGlobalEditForm(industrialVesselInspection);
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataIndustrialVesselInspection(type) {
    this.formSubmitted = true;
    this.formEditIndustrialVesselInspection.patchValue({
      observations: this.formEditIndustrialVesselInspection.value.observations.trim(),
    });

    if (this.formEditIndustrialVesselInspection.invalid) {
      console.log('ERROR WE');
      console.log(this.formEditIndustrialVesselInspection);
    } else {
      console.log(this.formEditIndustrialVesselInspection.value);
      this.industrialVesselInspectionService.updateIndustrialVesselInspection(
        this.formEditIndustrialVesselInspection.value,
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
          this.getIndustrialVesselInspection(true);
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
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param industrialVesselInspection Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(industrialVesselInspection) {
    const status = industrialVesselInspection.is_active;

    this.industrialVesselInspectionService
      .disableIndustrialVesselInspection({
        id: industrialVesselInspection._id, is_active: !status,
      }).subscribe(
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
          this.getIndustrialVesselInspection(true);
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
    if (this.formEditIndustrialVesselInspection.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditIndustrialVesselInspection.get(field)!.hasError('minlength')) {
      const minLength = this.formEditIndustrialVesselInspection.get(
        field,
      )!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditIndustrialVesselInspection.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditIndustrialVesselInspection.get(
        field,
      )!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditIndustrialVesselInspection.get(field)!.hasError('pattern')) {
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
    if (this.formEditIndustrialVesselInspection.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.industrialVesselInspectionArray = [];
    this.getIndustrialVesselInspection(status);
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
   * Abre el modal para editar el formulario de información general
   *
   */
  openModalEditGeneralInformation() {
    const modalRef:NgbModalRef = this.modalService.open(GeneralInformationComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditIndustrialVesselInspection;
    modalRef.componentInstance.boatArray = this.boatArray;
    modalRef.componentInstance.userArray = this.userArray;
    modalRef.componentInstance.siteArray = this.siteArray;

    modalRef.result.then((result: any) => {
      console.log('Editado');

      this.formEditIndustrialVesselInspection.patchValue({
        arrival_date: result.arrival_date,
        boat_name: result.boat_name,
        captain_name: result.captain_name,
        expiration_date: result.expiration_date,
        field_recorder: result.field_recorder,
        landing_site: result.landing_site,
        number_crew_continental: result.number_crew_continental,
        number_crew_foreign: result.number_crew_foreign,
        number_crew_resident: result.number_crew_resident,
        number_fishermen_continental: result.number_fishermen_continental,
        number_fishermen_foreign: result.number_fishermen_foreign,
        number_fishermen_resident: result.number_fishermen_resident,
        patent_number: result.patent_number,
        permit_holder: result.permit_holder,
        register_number: result.register_number,
        sailing_date: result.sailing_date,
        type_fishshop: result.type_fishshop,
      });
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
   * Abre el modal para editar el formulario de area de pescas
   *
   * @param posIncome Posición seleccionada
   */
  openModalFishingArea(posIncome) {
    const modalRef:NgbModalRef = this.modalService.open(FishingAreasComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditIndustrialVesselInspection;
    modalRef.componentInstance.posCharged = posIncome;
    modalRef.componentInstance.areaArray = this.areaArray;
  }

  /**
   * Abre el modal para editar el formulario de cultivos
   *
   * @param posIncome Posición seleccionada
   */
  openModalEditEffortCharacteristics(data) {
    this.formEditIndustrialVesselInspection.reset();
    this.chargeGlobalEditForm(data);

    const modalRef:NgbModalRef = this.modalService.open(EffortCharacteristicsArtsMethodsComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditIndustrialVesselInspection;

    modalRef.result.then((result: any) => {
      console.log('Editado');
      this.updateDataIndustrialVesselInspection(1);
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param posIncome Posición seleccionada
   */
  openModalEditTransshipmentControl(data) {
    this.formEditIndustrialVesselInspection.reset();
    this.chargeGlobalEditForm(data);

    const modalRef:NgbModalRef = this.modalService.open(TransshipmentControlComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditIndustrialVesselInspection;
    modalRef.componentInstance.boatArray = this.boatArray;
    modalRef.componentInstance.specieArray = this.specieArray;

    modalRef.result.then((result: any) => {
      console.log('Editado');
      this.updateDataIndustrialVesselInspection(1);
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
   * Abre el modal para editar el formulario de control de langostas
   *
   * @param posIncome Posición seleccionada
   */
  openModalEditSampleLobster() {
    const modalRef:NgbModalRef = this.modalService.open(ControlSampleLobsterComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.formEditIndustrialVesselInspection;

    modalRef.result.then((result: any) => {
      console.log('Editado');
    }, (reason: any) => {
      console.log('No editado');
    });
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
   * Controla el cargado de los formularios correctamente
   *
   * @param formGroup Formgroup que guardará la data
   * @param data Información que se cargará
   */
  chargeGlobalEditForm(data) {
    this.formEditIndustrialVesselInspection.patchValue({
      _id: data._id,
      create_by: data.create_by._id,
      // general_information
      register_number: data.register_number,
      type_fishshop: data.type_fishshop,
      landing_site: data.landing_site,
      arrival_date: data.arrival_date,
      sailing_date: data.sailing_date,
      boat_name: data.boat_name,
      captain_name: data.captain_name,
      permit_holder: data.permit_holder,
      patent_number: data.patent_number,
      expiration_date: data.expiration_date,
      field_recorder: data.field_recorder,
      number_fishermen_resident: data.number_fishermen_resident,
      number_fishermen_foreign: data.number_fishermen_foreign,
      number_fishermen_continental: data.number_fishermen_continental,
      number_crew_resident: data.number_crew_resident,
      number_crew_foreign: data.number_crew_foreign,
      number_crew_continental: data.number_crew_continental,

      // BUCEO
      diving_number_pangas_perday: data.diving_number_pangas_perday,
      diving_number_divers_perpanga: data.diving_number_divers_perpanga,
      diving_effort_diver_perday: data.diving_effort_diver_perday,

      // LOBSTERS
      lobster_pots_number_lines_perdays: data.lobster_pots_number_lines_perdays,
      lobster_pots_number_lingadas_perlines: data.lobster_pots_number_lingadas_perlines,
      lobster_pots_number_nasa_perlingada: data.lobster_pots_number_nasa_perlingada,
      lobster_pots_effort: data.lobster_pots_effort,

      // FISH POTS
      fish_pots_type: data.fish_pots_type,
      fish_pots_number_pots_perday: data.fish_pots_number_pots_perday,
      fish_pots_effort_pots_perday: data.fish_pots_effort_pots_perday,

      // Other one
      long_line: data.long_line,

      // ARRAYS
      longLine: data.longLine,
      reel: data.reel,

      // Otros
      issue_date: data.issue_date,
      signatureCaptainOrRepresentative: data.signatureCaptainOrRepresentative,
      observations: data.observations,
      signatureRegister: data.signatureRegister,

      // LOBSTER-SEAL
      control_total_bags_landed: data.control_total_bags_landed,
      control_total_sealed_bags: data.control_total_sealed_bags,
      number_seals: data.number_seals,

      // FISHING-AREA
      fishing_areas: data.fishing_areas,

      // TRASBORDO
      transshipment_product_control: data.transshipment_product_control,
      transshipment_control: data.transshipment_control,
    });
  }
}
