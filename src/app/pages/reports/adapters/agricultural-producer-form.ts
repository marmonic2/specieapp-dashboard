/* eslint-disable no-param-reassign */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function surface(adapter:any, agriculturalProducer:any) {
  const arraySurface:any[] = agriculturalProducer.surface;
  arraySurface.forEach((element, i) => {
    addDynamicHeaders(`bosque${i + 1}`);
    adapter[`surface_forest${i + 1}`] = element.forest;
    addDynamicHeaders(`tierra${i + 1}`);
    adapter[`surface_land${i + 1}`] = element.land;
    addDynamicHeaders(`pasto${i + 1}`);
    adapter[`surface_pasture${i + 1}`] = element.pasture;
    addDynamicHeaders(`tamañoDeLaSuperficie${i + 1}`);
    adapter[`surface_size${i + 1}`] = element.size;
  });
  return adapter;
}

function pigs(adapter:any, agriculturalProducer:any) {
  const arrayPigs:any[] = agriculturalProducer.pigs;
  arrayPigs.forEach((element, i) => {
    addDynamicHeaders(`numeroDeCerdosHembrasDe0A6Meses${i + 1}`);
    adapter[`pigs_number_females_0_to_6_months${i + 1}`] = element.number_females_0_to_6_months;
    addDynamicHeaders(`numeroDeCerdosHembrasDe6A12Meses${i + 1}`);
    adapter[`pigs_number_females_6_to_12_months${i + 1}`] = element.number_females_6_to_12_months;
    addDynamicHeaders(`numeroDeCerdosHembrasDe12A24Meses${i + 1}`);
    adapter[`pigs_number_females_12_to_24_months${i + 1}`] = element.number_females_12_to_24_months;
    addDynamicHeaders(`numeroDeCerdosHembrasMasViejasQue24Meses${i + 1}`);
    adapter[`pigs_number_females_older_than_24_months${i + 1}`] = element.number_females_older_than_24_months;
    addDynamicHeaders(`numeroDeCerdosMachosDe0A6Meses${i + 1}`);
    adapter[`pigs_number_males_0_to_6_months${i + 1}`] = element.number_males_0_to_6_months;
    addDynamicHeaders(`numeroDeCerdosMachosDe6A12Meses${i + 1}`);
    adapter[`pigs_number_males_6_to_12_months${i + 1}`] = element.number_males_6_to_12_months;
    addDynamicHeaders(`numeroDeCerdosMachosDe12A24Meses${i + 1}`);
    adapter[`pigs_number_males_12_to_24_months${i + 1}`] = element.number_males_12_to_24_months;
    addDynamicHeaders(`numeroDeCerdosMachosMasViejosQue24Meses${i + 1}`);
    adapter[`pigs_number_males_older_than_24_months${i + 1}`] = element.number_males_older_than_24_months;
    addDynamicHeaders(`numeroTotalDeCerdosHembras${i + 1}`);
    adapter[`pigs_number_of_female_pigs${i + 1}`] = element.number_of_females;
    addDynamicHeaders(`numeroTotalDeCerdosMachos${i + 1}`);
    adapter[`pigs_number_of_male_pigs${i + 1}`] = element.number_of_males;
    addDynamicHeaders(`cerdosTotales${i + 1}`);
    adapter[`pigs_total_pigs${i + 1}`] = element.total_pigs;
  });
  return surface(adapter, agriculturalProducer);
}

