import { UniqueEntityID, Product } from '@entities';
import { GetProductData } from '@useCases';
import { ProductData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';

export class GetProductDataInteractor {
  private _gateway: GetProductData.GetProductDataGateway;

  constructor(gateway: GetProductData.GetProductDataGateway) {
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

    const response: ProductData = {
      id: product.id.toString(),
      description: product.description,
      price: product.price,
    };

    return Result.success<ProductData>(response);
  }
}


