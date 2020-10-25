import { Product ,Order, Address, UniqueEntityID } from '@entities';
import { OutputPort, GenerateProduct } from '@useCases';

export class GenerateProductInteractor {
  private _gateway: GenerateProduct.GenerateProductGateway;
  private _presenter: OutputPort<GenerateProduct.GenerateProductResponseDTO>;

  constructor(
    gateway: GenerateProduct.GenerateProductGateway,
    presenter: OutputPort<GenerateProduct.GenerateProductResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(data: GenerateProduct.GenerateProductRequestDTO) {    
    const productResult = Product.build({
      name: data.name,
      description: data.description,
      price: data.price
    });

    if (!productResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: productResult.errors
      });
    }

    const product = productResult.value;

    try {
      await this._gateway.startTransaction();
      await this._gateway.save(product);
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