import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router, NavigationEnd, ActivatedRoute, Data,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  pageInfo: Data = Object.create(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            // eslint-disable-next-line no-param-reassign
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.titleService.setTitle(event.title);
        this.pageInfo = event;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  ngOnInit() { }
}