function cattle(adapter:any, agriculturalProducer:any) {
  const arrayCattle:any[] = agriculturalProducer.cattle;
  arrayCattle.forEach((element, i) => {
    addDynamicHeaders(`numeroDeBovinosHembrasDe0A6Meses${i + 1}`);
    adapter[`cattle_number_females_0_to_6_months${i + 1}`] = element.number_females_0_to_6_months;
    addDynamicHeaders(`numeroDeBovinosHembrasDe6A12Meses${i + 1}`);
    adapter[`cattle_number_females_6_to_12_months${i + 1}`] = element.number_females_6_to_12_months;
    addDynamicHeaders(`numeroDeBovinosHembrasDe12A24Meses${i + 1}`);
    adapter[`cattle_number_females_12_to_24_months${i + 1}`] = element.number_females_12_to_24_months;
    addDynamicHeaders(`numeroDeBovinosHembrasMasViejasQue24Meses${i + 1}`);
    adapter[`cattle_number_females_older_than_24_months${i + 1}`] = element.number_females_older_than_24_months;
    addDynamicHeaders(`numeroDeBovinosMachosDe0A6Meses${i + 1}`);
    adapter[`cattle_number_males_0_to_6_months${i + 1}`] = element.number_males_0_to_6_months;
    addDynamicHeaders(`numeroDeBovinosMachosDe6A12Meses${i + 1}`);
    adapter[`cattle_number_males_6_to_12_months${i + 1}`] = element.number_males_6_to_12_months;
    addDynamicHeaders(`numeroDeBovinosMachosDe12A24Meses${i + 1}`);
    adapter[`cattle_number_males_12_to_24_months${i + 1}`] = element.number_males_12_to_24_months;
    addDynamicHeaders(`numeroDeBovinosMachosMasViejosQue24Meses${i + 1}`);
    adapter[`cattle_number_males_older_than_24_months${i + 1}`] = element.number_males_older_than_24_months;
    addDynamicHeaders(`numeroTotalDeBovinosHembras${i + 1}`);
    adapter[`cattle_number_of_female_cattle${i + 1}`] = element.number_of_female_cattle;
    addDynamicHeaders(`numeroTotalDeBovinosMachos${i + 1}`);
    adapter[`cattle_number_of_male_cattle${i + 1}`] = element.number_of_male_cattle;
    addDynamicHeaders(`BovinosTotales${i + 1}`);
    adapter[`cattle_total_cattle${i + 1}`] = element.total_cattle;
  });
  return pigs(adapter, agriculturalProducer);
}

function birds(adapter:any, agriculturalProducer:any) {
  const arrayBirds:any[] = agriculturalProducer.birds;
  arrayBirds.forEach((element, i) => {
    addDynamicHeaders(`numeroDeDobleProposito${i + 1}`);
    adapter[`dual_purpose_number${i + 1}`] = element.dual_purpose_number;
    addDynamicHeaders(`numeroDeEngorde${i + 1}`);
    adapter[`fattening_number${i + 1}`] = element.fattening_number;
    addDynamicHeaders(`numeroDePonederas${i + 1}`);
    adapter[`number_of_layers${i + 1}`] = element.number_of_layers;
    addDynamicHeaders(`numeroDeGallos${i + 1}`);
    adapter[`number_of_roosters${i + 1}`] = element.number_of_roosters;
  });
  return cattle(adapter, agriculturalProducer);
}

