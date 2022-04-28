import { activityModel } from './activityModel';
import { measurementModel } from './measurementModel';
import { monitoringAdapter } from './monitoringModels';
import { weightCheckModel } from './weightCheck';
import { industrialInspectionAdapter } from './industrialVesselInspection';
import { agriculturalProducerAdapter } from './agricultural-producer-form';
import { costsAndIncomeModel } from './costsAndIncome';
import { agriculturalPricesModel } from './monitoringAgriculturalPrices';

export function selectAdapterModel(model:string):any {
  switch (model) {
    case 'activitie':
      return activityModel;
    case 'measurement':
      return measurementModel;
    case 'monitoring':
      return monitoringAdapter;
    case 'weight-check':
      return weightCheckModel;
    case 'industrial-vessel-inspection':
      return industrialInspectionAdapter;
    case 'agricultural-producer-form':
      return agriculturalProducerAdapter;
    case 'costs-and-income':
      return costsAndIncomeModel;
    case 'monitoring-agricultural-prices':
      return agriculturalPricesModel;
    default:
      return null;
  }
}
