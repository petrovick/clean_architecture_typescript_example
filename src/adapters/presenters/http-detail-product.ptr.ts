import { OutputPort, DetailProduct } from '@useCases';

type DetailProductHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPDetailProductPresenter implements OutputPort<DetailProduct.DetailProductResponseDTO>{
  private _view: DetailProductHTTPView;

  get view(): DetailProductHTTPView {
    return this._view;
  } 

  public show(response: DetailProduct.DetailProductResponseDTO) {
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
