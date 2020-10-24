import { OutputPort, GenerateProduct } from '@useCases';

type GenerateProductHTTPView = {
  statusCode: number,
  message?: string,
  body?: any,
  headers?: JSON
};

export class HTTPGenerateProductPresenter implements OutputPort<GenerateProduct.GenerateProductResponseDTO>{
  private _view: GenerateProductHTTPView;

  get view(): GenerateProductHTTPView {
    return this._view;
  } 

  public show(response: GenerateProduct.GenerateProductResponseDTO) {
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
