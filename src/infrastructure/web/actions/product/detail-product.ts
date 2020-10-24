import * as Adapters from '@adapters';
import { DetailProduct } from '@useCases';
import { GetProductDataInteractor } from '@useCases/common/get-product-data';

import { Request, Response } from 'express';

const getProductDataGateway = new Adapters.Gateways.GetProductDataGateway();
const getProductDataInteractor = new GetProductDataInteractor(getProductDataGateway);

export default async function detailProduct(req: Request, res: Response) {
  const detailProductPresenter = new Adapters.Presenters.HTTPDetailProductPresenter();

  const detailProductInteractor = new DetailProduct.DetailProductInteractor(
    getProductDataInteractor,
    detailProductPresenter
  );

  const detailProductController = new Adapters.Controllers.HttpDetailProductController(req, detailProductInteractor);

  await detailProductController.run();
  const view = detailProductPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
