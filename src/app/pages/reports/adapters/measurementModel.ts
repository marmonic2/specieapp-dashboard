/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function measuredSpecie(adapter:any, measurement:any) {
  const arrayMeasurement:any[] = measurement.measured_specie;
  arrayMeasurement.forEach((element, i) => {
    addDynamicHeaders(`Especie${i + 1}`);
    adapter[`specie${i + 1}`] = element.specie;
    addDynamicHeaders(`Frecuencia${i + 1}`);
    adapter[`frecuency${i + 1}`] = element.frecuency;
    addDynamicHeaders(`longitud${i + 1}`);
    adapter[`longitud${i + 1}`] = element.longitud;
  });
  return adapter;
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((measurement) => {
    const adapter = {
      art: measurement.art.description,
      create_by: measurement.create_by.email,
      createdAt: measurement.createdAt,
      site: measurement.site.description,
      updatedAt: measurement.updatedAt,
      zone: measurement.zone.description,
    };
    return measuredSpecie(adapter, measurement);
  });
  return newData;
}

function headersToData() {
  const headers = ['Arte de pesca', 'Creado por', 'Fecha de creación', 'Sitio de desembarco', 'Fecha de actualización', 'zona'];
  return headers;
}

export function measurementModel(arrayData:any[]) {
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
