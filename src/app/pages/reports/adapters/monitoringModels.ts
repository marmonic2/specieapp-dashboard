/* eslint-disable no-param-reassign */
let dynamicHeaders = [];

function dateStampToDate(timeStamp:number) {
  const milliseconds = timeStamp;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString();
}

function timeStampToDate(timeStamp:number) {
  const milliseconds = timeStamp;
  const dateObject = new Date(milliseconds);
  return `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
}

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function operatingExpense(adapter:any, monitoring:any) {
  const arrayoperatingExpense:any[] = monitoring.operating_expense;
  arrayoperatingExpense.forEach((element, i) => {
    addDynamicHeaders(`maximoCeboGastoEnUnDia${i + 1}`);
    adapter[`maximoCeboGastoEnUnDia${i + 1}`] = element.bait_higherday;
    addDynamicHeaders(`maximaGasolinaGastadaEnUnDia${i + 1}`);
    adapter[`maximaGasolinaGastadaEnUnDia${i + 1}`] = element.gasoline_higherday;
    addDynamicHeaders(`gasolinaGastadaEnUnDia${i + 1}`);
    adapter[`gasolinaGastadaEnUnDia${i + 1}`] = element.gasoline_oneday;
    addDynamicHeaders(`maximoComestiblesConsumidosEnUnDia${i + 1}`);
    adapter[`maximoComestiblesConsumidosEnUnDia${i + 1}`] = element.groceries_higherday;
    addDynamicHeaders(`maximoHieloGastadoEnUnDia${i + 1}`);
    adapter[`maximoHieloGastadoEnUnDia${i + 1}`] = element.ice_higherday;
    addDynamicHeaders(`otrasCosasGastadasEnUnDia${i + 1}`);
    adapter[`otrasCosasGastadasEnUnDia${i + 1}`] = element.other_oneday;
  });
  return adapter;
}

function nameOfFishermen(adapter:any, monitoring:any) {
  const arrayNameOfFishermen:any[] = monitoring.name_of_fishermen;
  arrayNameOfFishermen.forEach((element, i) => {
    addDynamicHeaders(`nombreDelPescador${i + 1}`);
    adapter[`nombreDelPescador${i + 1}`] = element.name;
  });
  return operatingExpense(adapter, monitoring);
}

function landedCatch(adapter:any, monitoring:any) {
  const arrayLandedCatch:any[] = monitoring.landed_catch;
  arrayLandedCatch.forEach((element, i) => {
    addDynamicHeaders(`especieCapturada${i + 1}`);
    adapter[`especieCapturada${i + 1}`] = element.specie;
    addDynamicHeaders(`cantidadPesca${i + 1}`);
    adapter[`cantidadPesca${i + 1}`] = element.quantity;
    addDynamicHeaders(`estadoPesca${i + 1}`);
    adapter[`estadoPesca${i + 1}`] = element.status;
    addDynamicHeaders(`pesoPesca${i + 1}`);
    adapter[`pesoPesca${i + 1}`] = element.weight;
  });
  return nameOfFishermen(adapter, monitoring);
}

function handLine(adapter:any, monitoring:any) {
  const arrayHandLine:any[] = monitoring.handLine;
  arrayHandLine.forEach((element, i) => {
    addDynamicHeaders(`handline${i + 1}`);
    adapter[`handline${i + 1}`] = element;
  });
  return landedCatch(adapter, monitoring);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((monitoring) => {
    const adapter = {
      arrival_date: dateStampToDate(monitoring.arrival_date),
      arrival_time: timeStampToDate(monitoring.arrival_time),
      create_by: monitoring.create_by.email,
      createdAt: monitoring.createdAt,
      departure_date: dateStampToDate(monitoring.departure_date),
      departure_time: timeStampToDate(monitoring.departure_time),
      diving: monitoring.diving,
      fishermen_number: monitoring.fishermen_number,
      hook_num: monitoring.hook_num,
      isle: monitoring.isle,
      name_ship: monitoring.name_ship.description,
      nasa: monitoring.nasa,
      observation: monitoring.observation,
      power: monitoring.power,
      pr: `${monitoring.pr}`,
      quantity_motor: monitoring.quantity_motor,
      reel_num: monitoring.reel_num,
      registry_number: monitoring.registry_number,
      schedule: `${monitoring.schedule}`,
      site: monitoring.site.description,
      type_motor: monitoring.type_motor,
      zone: monitoring.zone.description,
      updatedAt: monitoring.updatedAt,
    };
    return handLine(adapter, monitoring);
  });
  return newData;
}

function headersToData() {
  const headers = ['Fecha de arribo', 'Tiempo de arribo', 'Creado Por', 'Fecha de creacion', 'Fecha de llegada', 'Tiempo de llegada', 'Buceo', 'Número pescadores', 'Número de anzuelo', 'Isla', 'Nombre del barco', 'Nasa', 'Observación', 'Potencia del motor', 'Propulsor', 'Cantidad de motores', 'Número de reel', 'Número de registro', 'Planificación', 'Sitio', 'Tipo de motor', 'Zona', 'Fecha de actualización'];
  return headers;
}

export function monitoringAdapter(arrayData:any[]) {
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
