import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoatComponent } from './polls-data/boat/boat.component';
import { FishingAreaComponent } from './polls-data/fishing-area/fishing-area.component';
import { FishingArtComponent } from './polls-data/fishing-art/fishing-art.component';
import { FishingMethodComponent } from './polls-data/fishing-method/fishing-method.component';
import { MeasurementComponent } from './models/measurement/measurement.component';
import { PropulsionMethodComponent } from './polls-data/propulsion-method/propulsion-method.component';
import { SpeciesComponent } from './polls-data/species/species.component';
import { FormsComponent } from './forms-config/forms/forms.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { StaticPagesComponent } from './static-web-pages/static-pages.component';
import { UsersComponent } from './users/users.component';
import { ModulesComponent } from './forms-config/modules/Modules.component';
import { QuestionsComponent } from './forms-config/questions/questions.component';
import { SectionsComponent } from './forms-config/sections/sections.component';
import { RolesComponent } from './roles/roles.component';
import { FishingSiteComponent } from './polls-data/fishing-site/fishing-site.component';
import { ActivitiesComponent } from './models/activities/activities.component';
import { WeightCheckComponent } from './models/weight-check/weight-check.component';
import { MonitoringComponent } from './models/monitoring/monitoring.component';
import { AgriculturalProducerComponent } from './models/agricultural-producer/agricultural-producer.component';
import { CropsComponent } from './polls-data/crops/crops.component';
import { CostsIncomeComponent } from './models/costs-income/costs-income.component';
import { IndustrialVesselInspectionComponent } from './models/industrial-vessel-inspection/industrial-vessel-inspection.component';
import { MonitoringAgriculturalPricesComponent } from './models/monitoring-agricultural-prices/monitoring-agricultural-prices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'home',
    data: {
      title: 'Bienvenido',
      urls: [
        { title: 'Home', url: '/pages/home' },
        { title: 'Inicio' },
      ],
    },
    component: HomeComponent,
  },
  {
    path: 'staticPages',
    data: {
      title: 'Sitio web/Páginas estáticas',
      urls: [
        { title: 'Web', url: '/pages/staticPages' },
        { title: 'Sitio web/Páginas estáticas' },
      ],
    },
    component: StaticPagesComponent,
  },
  {
    path: 'reports',
    data: {
      title: 'Reportes',
      urls: [
        { title: 'Reportes', url: '/pages/reports' },
        { title: 'Página de reportes' },
      ],
    },
    component: ReportsComponent,
  },
  {
    path: 'forms-config/forms',
    data: {
      title: 'Formulario',
      urls: [
        { title: 'Formulario', url: '/pages/forms-config/forms' },
        { title: 'Data de Formulario' },
      ],
    },
    component: FormsComponent,
  },
  {
    path: 'profile',
    data: {
      title: 'Perfil',
      urls: [
        { title: 'Perfil', url: '/pages/profile' },
        { title: 'Página de Perfil' },
      ],
    },
    component: ProfileComponent,
  },
  {
    path: 'users',
    data: {
      title: 'Usuarios',
      urls: [
        { title: 'Administracion', url: '/pages/users' },
        { title: 'Configuración Usuarios' },
      ],
    },
    component: UsersComponent,
  },
  {
    path: 'polls-data/species',
    data: {
      title: 'Especies',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/species' },
        { title: 'Data de Especies' },
      ],
    },
    component: SpeciesComponent,
  },
  {
    path: 'polls-data/fishing-art',
    data: {
      title: 'Artes de Pesca',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/fishing-art' },
        { title: 'Data de Artes de Pesca' },
      ],
    },
    component: FishingArtComponent,
  },
  // Acá
  {
    path: 'polls-data/fishing-area',
    data: {
      title: 'Áreas de Pesca',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/fishing-area' },
        { title: 'Data de Áreas de Pesca' },
      ],
    },
    component: FishingAreaComponent,
  },
  {
    path: 'polls-data/fishing-method',
    data: {
      title: 'Métodos de Pesca',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/fishing-method' },
        { title: 'Data de Métodos de Pesca' },
      ],
    },
    component: FishingMethodComponent,
  },
  {
    path: 'polls-data/boat',
    data: {
      title: 'Barcos',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/boat' },
        { title: 'Data de Barcos' },
      ],
    },
    component: BoatComponent,
  },
  {
    path: 'polls-data/crops',
    data: {
      title: 'Cultivos',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/crops' },
        { title: 'Data de Cultivos' },
      ],
    },
    component: CropsComponent,
  },
  {
    path: 'polls-data/propulsion-method',
    data: {
      title: 'Métodos de Propulsión',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/propulsion-method' },
        { title: 'Data de Métodos de Propulsión' },
      ],
    },
    component: PropulsionMethodComponent,
  },
  {
    path: 'forms-config/modules',
    data: {
      title: 'Módulos',
      urls: [
        { title: 'Pescadería', url: '/pages/forms-config/modules' },
        { title: 'Data de Módulos' },
      ],
    },
    component: ModulesComponent,
  },
  {
    path: 'models/measurement',
    data: {
      title: 'Mediciones',
      urls: [
        { title: 'Mediciones', url: '/pages/models/measurement' },
        { title: 'Data de Mediciones' },
      ],
    },
    component: MeasurementComponent,
  },
  {
    path: 'models/activities',
    data: {
      title: 'Actividades',
      urls: [
        { title: 'Actividades', url: '/pages/models/activities' },
        { title: 'Data de Actividades' },
      ],
    },
    component: ActivitiesComponent,
  },
  {
    path: 'models/weight-check',
    data: {
      title: 'Control de Peso',
      urls: [
        { title: 'Mediciones peces', url: '/pages/models/weight-check' },
        { title: 'Data del control de peso' },
      ],
    },
    component: WeightCheckComponent,
  },
  {
    path: 'models/monitoring',
    data: {
      title: 'Desembarco',
      urls: [
        { title: 'Desembarco', url: '/pages/models/monitoring' },
        { title: 'Data de desembarco' },
      ],
    },
    component: MonitoringComponent,
  },
  {
    path: 'forms-config/questions',
    data: {
      title: 'Preguntas',
      urls: [
        { title: 'Preguntas', url: '/pages/forms-config/questions' },
        { title: 'Data de Preguntas' },
      ],
    },
    component: QuestionsComponent,
  },
  {
    path: 'forms-config/sections',
    data: {
      title: 'Secciones',
      urls: [
        { title: 'Secciones', url: '/pages/forms-config/sections' },
        { title: 'Data de Secciones' },
      ],
    },
    component: SectionsComponent,
  },
  {
    path: 'roles',
    data: {
      title: 'Roles',
      urls: [
        { title: 'Roles', url: '/pages/roles' },
        { title: 'Data de Roles' },
      ],
    },
    component: RolesComponent,
  },
  {
    path: 'polls-data/fishing-site',
    data: {
      title: 'Sitio de Desembarco',
      urls: [
        { title: 'Genericos', url: '/pages/polls-data/fishing-site' },
        { title: 'Data de los Sitios de desembarco' },
      ],
    },
    component: FishingSiteComponent,
  },
  {
    path: 'models/agricultural-producer',
    data: {
      title: 'Productor Agropecuario',
      urls: [
        { title: 'Agro', url: '/pages/models/agricultural-producer' },
        { title: 'Data del productor agropecuario' },
      ],
    },
    component: AgriculturalProducerComponent,
  },
  {
    path: 'models/costs-income',
    data: {
      title: 'Costos e Ingresos',
      urls: [
        { title: 'Agro', url: '/pages/models/costs-income' },
        { title: 'Data de costos e ingresos' },
      ],
    },
    component: CostsIncomeComponent,
  },
  {
    path: 'models/industrial-vessel-inspection',
    data: {
      title: 'Inspección Industrial',
      urls: [
        { title: 'Agro', url: '/pages/models/industrial-vessel-inspection' },
        { title: 'Data de inspección industrial' },
      ],
    },
    component: IndustrialVesselInspectionComponent,
  },
  {
    path: 'models/monitoring-agricultural-prices',
    data: {
      title: 'Seguimiento de precios agrícolas',
      urls: [
        { title: 'Agro', url: '/pages/models/monitoring-agricultural-prices' },
        { title: 'Data de seguimiento de precios agrícolas' },
      ],
    },
    component: MonitoringAgriculturalPricesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
