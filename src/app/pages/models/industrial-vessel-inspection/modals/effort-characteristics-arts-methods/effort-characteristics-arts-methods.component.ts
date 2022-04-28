/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DivingComponent } from './sub-modals/diving/diving.component';
import { FishPotsComponent } from './sub-modals/fish-pots/fish-pots.component';
import { LobsterPotsComponent } from './sub-modals/lobster-pots/lobster-pots.component';

@Component({
  selector: 'app-effort-characteristics-arts-methods',
  templateUrl: './effort-characteristics-arts-methods.component.html',
  styleUrls: ['./effort-characteristics-arts-methods.component.scss'],
})
export class EffortCharacteristicsArtsMethodsComponent implements OnInit {
  @Input() public dataForm: any;

  public formEditEffortCharacteristic: FormGroup;

  public formEditReel: FormGroup;

  public formEditLongLine: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posIncome: number = 0;

  posIncomeTwo: number = 0;

  modal: NgbModalRef;

  // Jumm?
  public formSubmitted = false;

  public effortCharacteristicArray = [];

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
    this.formEditEffortCharacteristic = this.formBuilder.group({
      long_line: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      reel: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      longLine: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });

    this.formEditReel = this.formBuilder.group({
      _id: [''],
      effort_reel_perday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      hook_gauge: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      hook_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      number_hooks: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      number_reel_perday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });

