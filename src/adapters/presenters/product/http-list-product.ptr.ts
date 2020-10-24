import { OutputPort, ListProduct } from '@useCases';

type ListProductHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPListProductPresenter implements OutputPort<ListProduct.ListProductResponseDTO>{
  private _view: ListProductHTTPView;

  get view(): ListProductHTTPView {
    return this._view;
  } 

  public show(response: ListProduct.ListProductResponseDTO) {
    if (response.success) {
      this._view = {
        statusCode: 200,
        body: {
          data: response.success
        }
      };

      return;
    }

    if (response.failures.includes('order_not_found')) {
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
