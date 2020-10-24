import { OutputPort, UpdateProduct } from '@useCases';

type UpdateProductHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPUpdateProductPresenter implements OutputPort<UpdateProduct.UpdateProductResponseDTO>{
  private _view: UpdateProductHTTPView;

  get view(): UpdateProductHTTPView {
    return this._view;
  } 

  public show(response: UpdateProduct.UpdateProductResponseDTO) {
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
