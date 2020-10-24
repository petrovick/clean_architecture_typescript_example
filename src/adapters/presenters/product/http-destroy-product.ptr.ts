import { OutputPort, DestroyProduct } from '@useCases';

type DestroyProductHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPDestroyProductPresenter implements OutputPort<DestroyProduct.DestroyProductResponseDTO>{
  private _view: DestroyProductHTTPView;

  get view(): DestroyProductHTTPView {
    return this._view;
  } 

  public show(response: DestroyProduct.DestroyProductResponseDTO) {
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
