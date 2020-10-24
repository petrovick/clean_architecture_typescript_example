import { DestroyProduct } from '@useCases'

type APIDestroyProductInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpDestroyProductController {
  private _input: APIDestroyProductInput;
  private _destroyProductInteractor: DestroyProduct.DestroyProductInteractor

  constructor(input: APIDestroyProductInput, interactor: DestroyProduct.DestroyProductInteractor) {
    this._input = input;
    this._destroyProductInteractor = interactor;
  }

  async run() {
      await this._destroyProductInteractor.execute(this._input.params.id);
  }
};
