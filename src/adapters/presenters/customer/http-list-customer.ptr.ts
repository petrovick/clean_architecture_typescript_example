import { OutputPort, ListCustomers } from '@useCases';

type ListCustomerHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPListCustomerPresenter implements OutputPort<ListCustomers.ListCustomerResponseDTO>{
  private _view: ListCustomerHTTPView;

  get view(): ListCustomerHTTPView {
    return this._view;
  } 

  public show(response: ListCustomers.ListCustomerResponseDTO) {
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
