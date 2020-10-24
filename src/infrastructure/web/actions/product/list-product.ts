import * as Adapters from '@adapters';
import { ListProduct } from '@useCases';
import { ListProductDataInteractor } from '@useCases/common/list-product-data';

import { Request, Response } from 'express';

const listProductDataGateway = new Adapters.Gateways.ListProductDataGateway();
const listProductDataInteractor = new ListProductDataInteractor(listProductDataGateway);

export default async function listProduct(req: Request, res: Response) {
  const listProductPresenter = new Adapters.Presenters.HTTPListProductPresenter();

  const listProductInteractor = new ListProduct.ListProductInteractor(
    listProductDataInteractor,
    listProductPresenter
  );

  const detailProductController = new Adapters.Controllers.HttpListProductController(req, listProductInteractor);

  await detailProductController.run();
  const view = listProductPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
