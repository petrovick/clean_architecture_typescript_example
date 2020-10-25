import { AddressDTO } from '@useCases/common/dtos';

export interface CustomerData {
  id: string,
  document: string,
  name: string,
  cellphone: number,
  email: string,
  birthdate: Date,
  address: AddressDTO
};