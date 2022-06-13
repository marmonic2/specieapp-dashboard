import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { StaticPagesComponent } from './static-web-pages/static-pages.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsComponent } from './forms-config/forms/forms.component';
import { ProfileComponent } from './profile/profile.component';
import { StaticPagesService } from './static-web-pages/static-pages.service';
import { UsersComponent } from './users/users.component';
import { SpeciesComponent } from './polls-data/species/species.component';
import { FishingArtComponent } from './polls-data/fishing-art/fishing-art.component';
import { FishingMethodComponent } from './polls-data/fishing-method/fishing-method.component';
import { FishingAreaComponent } from './polls-data/fishing-area/fishing-area.component';
import { BoatComponent } from './polls-data/boat/boat.component';
import { PropulsionMethodComponent } from './polls-data/propulsion-method/propulsion-method.component';
import { MeasurementComponent } from './models/measurement/measurement.component';
import { ModulesComponent } from './forms-config/modules/Modules.component';
import { QuestionsComponent } from './forms-config/questions/questions.component';
import { SectionsComponent } from './forms-config/sections/sections.component';
import { RolesComponent } from './roles/roles.component';
import { FishingSiteComponent } from './polls-data/fishing-site/fishing-site.component';
import { ActivitiesComponent } from './models/activities/activities.component';
import { MonitoringComponent } from './models/monitoring/monitoring.component';
import { WeightCheckComponent } from './models/weight-check/weight-check.component';
import { AgriculturalProducerComponent } from './models/agricultural-producer/agricultural-producer.component';
import { CropsComponent } from './polls-data/crops/crops.component';
import { CostsIncomeComponent } from './models/costs-income/costs-income.component';
import { CultivationModalComponent } from './models/costs-income/modals/cultivation-modal/cultivation-modal.component';
import { IncomesModalComponent } from './models/costs-income/modals/incomes-modal/incomes-modal.component';
import { ProductSalesModalComponent } from './models/costs-income/modals/product-sales-modal/product-sales-modal.component';
import { IncomeDifferentModalComponent } from './models/costs-income/modals/income-different-modal/income-different-modal.component';
import { IndustrialVesselInspectionComponent } from './models/industrial-vessel-inspection/industrial-vessel-inspection.component';
import { GeneralInformationComponent } from './models/industrial-vessel-inspection/modals/general-information/general-information.component';
import { ControlSampleLobsterComponent } from './models/industrial-vessel-inspection/modals/control-sample-lobster/control-sample-lobster.component';
import { EffortCharacteristicsArtsMethodsComponent } from './models/industrial-vessel-inspection/modals/effort-characteristics-arts-methods/effort-characteristics-arts-methods.component';
import { FishingAreasComponent } from './models/industrial-vessel-inspection/modals/fishing-areas/fishing-areas.component';
import { TransshipmentControlComponent } from './models/industrial-vessel-inspection/modals/transshipment-control/transshipment-control.component';
import { DivingComponent } from './models/industrial-vessel-inspection/modals/effort-characteristics-arts-methods/sub-modals/diving/diving.component';
import { FishPotsComponent } from './models/industrial-vessel-inspection/modals/effort-characteristics-arts-methods/sub-modals/fish-pots/fish-pots.component';
import { LobsterPotsComponent } from './models/industrial-vessel-inspection/modals/effort-characteristics-arts-methods/sub-modals/lobster-pots/lobster-pots.component';
import { FormViewComponent } from './forms-config/forms/form-view/form-view.component';
import { MonitoringAgriculturalPricesComponent } from './models/monitoring-agricultural-prices/monitoring-agricultural-prices.component';
import { EditCropsComponent } from './models/monitoring-agricultural-prices/modals/editar-monitoring-agricultural/edit-crops/edit-crops.component';
import { EditarMonitoringAgriculturalComponent } from './models/monitoring-agricultural-prices/modals/editar-monitoring-agricultural/editar-monitoring-agricultural.component';
import { GenericDataComponent } from './models/agricultural-producer/modals/generic-data/generic-data.component';
import { ProductiveUnitComponent } from './models/agricultural-producer/modals/productive-unit/productive-unit.component';
import { CattleComponent } from './models/agricultural-producer/modals/cattle/cattle.component';
import { PigsComponent } from './models/agricultural-producer/modals/pigs/pigs.component';
import { BirdsComponent } from './models/agricultural-producer/modals/birds/birds.component';
import { LivestockInventoryComponent } from './models/agricultural-producer/modals/livestock-inventory/livestock-inventory.component';
import { NumFishermenComponent } from './models/monitoring/modals/num-fishermen/num-fishermen.component';
import {RgpSaiModule} from "../modules/rgp-sai/rgp-sai.module";

@NgModule({
  declarations: [
    HomeComponent,
    StaticPagesComponent,
    ReportsComponent,
    ProfileComponent,
    FormsComponent,
    UsersComponent,
    SpeciesComponent,
    FishingArtComponent,
    FishingMethodComponent,
    FishingAreaComponent,
    BoatComponent,
    PropulsionMethodComponent,
    ModulesComponent,
    MeasurementComponent,
    QuestionsComponent,
    SectionsComponent,
    RolesComponent,
    FishingSiteComponent,
    ActivitiesComponent,
    MonitoringComponent,
    WeightCheckComponent,
    AgriculturalProducerComponent,
    CropsComponent,
    CostsIncomeComponent,
    CultivationModalComponent,
    IncomesModalComponent,
    ProductSalesModalComponent,
    IncomeDifferentModalComponent,
    IndustrialVesselInspectionComponent,
    GeneralInformationComponent,
    ControlSampleLobsterComponent,
    EffortCharacteristicsArtsMethodsComponent,
    FishingAreasComponent,
    TransshipmentControlComponent,
    DivingComponent,
    FishPotsComponent,
    LobsterPotsComponent,
    FormViewComponent,
    MonitoringAgriculturalPricesComponent,
    EditCropsComponent,
    EditarMonitoringAgriculturalComponent,
    GenericDataComponent,
    ProductiveUnitComponent,
    CattleComponent,
    PigsComponent,
    BirdsComponent,
    LivestockInventoryComponent,
    NumFishermenComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    RgpSaiModule,
    NgbModule,
    FormsModule,
    DragDropModule,
    NgxChartsModule,
    QuillModule.forRoot(),
  ],
  providers: [
    StaticPagesService,
  ],
})
export class PagesModule { }
