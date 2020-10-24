import { UniqueEntityID, Product } from '@entities';

export interface GetProductDataGateway {
  findProductById(productId: UniqueEntityID): Promise<Product>;
};