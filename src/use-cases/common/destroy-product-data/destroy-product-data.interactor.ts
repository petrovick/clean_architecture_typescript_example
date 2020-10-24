import { UniqueEntityID, Product } from '@entities';
import { DestroyProductData } from '@useCases';
import { ProductData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';

export class DestroyProductDataInteractor {
  private _gateway: DestroyProductData.DestroyProductGateway;

  constructor(gateway: DestroyProductData.DestroyProductGateway) {
    this._gateway = gateway;
  }

  public async execute(productRef: string | Product): Promise<Result<ProductData>> {
    let product: Product;

    if (productRef instanceof Product) {
      product = productRef;
    }

    if (!product && typeof productRef === 'string') {
      try {
        product = await this._gateway
          .findProductById(new UniqueEntityID(productRef));
      } catch (err) {
        return Result.fail<ProductData>([
          'unexpected_failure'
        ]);
      }
    }

    if (!product) {
      return Result.fail<ProductData>([
        'product_not_found'
      ]);
    }


    try {
      await this._gateway.startTransaction();
      await this._gateway.remove(product);
      await this._gateway.endTransaction();
    } catch (err) {
      return Result.fail<ProductData>([
        'unexpected_failure'
      ]);
    }

    const response: ProductData = {
      id: product.id.toString(),
      description: product.description,
      price: product.price,
    };

    return Result.success<ProductData>(response);
  }
}


