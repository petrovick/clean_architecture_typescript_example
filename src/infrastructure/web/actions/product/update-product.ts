import * as Adapters from '@adapters';
import { UpdateProduct } from '@useCases';
import { Request, Response } from 'express';
 
export default async function updateProduct(req: Request, res: Response) {
  const updateProductPresenter = new Adapters.Presenters.HTTPUpdateProductPresenter();
  const updateProductGateway = new Adapters.Gateways.UpdateProductGateway();

  const updateProductInteractor = new UpdateProduct.UpdateProductInteractor(
    updateProductGateway,
    updateProductPresenter
  );

  const updateProductController = new Adapters.Controllers.HTTPUpdateProductController(req, updateProductInteractor);

  await updateProductController.run();
  const view = updateProductPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
