import { GenerateProduct } from '@useCases'

type HTTPDetailProductInput = {
  params: any,
  headers?: any,
  body: any
}

export class HTTPGenerateProductController {
  private _input: HTTPDetailProductInput;
  private _generateProductInteractor: GenerateProduct.GenerateProductInteractor

  constructor(input: HTTPDetailProductInput, interactor: GenerateProduct.GenerateProductInteractor) {
    this._input = input;
    this._generateProductInteractor = interactor;
  }

  async run() {
    const request: GenerateProduct.GenerateProductRequestDTO = {
      name: this._input.body.name,
      description: this._input.body.description,
      price: this._input.body.price
    };

    await this._generateProductInteractor.execute(request);
  }
};
