import * as Adapters from '@adapters';
import { DetailCustomer } from '@useCases';
import { GetCustomerDataInteractor } from '@useCases/common/get-customer-data';

import { Request, Response } from 'express';

const getCustomerDataGateway = new Adapters.Gateways.GetCustomerDataGateway();
const getCustomerDataInteractor = new GetCustomerDataInteractor(getCustomerDataGateway);

export default async function detailCustomer(req: Request, res: Response) {
  const detailCustomerPresenter = new Adapters.Presenters.HTTPDetailCustomerPresenter();

  const detailCustomerInteractor = new DetailCustomer.DetailCustomerInteractor(
    getCustomerDataInteractor,
    detailCustomerPresenter
  );

  const detailCustomerController = new Adapters.Controllers.HttpDetailCustomerController(req, detailCustomerInteractor);

  await detailCustomerController.run();
  const view = detailCustomerPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
