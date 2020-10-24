import { Product ,Order, Address, UniqueEntityID } from '@entities';
import { OutputPort, UpdateProduct } from '@useCases';

export class UpdateProductInteractor {
  private _gateway: UpdateProduct.UpdateProductGateway;
  private _presenter: OutputPort<UpdateProduct.UpdateProductResponseDTO>;

  constructor(
    gateway: UpdateProduct.UpdateProductGateway,
    presenter: OutputPort<UpdateProduct.UpdateProductResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(data: UpdateProduct.UpdateProductRequestDTO) {
    const productResult = Product.build({
      name: data.name,
      description: data.description,
      price: data.price
    }, new UniqueEntityID(data.id));
    
    console.log(`Product Result:`,productResult)

    if (!productResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: productResult.errors
      });
    }

    const product = productResult.value;

    console.log(product)

    try {
      await this._gateway.startTransaction();
      await this._gateway.update(product);
      console.log(`12`)
      await this._gateway.endTransaction();
    } catch (err) {
      return this._presenter.show({
        success: false,
        failures: ['unexpected_failure']
      });
    }

    return this._presenter.show({
      success: true
    });
  }
}