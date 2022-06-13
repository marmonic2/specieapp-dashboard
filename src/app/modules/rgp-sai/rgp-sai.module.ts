import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishermenComponent } from './pages/fishermen/fishermen.component';
import { BoatsComponent } from './pages/boats/boats.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  declarations: [
    FishermenComponent,
    BoatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AvatarModule
  ],
  exports: [
    FishermenComponent,
    BoatsComponent
  ]
})
export class RgpSaiModule { }
