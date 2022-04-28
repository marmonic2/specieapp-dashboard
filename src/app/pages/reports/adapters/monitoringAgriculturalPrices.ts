/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function vegetables(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.vegetables;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`nombredelVegetal${i + 1}`);
    adapter[`name_vegetables${i + 1}`] = element.name;
  });
  return adapter;
}

function tubers(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.tubers;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`nombredelTuberculo${i + 1}`);
    adapter[`name_tubers${i + 1}`] = element.name;
  });
  return vegetables(adapter, costsIncome);
}

function processedProducts(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.processed_products;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`nombreProductoProcesado${i + 1}`);
    adapter[`name_processed_products${i + 1}`] = element.name;
  });
  return tubers(adapter, costsIncome);
}

function meats(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.meats;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`NombreCarne${i + 1}`);
    adapter[`name_meats${i + 1}`] = element.name;
  });
  return processedProducts(adapter, costsIncome);
}

function grains(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.grains;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`NombreGrano${i + 1}`);
    adapter[`name_grains${i + 1}`] = element.name;
  });
  return meats(adapter, costsIncome);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((agriculturalPrices) => {
    const adapter = {
      business_name_establishment: agriculturalPrices.business_name_establishment,
      create_by: agriculturalPrices.create_by.email,
      createdAt: agriculturalPrices.createdAt,
      identification: agriculturalPrices.identification,
      informant_name: agriculturalPrices.informant_name,
      localization: agriculturalPrices.localization,
      nit: agriculturalPrices.nit,
      person_type: agriculturalPrices.person_type,
      registry_number: agriculturalPrices.registry_number,
      updatedAt: agriculturalPrices.updatedAt,
    };
    return grains(adapter, agriculturalPrices);
  });
  return newData;
}

function headersToData() {
  const headers = ['Nombre del negocio', 'Creado por', 'Fecha de creación', 'identificación', 'nombre del informante', 'Localización', 'Nit', 'Tipo de persona', 'Número de registro', 'Fecha de actualización'];
  return headers;
}

export function agriculturalPricesModel(arrayData:any[]) {
  const newData = adapterData(arrayData);
  let headers = headersToData();
  headers = headers.concat(dynamicHeaders);
  dynamicHeaders = [];
  const adapter = {
    arrayData: newData,
    headers,
  };
  return adapter;
}
