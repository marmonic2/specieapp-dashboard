/* eslint-disable no-new */
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

export const exportCsv = (data:any[], headers:string[]) => {
  const options = {
    quoteStrings: '',
    fieldSeparator: ';',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Your title',
    useBom: false,
    noDownload: false,
    headers,
    useHeader: false,
    nullToEmptyString: true,
  };
  new AngularCsv(data, 'My Report', options);
};
