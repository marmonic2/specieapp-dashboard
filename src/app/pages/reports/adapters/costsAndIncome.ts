/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function totalProductSales(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.total_product_sales;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`nombreProductoVendido${i + 1}`);
    adapter[`description_product_sales${i + 1}`] = element.description;
    addDynamicHeaders(`cantidadVendida${i + 1}`);
    adapter[`quantity_sold_product_sales${i + 1}`] = element.quantity_sold;
    addDynamicHeaders(`ingresoVentasTotales${i + 1}`);
    adapter[`total_sales_income_product_sales${i + 1}`] = element.total_sales_income;
    addDynamicHeaders(`unidades${i + 1}`);
    adapter[`unit_product_sales${i + 1}`] = element.unit;
  });
  return adapter;
}

function productionExpenses(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.production_expenses;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`nombreProducto${i + 1}`);
    adapter[`production_expenses${i + 1}`] = element.description;
    addDynamicHeaders(`gastosDelProductoenLosUltimos6Meses${i + 1}`);
    adapter[`lastSixMonth${i + 1}`] = element.lastSixMonth;
    addDynamicHeaders(`gastoCicloTotal${i + 1}`);
    adapter[`totalCycle${i + 1}`] = element.totalCycle;
  });
  return totalProductSales(adapter, costsIncome);
}

function incomeDifferentProducts(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.income_different_products;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`ingresoDeDiferentesProductosOtros${i + 1}`);
    adapter[`other_income${i + 1}`] = element.other;
    addDynamicHeaders(`arriendoReproductores${i + 1}`);
    adapter[`sale_quantity_income${i + 1}`] = element.rent;
    addDynamicHeaders(`alquilerAnimal${i + 1}`);
    adapter[`sales_revenue_income${i + 1}`] = element.rental;
  });
  return productionExpenses(adapter, costsIncome);
}

function cultivationSales(adapter:any, costsIncome:any) {
  const arrayCostsIncome:any[] = costsIncome.cultivation_sales;
  arrayCostsIncome.forEach((element, i) => {
    addDynamicHeaders(`NombreCultivo${i + 1}`);
    adapter[`description_cultivation_sales${i + 1}`] = element.description;
    addDynamicHeaders(`CantidadVendida${i + 1}`);
    adapter[`sale_quantity_cultivation_sales${i + 1}`] = element.sale_quantity;
    addDynamicHeaders(`IngresosPorVentas${i + 1}`);
    adapter[`sales_revenue_cultivation_sales${i + 1}`] = element.sales_revenue;
  });
  return incomeDifferentProducts(adapter, costsIncome);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((costsIncome) => {
    const adapter = {
      business_name_establishment: costsIncome.business_name_establishment,
      create_by: costsIncome.create_by.email,
      createdAt: costsIncome.createdAt,
      gender: costsIncome.gender,
      identification: costsIncome.identification,
      informant_name: costsIncome.informant_name,
      localization: costsIncome.localization,
      nit: costsIncome.nit,
      person_type: costsIncome.person_type,
      productName: costsIncome.productName,
      registry_number: costsIncome.registry_number,
      updatedAt: costsIncome.updatedAt,
    };
    return cultivationSales(adapter, costsIncome);
  });
  return newData;
}

function headersToData() {
  const headers = ['Nombre del negocio', 'Creado por', 'Fecha de creación', 'Genero', 'identificación', 'nombre del informante', 'Localización', 'Nit', 'Tipo de persona', 'Nombre del producto', 'Número de registro', 'Fecha de actualización'];
  return headers;
}

export function costsAndIncomeModel(arrayData:any[]) {
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
