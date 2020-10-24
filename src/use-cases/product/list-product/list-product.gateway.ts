import { Customer, UniqueEntityID, Product } from '@entities';

export interface ListProductGateway {
  getAll(): Promise<Product[]>;
};
