import { Customer, UniqueEntityID, Product } from '@entities';

export interface GenerateProductGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  save(product: Product): Promise<void>;
  // findCustomerById(id: UniqueEntityID): Promise<Customer>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};
