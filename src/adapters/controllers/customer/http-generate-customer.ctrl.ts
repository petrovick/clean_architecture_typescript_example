import { GenerateCustomer } from '@useCases'

type HTTPDetailCustomerInput = {
  params: any,
  headers?: any,
  body: any
}

export class HTTPGenerateCustomerController {
  private _input: HTTPDetailCustomerInput;
  private _generateCustomerInteractor: GenerateCustomer.GenerateCustomerInteractor

  constructor(input: HTTPDetailCustomerInput, interactor: GenerateCustomer.GenerateCustomerInteractor) {
    this._input = input;
    this._generateCustomerInteractor = interactor;
  }

  async run() {
    const request: GenerateCustomer.GenerateCustomerRequestDTO = {
      address: this._input.body.address,
      birthdate: this._input.body.birthdate,
      cellphone: this._input.body.cellphone,
      document: this._input.body.document,
      email: this._input.body.email,
      name: this._input.body.name
    };
    await this._generateCustomerInteractor.execute(request);
  }
};
