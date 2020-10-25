import { Customer } from '@entities';

export interface ListCustomerDataGateway {
  getAll(): Promise<Customer[]>;
};