/* eslint-disable array-callback-return */
import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { save } from 'src/app/services/States/ngrxState/counter.actions';
import { Store } from '@ngrx/store';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';

declare let $: any;

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
})
export class VerticalSidebarComponent {
  showMenu = '';

  showSubMenu = '';

  public sidebarnavItems: RouteInfo[] = [];

  path = '';

  @Input() showClass: boolean = false;

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleNotify() {
    this.notify.emit(!this.showClass);
  }

  constructor(
    private menuService: VerticalSidebarService,
    private router: Router,
    private store: Store<{ token: string }>,
  ) {
    this.tipoUsuarioMenu();
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  tipoUsuarioMenu() {
    const userSession = JSON.parse(localStorage.getItem('USER'));

    if (userSession.area === 'admin') {
      this.menuService.tipoUsuario = 'admin';
    } else if (userSession.area === 'agro') {
      this.menuService.tipoUsuario = 'agro';
    } else if (userSession.area === 'pesca') {
      this.menuService.tipoUsuario = 'pesca';
    } else {
      const tokenId: any = 'nada';
      this.store.dispatch(save({ tokenId }));
      this.router.navigateByUrl('/login');
    }
    this.menuService.elegirMenuPerzonalisado();
    this.obtenerMenuPersonalizado();
  }

  obtenerMenuPersonalizado() {
    this.menuService.items.subscribe((menuItems) => {
      this.sidebarnavItems = menuItems;

      // Active menu
      this.sidebarnavItems.filter((m) => m.submenu.filter(
        (s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        },
      ));
      this.addExpandClass(this.path);
    });
  }
}
