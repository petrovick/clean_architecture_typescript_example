import { Product } from '@entities';

export interface ListProductDataGateway {
  getAll(): Promise<Product[]>;
};