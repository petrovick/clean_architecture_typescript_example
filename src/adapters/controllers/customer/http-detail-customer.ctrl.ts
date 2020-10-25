import { DetailCustomer } from '@useCases'

type APIDetailCustomerInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpDetailCustomerController {
  private _input: APIDetailCustomerInput;
  private _detailCustomerInteractor: DetailCustomer.DetailCustomerInteractor

  constructor(input: APIDetailCustomerInput, interactor: DetailCustomer.DetailCustomerInteractor) {
    this._input = input;
    this._detailCustomerInteractor = interactor;
  }

  async run() {
      await this._detailCustomerInteractor.execute(this._input.params.id);
  }
};