    this.formEditLongLine = this.formBuilder.group({
      _id: [''],
      sets_number_perday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      sets_number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      sets_hook_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      sets_hook_gauge: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      sets_effort_hook_perday: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el formulario de gastos por producción
   *
   * @param editIncomeModal Modal que se va desplegar para editar
   * @param measurement Data del formulario seleccionado
   */
  chargeForm() {
    this.formEditEffortCharacteristic.reset();

    this.formEditEffortCharacteristic.patchValue({
      long_line: this.dataForm.value.long_line,
      reel: this.dataForm.value.reel,
      longLine: this.dataForm.value.longLine,
    });
  }

  /**
   * Abre el modal para editar el formulario de buceos
   *
   * @param posIncome Posición seleccionada
   */
  openModalDiving() {
    const modalRef:NgbModalRef = this.modalService.open(DivingComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.dataForm.value;

    modalRef.result.then((result: any) => {
      console.log('Editado');
      this.dataForm.patchValue({
        diving_number_pangas_perday: result.diving_number_pangas_perday,
        diving_number_divers_perpanga: result.diving_number_divers_perpanga,
        diving_effort_diver_perday: result.diving_effort_diver_perday,
      });
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
     * Abre el modal para editar el formulario para nasas de langostas
     *
     * @param posIncome Posición seleccionada
     */
  openModalLobsterPots() {
    const modalRef:NgbModalRef = this.modalService.open(LobsterPotsComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.dataForm.value;

    modalRef.result.then((result: any) => {
      console.log('Editado');
      this.dataForm.patchValue({
        lobster_pots_number_lines_perdays: result.lobster_pots_number_lines_perdays,
        lobster_pots_number_lingadas_perlines: result.lobster_pots_number_lingadas_perlines,
        lobster_pots_number_nasa_perlingada: result.lobster_pots_number_nasa_perlingada,
        lobster_pots_effort: result.lobster_pots_effort,
      });
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
     * Abre el modal para editar el formulario para nasas de pescados
     *
     * @param posIncome Posición seleccionada
     */
  openModalFishPots() {
    const modalRef:NgbModalRef = this.modalService.open(FishPotsComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.dataForm = this.dataForm.value;

    modalRef.result.then((result: any) => {
      console.log('Editado');
      this.dataForm.patchValue({
        fish_pots_type: result.fish_pots_type,
        fish_pots_number_pots_perday: result.fish_pots_number_pots_perday,
        fish_pots_effort_pots_perday: result.fish_pots_effort_pots_perday,
      });
    }, (reason: any) => {
      console.log('No editado');
    });
  }

  /**
     * Abre el modal para editar el formulario general
     *
     * @param editModal Modal que se va desplegar para editar
     * @param dataModal Data del formulario seleccionado
     */
  openModalReel(editModal:NgbModal, pos) {
    this.formSubmitted = false;

    this.modal = this.modalService.open(editModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditReel.reset();

    this.formEditReel.patchValue({
      _id: this.dataForm.value.reel[pos]._id,
      effort_reel_perday: this.dataForm.value.reel[pos].effort_reel_perday,
      hook_gauge: this.dataForm.value.reel[pos].hook_gauge,
      hook_type: this.dataForm.value.reel[pos].hook_type,
      number_hooks: this.dataForm.value.reel[pos].number_hooks,
      number_reel_perday: this.dataForm.value.reel[pos].number_reel_perday,
      type: this.dataForm.value.reel[pos].type,
    });
  }

  /**
     * Abre el modal para editar el formulario general
     *
     * @param editModal Modal que se va desplegar para editar
     * @param dataModal Data del formulario seleccionado
     */
  openModalLongLine(editModal:NgbModal, pos) {
    this.formSubmitted = false;

    this.modal = this.modalService.open(editModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    this.formEditLongLine.reset();

    this.formEditLongLine.patchValue({
      _id: this.dataForm.value.longLine[pos]._id,
      sets_number_perday: this.dataForm.value.longLine[pos].sets_number_perday,
      sets_number: this.dataForm.value.longLine[pos].sets_number,
      sets_hook_type: this.dataForm.value.longLine[pos].sets_hook_type,
      sets_hook_gauge: this.dataForm.value.longLine[pos].sets_hook_gauge,
      sets_effort_hook_perday: this.dataForm.value.longLine[pos].sets_effort_hook_perday,
    });
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditEffortCharacteristic(field: string): string {
    let message = '';
    if (this.formEditEffortCharacteristic.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditEffortCharacteristic.get(field)!.hasError('minlength')) {
      const minLength = this.formEditEffortCharacteristic
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditEffortCharacteristic.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditEffortCharacteristic
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditEffortCharacteristic.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditEffortCharacteristic.get(field)!.hasError('min')) {
      const min = this.formEditEffortCharacteristic.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditEffortCharacteristic.get(field)!.hasError('max')) {
      const max = this.formEditEffortCharacteristic.get(field)!.errors?.max.max;
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
  getErrorMessageEditReel(field: string): string {
    let message = '';
    if (this.formEditReel.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditReel.get(field)!.hasError('minlength')) {
      const minLength = this.formEditReel
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditReel.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditReel
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditReel.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditReel.get(field)!.hasError('min')) {
      const min = this.formEditReel.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditReel.get(field)!.hasError('max')) {
      const max = this.formEditReel.get(field)!.errors?.max.max;
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
  getErrorMessageEditLongLine(field: string): string {
    let message = '';
    if (this.formEditLongLine.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditLongLine.get(field)!.hasError('minlength')) {
      const minLength = this.formEditLongLine
        .get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditLongLine.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditLongLine
        .get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditLongLine.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditLongLine.get(field)!.hasError('min')) {
      const min = this.formEditLongLine.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditLongLine.get(field)!.hasError('max')) {
      const max = this.formEditLongLine.get(field)!.errors?.max.max;
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
  invalidFieldEffortCharacteristic(field: string): boolean {
    if (this.formEditEffortCharacteristic.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldReel(field: string): boolean {
    if (this.formEditReel.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldLongLine(field: string): boolean {
    if (this.formEditLongLine.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Cambios guardados en los esfuerzos y características
   *
   * @param selected Especie seleccionada
   */
  saveChangeEffortCharacteristic() {
    this.formSubmitted = true;

    if (this.dataForm.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value;
      this.closeModal(arrayMod);
    }
  }

  /**
   * Cambios guardados en los reel
   *
   * @param selected Especie seleccionada
   */
  saveChangeReel() {
    this.formSubmitted = true;

    this.formEditReel.patchValue({
      type: this.formEditReel.value.type.trim(),
      hook_type: this.formEditReel.value.hook_type.trim(),
    });

    if (this.formEditReel.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.reel;
      arrayMod[this.posIncome] = this.formEditReel.value;

      this.posIncome = 0;

      this.closeModalS();
    }
  }

  /**
   * Cambios guardados en los subgrupos
   *
   * @param selected Especie seleccionada
   */
  saveChangeLongLine() {
    this.formSubmitted = true;

    this.formEditLongLine.patchValue({
      sets_hook_type: this.formEditLongLine.value.sets_hook_type.trim(),
    });

    if (this.formEditLongLine.invalid) {
      console.log('ERROR WE');
    } else {
      const arrayMod = this.dataForm.value.longLine;
      arrayMod[this.posIncomeTwo] = this.formEditLongLine.value;

      this.posIncomeTwo = 0;

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
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChangeTwo(event: any) {
    this.posIncomeTwo = event.target.value;
  }
}
