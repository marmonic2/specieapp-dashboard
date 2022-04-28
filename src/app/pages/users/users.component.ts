/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public searchUser:string;

  public usersArray = [];

  public usersArrayForFilter = [];

  public rolsArray: [] = [];

  public usersForFilter: [];

  public numberUserShow: number = 5;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formUsers: FormGroup;

  public formEditUser: FormGroup;

  // Control de vistas
  id_view = 0;

  // Jumm?
  public formSubmitted = false;

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    public routes: Router,
    private userService: UsersService,
    private swal: SwalService
  ) {
    this.getUsers(true);
    this.initForms();
  }

  /**
   * la función obtiene todos los users
   * @returns void
   */
  getUsers(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.userService.getUsers(status).subscribe(
      (result: any) => {
        this.usersArray = result.items;
        this.usersArrayForFilter = this.usersArray;
        this.totalLengthOfCollection = result.total;
        this.getRols();
        this.swal.closeNotificationLoading();
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
      }
    );
    this.id_view = 0;
  }

  getRols() {
    this.userService.getRols().subscribe(
      (result: any) => {
        this.rolsArray = result.items;
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
      }
    );
  }

  /**
   * Función para obtener la posición del user
   * @param idBanner id del user
   * @returns retorna la posición del user
   */
  getPositionUser(idUser:string) {
    const position = this.usersArray.findIndex((user: any) => user._id === idUser) + 1;
    return position;
  }

  /**
   * la función es para filtrar los users listados
   * @param event es un evento cuando hay una entrada en campo
   */
  filterUsers(event:any) {
    const wordFilter:string = event.srcElement.value;
    this.usersArray = this.usersArrayForFilter.filter((userArray) => userArray.email
      .toLocaleLowerCase().indexOf(wordFilter.toLocaleLowerCase()) !== -1);
  }

  ngOnInit(): void {
  }

  /**
   * La función sirve para cerrar los modales
   * @returns void
   */
  closeModal() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  /**
  * La función inicializa el formulario para agregar users de tipo FormGroup
  * @returns void
  */
  initForms() {
    this.formUsers = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.maxLength(15)]],
      identification: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      area: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64), Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64), Validators.pattern(/^(?=.*[A-Za-z-\W])(?=.*\d)[A-Za-z\d-\W]/)]],
      rol: ['', [Validators.required]],
    }, {
      // validators: this.samePasswords('password', 'password2'),
    });

    this.formEditUser = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.maxLength(15)]],
      identification: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      area: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64), Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      password: ['', [Validators.minLength(8), Validators.maxLength(64), Validators.pattern(/^(?=.*[A-Za-z-\W])(?=.*\d)[A-Za-z\d-\W]/)]],
      rol: ['', [Validators.required]],
    }, {
      // validators: this.samePasswords('password', 'password2'),
    });
  }

  /**
   * La función abre el modal para agregar users
   * @param modalUser es un objeto NgModal sirve para abrir el modal
   * @returns void
   */
  openModal(modalUser:NgbModal) {
    this.modalService.open(modalUser, {
      centered: true,
      backdrop: 'static',
    });

    this.formUsers.reset();
  }

  /**
   * Abre el modal para editar el usuario
   *
   * @param editUserModal Modal que se va desplegar para editar
   * @param user Data del usuario seleccionado
   */
  openModalEdit(editUserModal:NgbModal, user) {
    this.formSubmitted = false;
    this.modalService.open(editUserModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditUser.reset();

    this.formEditUser.patchValue({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      identification: user.identification,
      phone: user.phone,
      area: user.area,
      email: user.email,
      rol: user.rol._id,
    });
  }

  /**
   * Crea un usuario en la base de datos
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  saveDataUser() {
    this.formSubmitted = true;

    if (this.formUsers.invalid) {
      console.log('ERROR WE');
    } else {
      this.userService.createUser(this.formUsers.value).subscribe(
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
          this.getUsers(true);
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
          }
        }
      );
    }
  }

  /**
   * Guarda los cambios realizados a los usuarios
   *
   * @param selected Formulario rellenado
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataUser(selected) {
    // const pos = this.getPositionUser(selected._id) - 1;

    if (selected.password === '' || selected.password === null) {
      delete selected.password;
    }

    this.formSubmitted = true;

    if (this.formEditUser.invalid) {
      console.log('ERROR WE');
    } else {
      this.userService.updateUser(this.formEditUser.value).subscribe(
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
          this.getUsers(true);
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
        }
      );
    }
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param user Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(user) {
    const status = user.is_active;

    this.userService.disableUser({ id: user._id, is_active: !status }).subscribe(
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
        this.getUsers(true);
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
      }
    );
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessage(field: string): string {
    let message = '';
    if (this.formUsers.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formUsers.get(field)!.hasError('minlength')) {
      const minLength = this.formUsers.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formUsers.get(field)!.hasError('maxlength')) {
      const maxLength = this.formUsers.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formUsers.get(field)!.hasError('pattern')) {
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
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditUser.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditUser.get(field)!.hasError('minlength')) {
      const minLength = this.formEditUser.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditUser.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditUser.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditUser.get(field)!.hasError('pattern')) {
      if (field === 'password') {
        message = 'La contraseña debe ser alfanumérica';
      } else {
        message = 'Este campo es invalido';
      }
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
    if (this.formUsers.get(field)!.invalid && this.formSubmitted) {
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
  invalidFieldE(field: string): boolean {
    if (this.formEditUser.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Validación de campo contraseña
   *
   * @param pass1Name Contraseña original
   * @param pass2Name Contraseña para verificar
   * @returns Si ambas campos son iguales no presenta problemas,
   * en caso contrario, asigna el respectivo mensaje de error.
   */
  samePasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name)!;
      const pass2Control = formGroup.get(pass2Name)!;

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.usersArray = [];
    this.getUsers(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Pinta bien el rol del usuario
   */
  filtroDataMaximus(idRol) {
    let string = '';

    this.rolsArray.forEach((element: any) => {
      if (element._id === idRol._id) {
        string = element.name;
      }
    });

    return string;
  }
}
