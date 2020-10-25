import * as Adapters from '@adapters';
import { ListCustomers } from '@useCases';
import { ListCustomerDataInteractor } from '@useCases/common/list-customer-data';

import { Request, Response } from 'express';

const listCustomerDataGateway = new Adapters.Gateways.ListCustomerDataGateway();
const listCustomerDataInteractor = new ListCustomerDataInteractor(listCustomerDataGateway);

export default async function listCustomer(req: Request, res: Response) {
  const listCustomerPresenter = new Adapters.Presenters.HTTPListCustomerPresenter();

  const listCustomerInteractor = new ListCustomers.ListCustomerInteractor(
    listCustomerDataInteractor,
    listCustomerPresenter
  );

  const listCustomerController = new Adapters.Controllers.HttpListCustomerController(req, listCustomerInteractor);

  await listCustomerController.run();
  const view = listCustomerPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
