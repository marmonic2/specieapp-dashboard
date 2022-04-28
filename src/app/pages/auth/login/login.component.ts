import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { save } from 'src/app/services/States/ngrxState/counter.actions';
import Swal from 'sweetalert2';
import { MyserviceService } from '../../../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService],
})
export class LoginComponent {
  token$?: Observable<string>;

  ingresarEnable = false;

  msg = '';

  formSubmitted = false;

  hide = true;

  constructor(
    public routes: Router,
    private formBuilder: FormBuilder,
    public httpService: HttpService,
    private store: Store<{ token: string }>,
  ) {
    this.token$ = store.select('token');
  }

  loginform = false;

  recoverform = false;

  public loginFormData = this.formBuilder.group({
    email: ['',
      [Validators.required,
        Validators.email,
        Validators.pattern(
          '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}',
        ),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(64)],
    ],
  });

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  login() {
    this.loginform = true;

    if (this.loginFormData.invalid) {
      return;
    }

    this.httpService.login(this.loginFormData.value).subscribe(
      (result:any) => {
        try {
          // Validando User Admin o no
          if (result.user.rol === 'ADMIN') {
            const tokenId: string = result.token;
            this.store.dispatch(save({ tokenId }));
            localStorage.setItem('USER', JSON.stringify(result.user));
            this.routes.navigate(['/pages']);
          } else {
            Swal.fire('Error', 'No tiene el rol respectivo para entrar al aplicativo', 'error');
          }
          // const tokenId: string = result.token;
          // this.store.dispatch(save({ tokenId }));
          // localStorage.setItem('USER', JSON.stringify(result.user));
          // this.routes.navigate(['/pages']);
        } catch (error) {
          console.log('Aquí ando', error);
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error!!',
          icon: 'error',
          html: 'Email o Password inválido',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
        });
      },
    );
  }

  /**
   * Valida que los campos sean correctos
   *
   * @param field Campo a validar.
   * @returns Si no hay problemas con los campos retorna false,
   * en caso contrario retorna true.
   */
  invalidField(field: string): boolean {
    if (this.loginFormData.get(field)!.invalid && this.loginform) {
      return true;
    }
    return false;
  }

  /**
   * Administra los mensajes de error para los datos del formulario
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessage(field: string): string {
    let message = '';
    // .errors?.required
    if (this.loginFormData.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.loginFormData.get(field)!.hasError('minlength')) {
      const minLength = this.loginFormData.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.loginFormData.get(field)!.hasError('maxlength')) {
      const maxLength = this.loginFormData.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.loginFormData.get(field)!.hasError('pattern')) {
      message = 'Ingrese un email valido';
    }

    return message;
  }
}
