import { AddressDTO } from '@useCases/common/dtos';

export interface GenerateCustomerRequestDTO {
  document: string,
  name: string,
  cellphone: number,
  email: string,
  birthdate: Date,
  address: AddressDTO
};