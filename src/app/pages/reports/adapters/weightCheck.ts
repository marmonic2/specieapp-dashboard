/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function weightSpecie(adapter:any, weight:any) {
  const arrayweight:any[] = weight.weight_check_specie;

  arrayweight.forEach((element, i) => {
    addDynamicHeaders(`Especie${i + 1}`);
    adapter[`specie${i + 1}`] = element.specie;
    addDynamicHeaders(`oservacion${i + 1}`);
    adapter[`observations${i + 1}`] = element.observations;
    addDynamicHeaders(`sexo${i + 1}`);
    adapter[`sex${i + 1}`] = element.sex;
    addDynamicHeaders(`talla(cm)${i + 1}`);
    adapter[`size${i + 1}`] = element.size;
    addDynamicHeaders(`ovadas${i + 1}`);
    adapter[`ovate${i + 1}`] = `${element.ovate}`;
    addDynamicHeaders(`Estado${i + 1}`);
    adapter[`state${i + 1}`] = element.state;
    addDynamicHeaders(`Peso${i + 1}`);
    adapter[`weight${i + 1}`] = element.weight;
  });

  return adapter;
}

function namesPeopleSampling(adapter:any, weight:any) {
  const arrayweight:any[] = weight.names_people_sampling;
  arrayweight.forEach((element, i) => {
    addDynamicHeaders(`personasQueRealizanMuestreo${i + 1}`);
    adapter[`name${i + 1}`] = element.name;
  });
  return weightSpecie(adapter, weight);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((weight) => {
    const adapter = {
      create_by: weight.create_by.email,
      createdAt: weight.createdAt,
      motorShip: weight.motorShip.description,
      place: weight.place.description,
      updatedAt: weight.updatedAt,
      totalWeight: weight.total_weight,
      productsBelowSize: weight.products_below_size,
      numberOfOvateFemales: weight.number_of_ovate_females,
      numberOfTailsBelowSize: weight.number_of_tails_below_size,
    };
    return namesPeopleSampling(adapter, weight);
  });
  return newData;
}

function headersToData() {
  const headers = ['Creado por', 'Fecha de creación', 'Embarcación', 'Lugar de pesca', 'Fecha de actualización', 'Peso total', 'Producto por debajo de la talla', 'Números de hembras ovadas', 'Número de colas por debajo de la talla'];
  return headers;
}

export function weightCheckModel(arrayData:any[]) {
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
