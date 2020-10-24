import { ListProductDataInteractor } from '@useCases/common/list-product-data';
import { ListProduct, OutputPort } from '@useCases';

export class ListProductInteractor {
  private _listProductDataInteractor: ListProductDataInteractor;
  private _presenter: OutputPort<ListProduct.ListProductResponseDTO>;

  constructor(
    listProductDataInteractor: ListProductDataInteractor,
    presenter: OutputPort<ListProduct.ListProductResponseDTO>
  ) {
    this._listProductDataInteractor = listProductDataInteractor;
    this._presenter = presenter;
  }

  public async execute() {    
    const orderProductResult = await this._listProductDataInteractor
      .execute();

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


