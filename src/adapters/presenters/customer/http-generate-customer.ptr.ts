import { OutputPort, GenerateCustomer } from '@useCases';

type GenerateCustomerHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPGenerateCustomerPresenter implements OutputPort<GenerateCustomer.GenerateCustomerResponseDTO>{
  private _view: GenerateCustomerHTTPView;

  get view(): GenerateCustomerHTTPView {
    return this._view;
  } 

  public show(response: GenerateCustomer.GenerateCustomerResponseDTO) {
    if (response.failures) {
      this._view = {
        statusCode: 500,
        message: 'Unexpected Error'
      };
      return;
    }

    /** Treat other failures here */

    this._view = {
      statusCode: 200
    };

    return;
  }
};
