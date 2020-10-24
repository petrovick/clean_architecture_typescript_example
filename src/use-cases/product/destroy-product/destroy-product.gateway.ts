import { UniqueEntityID, Product } from '@entities';

export interface DestroyProductGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  remove(product: Product): Promise<void>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};
