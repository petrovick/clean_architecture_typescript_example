import { DetailProduct, OutputPort } from '@useCases';
import { GetProductDataInteractor } from '@useCases/common/get-product-data';

export class DetailProductInteractor {
  private _getProductDataInteractor: GetProductDataInteractor;
  private _presenter: OutputPort<DetailProduct.DetailProductResponseDTO>;

  constructor(
    getProductDataInteractor: GetProductDataInteractor,
    presenter: OutputPort<DetailProduct.DetailProductResponseDTO>
  ) {
    this._getProductDataInteractor = getProductDataInteractor;
    this._presenter = presenter;
  }

  public async execute(productId: string) {    
    const orderProductResult = await this._getProductDataInteractor
      .execute(productId);

    if (!orderProductResult.succeeded) {
      return this._presenter.show({
        failures: orderProductResult.errors
      });
    }

    return this._presenter.show({
      success: orderProductResult.value
    });
  }
}


