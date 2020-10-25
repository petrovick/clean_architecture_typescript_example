import { OutputPort, DetailCustomer } from '@useCases';

type DetailCustomerHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPDetailCustomerPresenter implements OutputPort<DetailCustomer.DetailCustomerResponseDTO>{
  private _view: DetailCustomerHTTPView;

  get view(): DetailCustomerHTTPView {
    return this._view;
  } 

  public show(response: DetailCustomer.DetailCustomerResponseDTO) {
    if (response.success) {
      this._view = {
        statusCode: 200,
        body: {
          data: response.success
        }
      };

      return;
    }

    if (response.failures.includes('customer_not_found')) {
      this._view = {
        statusCode: 404,
        message: 'Not found'
      };
      
      return;
    }

    this._view = {
      statusCode: 500,
      message: 'Unexpecet server error'
    };
      
    return;  
  }
};
