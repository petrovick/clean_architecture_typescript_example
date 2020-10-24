import { UpdateProduct } from '@useCases'

type HTTPDetailProductInput = {
  params: any,
  headers?: any,
  body: any
}

export class HTTPUpdateProductController {
  private _input: HTTPDetailProductInput;
  private _updateProductInteractor: UpdateProduct.UpdateProductInteractor

  constructor(input: HTTPDetailProductInput, interactor: UpdateProduct.UpdateProductInteractor) {
    this._input = input;
    this._updateProductInteractor = interactor;
  }

  async run() {
    const request: UpdateProduct.UpdateProductRequestDTO = {
      id: this._input.params.id,
      name: this._input.body.name,
      description: this._input.body.description,
      price: this._input.body.price
    };

    await this._updateProductInteractor.execute(request);
  }
};
