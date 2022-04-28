import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  public token;

  /**
   * Constructor del AuthGuard
   *
   * @param routes Servicio de rutas para el direccionamiento de páginas
   * @param auts Servicio que utiliza métodos de autenticación
   */
  constructor(
    private routes: Router,
    private store: Store<{ token: string }>,
  ) {
    this.store.subscribe((res) => {
      this.token = res.token;
    });
  }

  /**
   * Verificación del usuario logeado
   *
   * @returns Verifica que el usuario no esté logueado para poder acceder al login,
   * en caso contrario muestra el respectivo mensaje
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token === 'nada') {
      this.routes.navigate(['/login']);
      return false;
    }
    return true;
  }
}
