export interface IBoatRGP {
  registrationNumber: string;
  name: string;
  ownerPermit: string;
  owner: string;
  ownerIdentification: string;
  typeFishery: string;
  currentPermit: {status: string, desc: string};
  currentPatent: {status: string, desc: string};
  currentInspection: {status: string, desc: string};
}
