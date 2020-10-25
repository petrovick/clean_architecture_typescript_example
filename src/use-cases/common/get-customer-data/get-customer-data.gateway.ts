import { UniqueEntityID, Customer } from '@entities';

export interface GetCustomerDataGateway {
  findCustomerById(customerId: UniqueEntityID): Promise<Customer>;
};