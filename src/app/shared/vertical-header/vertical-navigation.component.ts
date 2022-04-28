import {
  Component, AfterViewInit, EventEmitter, Output, OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { save } from 'src/app/services/States/ngrxState/counter.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
})
export class VerticalNavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  public dataUser;

  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    type: 'es',
    icon: 'es',
  };

  public languages: any[] = [
    {
      language: 'Español',
      code: 'es',
      icon: 'es',
    },
    /* {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr',
    },
    {
      language: 'German',
      code: 'de',
      icon: 'de',
    } */];

  constructor(
    private translate: TranslateService,
    private store: Store<{ token: string }>,
    public routes: Router
  ) {
    translate.setDefaultLang('es');
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  // eslint-disable-next-line class-methods-use-this
  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('USER'));
  }

  logout() {
    const tokenId: any = 'nada';
    this.store.dispatch(save({ tokenId }));
    this.routes.navigateByUrl('/login');
  }
}
