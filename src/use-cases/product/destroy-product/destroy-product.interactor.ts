import { DestroyProductDataInteractor } from '@useCases/common/destroy-product-data';
import { DestroyProduct, OutputPort } from '@useCases';

export class DestroyProductInteractor {
  private _destroyProductDataInteractor: DestroyProductDataInteractor;
  private _presenter: OutputPort<DestroyProduct.DestroyProductResponseDTO>;

  constructor(
    destroyProductDataInteractor: DestroyProductDataInteractor,
    presenter: OutputPort<DestroyProduct.DestroyProductResponseDTO>
  ) {
    this._destroyProductDataInteractor = destroyProductDataInteractor;
    this._presenter = presenter;
  }

  public async execute(productId: string) {    
    const orderProductResult = await this._destroyProductDataInteractor
      .execute(productId);

    if (!orderProductResult.succeeded) {
      return this._presenter.show({
        failures: orderProductResult.errors
      });
    }

    return this._presenter.show({
      success: true
    });
  }
}


