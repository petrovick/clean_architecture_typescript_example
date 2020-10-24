import { UniqueEntityID, Product, LineItem, Customer, Order } from '@entities';
import { ListProduct } from '@useCases';
import { ProductData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';

export class ListProductDataInteractor {
  private _gateway: ListProduct.ListProductGateway;

  constructor(gateway: ListProduct.ListProductGateway) {
    this._gateway = gateway;
  }

  public async execute(): Promise<Result<ProductData[]>> {

    try {
      var products = await this._gateway.getAll();
      console.log(products)
      const response: ProductData[] =products.map(prod =>  {
        return {
          id: prod.id.toString(),
          description: prod.description,
          price: prod.price
        }
      });

    return Result.success<ProductData[]>(response);
    
    } catch (err) {
      return Result.fail<ProductData[]>([
        'unexpected_failure'
      ]);
    }
  }
}


