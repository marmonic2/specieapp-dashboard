import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {IBoatRGP} from "../modules/models/BoatRGP";
import {IFishermanRGP} from "../modules/models/FishermanRGP";
import {environment} from "../../environments/environment";
export const mapRGPBoats = (boats: []): IBoatRGP[] => {
  return boats.map((x: any) => {
    return {
      name:( x.boat_name || 'Sin nombre').toUpperCase(),
      registrationNumber: x.registration_number || 'Sin matrícula',
      ownerPermit: (x.company || {}).name,
      owner: x.owner_name,
      ownerIdentification: x.owner_identification,
      typeFishery: getTypeFishery(((x.company || {}).current_permit || {}).type_fishery || []),
      currentPermit: {status: ((x.company || {}).current_permit || {}).status,
        desc: ((x.company || {}).current_permit || {}).effective_inactivation_date},
      currentPatent: {status: x.status, desc: x.date_expiration_patent},
      currentInspection: {status: (x.current_technical_inspection || {}).status,
        desc: (x.current_technical_inspection || {}).expiration_date},
    }
  })
};
export const mapRGPFisherman = (fisherman: []): IFishermanRGP[] => {
  return fisherman.map((x: any) => {
    return {
      photo: getFishermenPhoto(x.fisherman_photo_file),
      name: ( x.name || '').toUpperCase() + ' ' +( x.lastname || '').toUpperCase(),
      cardNumber: x.fishin_card_number || 'Sin carnet',
      identification: x.identification_number,
      location: (x.lugar || {}).nombre,
      validity: getFishermanValidity(x.expiration_date, x.estado)
    }
  })
};
const getFishermenPhoto = (filename) => {
  let value = '';
  if (filename && filename !== 'photo-fisherman.jpg') {
    value = `${environment.rgpBackendUrl}/storage/fishermen/${filename}`
  }
  return value;
};
const getFishermanValidity = (date, status) => {
  if (date > new Date().toISOString().substr(0, 10) && status == 1) {
    return "success";
  }
  else {
    return "danger";
  }
};
const getTypeFishery = (array: []): string => {
  let value = '';
  array.forEach((x: any, i: number) => {
    value += x.nombre;
    if (i+1 < array.length) {
      value += ',';
    }
  });
  return value;
};
export const throwError = (error, router: Router) => {
  if (error.status === 401) {
    Swal.fire({
      title: 'Error!!',
      icon: 'error',
      html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
    }).then(() => {
      router.navigate(['/login']);
    });
  } else {
    Swal.fire({
      title: 'Error!!',
      icon: 'error',
      html: error.message,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
    });
  }
}
