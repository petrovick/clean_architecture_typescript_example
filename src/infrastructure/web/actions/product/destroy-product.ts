import * as Adapters from '@adapters';
import { DestroyProduct } from '@useCases';
import { DestroyProductDataInteractor } from '@useCases/common/destroy-product-data';

import { Request, Response } from 'express';


const destroyProductGateway = new Adapters.Gateways.DestroyProductGateway();
const destroyProductDataInteractor = new DestroyProductDataInteractor(destroyProductGateway);

export default async function destroyProduct(req: Request, res: Response) {
  const destroyProductPresenter = new Adapters.Presenters.HTTPDestroyProductPresenter();

  const destroyProductInteractor = new DestroyProduct.DestroyProductInteractor(
    destroyProductDataInteractor,
    destroyProductPresenter
  );

  const destroyProductController = new Adapters.Controllers.HttpDestroyProductController(req, destroyProductInteractor);

  await destroyProductController.run();
  const view = destroyProductPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
