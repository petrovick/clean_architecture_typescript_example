import { UniqueEntityID, Product } from '@entities';

export interface DestroyProductDataGateway {
  findProductById(productId: UniqueEntityID): Promise<Product>;
};