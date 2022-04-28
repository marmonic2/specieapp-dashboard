function adapterData(arrayData:any[]) {
  const newData = arrayData.map((activity) => {
    const adapter = {
      art: activity.art.description,
      create_by: activity.create_by.email,
      createdAt: activity.createdAt,
      observation: activity.observation,
      site: activity.site.description,
      updatedAt: activity.updatedAt,
      active: activity.active,
      sample: activity.sample,
    };
    return adapter;
  });
  return newData;
}

function headersToData() {
  const headers = ['Arte de pesca', 'Creado por', 'Fecha de creación', 'Observación', 'Sitio de desembarco', 'Fecha de actualización', 'Activas', 'Muestreadas'];
  return headers;
}

export function activityModel(arrayData:any[]) {
  const newData = adapterData(arrayData);
  const headers = headersToData();
  const adapter = {
    arrayData: newData,
    headers,
  };
  return adapter;
}
