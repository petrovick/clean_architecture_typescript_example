import { DetailProduct } from '@useCases'

type APIDetailProductInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpDetailProductController {
  private _input: APIDetailProductInput;
  private _detailProductInteractor: DetailProduct.DetailProductInteractor

  constructor(input: APIDetailProductInput, interactor: DetailProduct.DetailProductInteractor) {
    this._input = input;
    this._detailProductInteractor = interactor;
  }

  async run() {
      await this._detailProductInteractor.execute(this._input.params.id);
  }
};
