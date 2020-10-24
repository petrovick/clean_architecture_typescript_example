import { ListProduct } from '@useCases'

type APIListProductInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpListProductController {
  private _input: APIListProductInput;
  private _detailProductInteractor: ListProduct.ListProductInteractor

  constructor(input: APIListProductInput, interactor: ListProduct.ListProductInteractor) {
    this._input = input;
    this._detailProductInteractor = interactor;
  }

  async run() {
      await this._detailProductInteractor.execute();
  }
};
