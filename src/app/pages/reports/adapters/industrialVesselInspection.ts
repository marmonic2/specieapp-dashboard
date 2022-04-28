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

function transshipmentProductControl(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.transshipment_product_control;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`NombreProductoControlTransbordo${i + 1}`);
    adapter[`product_transshipment_product_control${i + 1}`] = element.product;
    addDynamicHeaders(`PesoProducto_transshipment_product_control${i + 1}`);
    adapter[`product_control_weight_kg${i + 1}`] = element.weight_kg;
    addDynamicHeaders(`fechaDeTransbordo${i + 1}`);
    adapter[`data${i + 1}`] = dateStampToDate(element.data) || '';
  });
  return adapter;
}

function transshipmentControl(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.transshipment_control;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`NombreControlTransbordo${i + 1}`);
    adapter[`product_transshipment_control${i + 1}`] = element.product;
    addDynamicHeaders(`PesoProducto_transshipment_control${i + 1}`);
    adapter[`product_weight_kg${i + 1}`] = element.weight_kg;
  });
  return transshipmentProductControl(adapter, industrial);
}

function reel(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.reel;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`EsfuerzoReelPordia${i + 1}`);
    adapter[`effort_reel_perday${i + 1}`] = element.effort_reel_perday;
    addDynamicHeaders(`CalibreAnzuelo_reel${i + 1}`);
    adapter[`hook_gauge${i + 1}`] = element.hook_gauge;
    addDynamicHeaders(`TipoAnzuelo_reel${i + 1}`);
    adapter[`hook_type${i + 1}`] = element.hook_type;
    addDynamicHeaders(`NumeroDeAnzuelos${i + 1}`);
    adapter[`number_hooks${i + 1}`] = element.number_hooks;
    addDynamicHeaders(`NumeroreelPorDia${i + 1}`);
    adapter[`number_reel_perday${i + 1}`] = element.number_reel_perday;
    addDynamicHeaders(`tipoReel${i + 1}`);
    adapter[`tipereel${i + 1}`] = element.type;
  });
  return transshipmentControl(adapter, industrial);
}

function numberSeals(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.number_seals;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`NumeroDeSellos${i + 1}`);
    adapter[`seal${i + 1}`] = element.seal;
  });
  return reel(adapter, industrial);
}

function longLine(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.longLine;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`EsfuerzoAnzueloPordia${i + 1}`);
    adapter[`sets_effort_hook_perday${i + 1}`] = element.sets_effort_hook_perday;
    addDynamicHeaders(`CalibreAnzuelo_longLine${i + 1}`);
    adapter[`sets_hook_gauge${i + 1}`] = element.sets_hook_gauge;
    addDynamicHeaders(`TipoAnzuelo_longLine${i + 1}`);
    adapter[`sets_hook_type${i + 1}`] = element.sets_hook_type;
    addDynamicHeaders(`NumeroDeLances${i + 1}`);
    adapter[`sets_number${i + 1}`] = element.sets_number;
    addDynamicHeaders(`NumeroDeLancesPorDia${i + 1}`);
    adapter[`sets_number_perday${i + 1}`] = element.sets_number_perday;
  });
  return numberSeals(adapter, industrial);
}

function fishingAreas(adapter:any, industrial:any) {
  const arrayIndustrial:any[] = industrial.fishing_areas;
  arrayIndustrial.forEach((element, i) => {
    addDynamicHeaders(`nombreAreaPesca${i + 1}`);
    adapter[`description_fishing_areas${i + 1}`] = element.description;
    addDynamicHeaders(`diasDePesca${i + 1}`);
    adapter[`number_days${i + 1}`] = element.number_days;
  });
  return longLine(adapter, industrial);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((industrialInspection) => {
    const adapter = {
      arrival_date: dateStampToDate(industrialInspection.arrival_date),
      boat_name: industrialInspection.boat_name.description,
      control_total_bags_landed: industrialInspection.control_total_bags_landed,
      control_total_sealed_bags: industrialInspection.control_total_sealed_bags,
      create_by: industrialInspection.create_by.email,
      createdAt: industrialInspection.createdAt,
      diving_effort_diver_perday: industrialInspection.diving_effort_diver_perday,
      diving_number_divers_perpanga: industrialInspection.diving_number_divers_perpanga,
      diving_number_pangas_perday: industrialInspection.diving_number_pangas_perday,
      expiration_date: dateStampToDate(industrialInspection.expiration_date),
      field_recorder: industrialInspection.field_recorder,
      fish_pots_effort_pots_perday: industrialInspection.fish_pots_effort_pots_perday,
      fish_pots_number_pots_perday: industrialInspection.fish_pots_number_pots_perday,
      fish_pots_type: industrialInspection.fish_pots_type,
      landing_site: industrialInspection.landing_site.description,
      lobster_pots_effort: industrialInspection.lobster_pots_effort,
      lobster_pots_number_lines_perdays: industrialInspection.lobster_pots_number_lines_perdays,
      lobster_pots_number_lingadas_perlines:
      industrialInspection.lobster_pots_number_lingadas_perlines,
      lobster_pots_number_nasa_perlingada:
      industrialInspection.lobster_pots_number_nasa_perlingada,
      long_line: industrialInspection.long_line,
      number_crew_continental: industrialInspection.number_crew_continental,
      number_crew_foreign: industrialInspection.number_crew_foreign,
      number_crew_resident: industrialInspection.number_crew_resident,
      number_fishermen_continental: industrialInspection.number_fishermen_continental,
      number_fishermen_foreign: industrialInspection.number_fishermen_foreign,
      number_fishermen_resident: industrialInspection.number_fishermen_resident,
      observations: industrialInspection.observations,
      patent_number: industrialInspection.patent_number,
      permit_holder: industrialInspection.permit_holder,
      register_number: industrialInspection.register_number,
      sailing_date: dateStampToDate(industrialInspection.sailing_date),
      type_fishshop: industrialInspection.type_fishshop,
      updatedAt: industrialInspection.updatedAt,
    };
    return fishingAreas(adapter, industrialInspection);
  });
  return newData;
}

function headersToData() {
  const headers = ['Fecha de arribo', 'Nombre de la embarcación', 'Total de bolsas desembarcadas', 'Total de bolsas selladas', 'Creado por', 'Fecha creación', 'Esfuerzo de buso por dia', 'Número de busos por panga', 'Número de buseo de pangas por dia', 'Fecha de expiración', 'Registrador de campo', 'Esfuerzo de nasas de pescado por dia', 'Número de nasas de pescado por dia', 'Tipo de nasas de pescado', 'Sitio de desembarque', 'Esfuerzo de nasas langosteras', 'Número de nasas langosteras en linea por día', 'Número de nasas langosteras en linea', 'Número de nasas langosteras lingadas', 'Long line', 'Número de tripulantes continentales', 'Número de tripulantes extranjeros', 'Número de tripulantes residentes', 'Número de pescadores continental', 'Número de pescadores extranjeros', 'Número de pescadores residentes', 'Observación', 'Número de patente', 'Titular del permiso', 'Número de registro', 'Fecha de sarpe', 'Tipo de pesqueria', 'Fecha de actualización'];
  return headers;
}

export function industrialInspectionAdapter(arrayData:any[]) {
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