function livestockInventory(adapter:any, agriculturalProducer:any) {
  const arrayLivestockInventory:any[] = agriculturalProducer.livestock_inventory;
  arrayLivestockInventory.forEach((element, i) => {
    addDynamicHeaders(`promedio de pollo por ciclo${i + 1}`);
    adapter[`average_cicle_chicken${i + 1}`] = element.average_cicle_chicken;
    addDynamicHeaders(`promedio de cerdo por ciclo${i + 1}`);
    adapter[`average_cicle_pig${i + 1}`] = element.average_cicle_pig;
    addDynamicHeaders(`promedio de pollo por dia${i + 1}`);
    adapter[`average_day_chicken${i + 1}`] = element.average_day_chicken;
    addDynamicHeaders(`promedio de leche por dia${i + 1}`);
    adapter[`average_day_milk${i + 1}`] = element.average_day_milk;
    addDynamicHeaders(`pollos de engorde${i + 1}`);
    adapter[`broilers${i + 1}`] = element.broilers;
    addDynamicHeaders(`huevos de pollo${i + 1}`);
    adapter[`chicken_eggs${i + 1}`] = element.chicken_eggs;
    addDynamicHeaders(`pollos ultimos 6 meses${i + 1}`);
    adapter[`last_six_months_chicken${i + 1}`] = element.last_six_months_chicken;
    addDynamicHeaders(`leche ultimos 6 meses${i + 1}`);
    adapter[`last_six_months_milk${i + 1}`] = element.last_six_months_milk;
    addDynamicHeaders(`cerdo ultimos 6 meses${i + 1}`);
    adapter[`last_six_months_pig${i + 1}`] = element.last_six_months_pig;
    addDynamicHeaders(`leche${i + 1}`);
    adapter[`milk${i + 1}`] = element.milk;
    addDynamicHeaders(`carne de cerdo${i + 1}(Kg)`);
    adapter[`pig_meat${i + 1}`] = element.pig_meat;
    addDynamicHeaders(`total de aves${i + 1}`);
    adapter[`total_birds${i + 1}`] = element.total_birds;
    addDynamicHeaders(`pollos totales${i + 1}`);
    adapter[`total_chicken${i + 1}`] = element.total_chicken;
    addDynamicHeaders(`cabras totales${i + 1}`);
    adapter[`total_goats${i + 1}`] = element.total_goats;
    addDynamicHeaders(`gallinas totales${i + 1}`);
    adapter[`total_hen${i + 1}`] = element.total_hen;
    addDynamicHeaders(`ovejas totales${i + 1}`);
    adapter[`total_sheep${i + 1}`] = element.total_sheep;
  });
  return birds(adapter, agriculturalProducer);
}

function cropsProduced(adapter:any, agriculturalProducer:any) {
  const arrayHandLine:any[] = agriculturalProducer.crops_produced;
  arrayHandLine.forEach((element, i) => {
    addDynamicHeaders(`cultivo${i + 1}`);
    adapter[`crop${i + 1}`] = element.crop;
    addDynamicHeaders(`cosecha${i + 1}`);
    adapter[`harvest${i + 1}`] = element.harvest;
    addDynamicHeaders(`areaSembrada${i + 1}`);
    adapter[`sown_area${i + 1}`] = element.sown_area;
  });
  return livestockInventory(adapter, agriculturalProducer);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((agriculturalProducer) => {
    const adapter = {
      create_by: agriculturalProducer.create_by.email,
      createdAt: agriculturalProducer.createdAt,
      cultivation_system: agriculturalProducer.cultivation_system,
      form_ternure: agriculturalProducer.form_ternure,
      gender: agriculturalProducer.gender,
      identification: agriculturalProducer.identification,
      income_generation: agriculturalProducer.income_generation,
      informant_name: agriculturalProducer.informant_name,
      latitude: agriculturalProducer.latitude,
      length: agriculturalProducer.length,
      localization: agriculturalProducer.localization,
      nit: agriculturalProducer.nit,
      person_type: agriculturalProducer.person_type,
      principal_activity: agriculturalProducer.principal_activity,
      registry_number: agriculturalProducer.registry_number,
      self_consumption: agriculturalProducer.self_consumption,
      updatedAt: agriculturalProducer.updatedAt,
      water_resource: agriculturalProducer.water_resource,
    };
    return cropsProduced(adapter, agriculturalProducer);
  });
  return newData;
}

function headersToData() {
  const headers = ['Creado por', 'Fecha de creación', 'Sistema de cultivación', 'Formato de tenencia', 'Genero', 'Identificación', 'Generaración de ingresos', 'Nombre del informante', 'Latitud', 'Longitud', 'Localización', 'Nit', 'Tipo de persona', 'Actividad principal', 'Número de registro', 'Autoconsumo', 'Fecha de actualización', 'Fuente de agua'];
  return headers;
}

export function agriculturalProducerAdapter(arrayData:any[]) {
  const newData = adapterData(arrayData);
  let headers = headersToData();
  headers = headers.concat(dynamicHeaders);
  const adapter = {
    arrayData: newData,
    headers,
  };
  dynamicHeaders = [];
  return adapter;
}
