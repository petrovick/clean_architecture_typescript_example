import { ListCustomers } from '@useCases'

type APIListCustomerInput = {
  params: any,
  headers?: any,
  body: any
}

export class HttpListCustomerController {
  private _input: APIListCustomerInput;
  private _listCustomerInteractor: ListCustomers.ListCustomerInteractor

  constructor(input: APIListCustomerInput, interactor: ListCustomers.ListCustomerInteractor) {
    this._input = input;
    this._listCustomerInteractor = interactor;
  }

  async run() {
      await this._listCustomerInteractor.execute();
  }
};
