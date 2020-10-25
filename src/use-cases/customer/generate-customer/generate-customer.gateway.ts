import { Customer, UniqueEntityID, Product } from '@entities';

export interface GenerateCustomerGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  save(customer: Customer): Promise<void>;
  findCustomerById(id: UniqueEntityID): Promise<Customer>;
};
