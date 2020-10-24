import { UniqueEntityID, Product } from '@entities';

export interface UpdateProductGateway {
  startTransaction(): void;
  endTransaction(): Promise<void>;
  update(product: Product): Promise<void>;
  findProductById(id: UniqueEntityID): Promise<Product>;
};
